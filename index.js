const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const xss = require('xss-clean');
const PORT = process.env.PORT || 3000;

const app = express();

app.use(helmet());
app.use(xss());
app.use(express.json({ limit: '10kb' }));

const allowedOrigins = ['http://127.0.0.1:5500', 'https://chireco.vercel.app'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS.'));
      }
    },
  })
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
});

app.use(limiter);

const communesPath = path.join(__dirname, 'data', 'communes.csv');
const regionsPath = path.join(__dirname, 'data', 'regions.csv');

let communesData = {};
let regionsData = {};

function loadCommunesData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(communesPath)
      .pipe(csv())
      .on('data', (row) => {
        const regionId = row.region_id;
        if (!communesData[regionId]) {
          communesData[regionId] = [];
        }
        communesData[regionId].push({
          region_id: row.region_id,
          commune_id: row.commune_id,
          commune_name: row.commune_name,
          postal_code: row.postal_code,
          coordinates: row.coordinates,
        });
      })
      .on('end', resolve)
      .on('error', reject);
  });
}

function loadRegionsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(regionsPath)
      .pipe(csv())
      .on('data', (row) => {
        regionsData[row.id] = {
          id: row.id,
          name: row.name,
          alias: row.alias,
          capital: row.capital,
          climate: row.climate,
          coordinates: row.coordinates,
        };
      })
      .on('end', resolve)
      .on('error', reject);
  });
}

Promise.all([loadCommunesData(), loadRegionsData()])
  .then(() => {
    console.log('Data loaded successfully');
  })
  .catch((error) => {
    console.error('Error loading data:', error);
  });

app.get('/', (req, res) => {
  res.send({ version: '1.1.0' });
});

app.get('/api/', (req, res) => {
  res.redirect('/api/regions');
});

app.get('/api/regions', (req, res) => {
  res.json(Object.values(regionsData));
});

app.get('/api/regions/:regionIdentifier', (req, res) => {
  const regionIdentifier = req.params.regionIdentifier.toLowerCase();
  let regionId;

  if (!isNaN(regionIdentifier)) {
    regionId = regionIdentifier;
  } else {
    for (const [id, region] of Object.entries(regionsData)) {
      if (
        region.alias &&
        region.alias
          .split(',')
          .map((alias) => alias.trim().toLowerCase())
          .includes(regionIdentifier)
      ) {
        regionId = id;
        break;
      }
    }
  }

  const region = regionsData[regionId];

  if (region) {
    res.json(region);
  } else {
    res.status(404).send({ error: 'Region not found' });
  }
});

app.get('/api/communes/:regionIdentifier', (req, res) => {
  const regionIdentifier = req.params.regionIdentifier.toLowerCase();
  let regionId;

  if (!isNaN(regionIdentifier)) {
    regionId = regionIdentifier;
  } else {
    for (const [id, region] of Object.entries(regionsData)) {
      if (region.alias.split(',').includes(regionIdentifier)) {
        regionId = id;
        break;
      }
    }
  }

  const communes = communesData[regionId];

  if (communes) {
    res.json(communes);
  } else {
    res.status(404).send({ error: 'Region not found' });
  }
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
}

module.exports = app;
