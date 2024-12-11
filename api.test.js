const request = require('supertest');
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const app = express();
let communesData = {};
let regionsData = {};

function loadCommunesData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('./data/communes.csv')
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
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

function loadRegionsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream('./data/regions.csv')
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
      .on('end', () => {
        resolve();
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

Promise.all([loadCommunesData(), loadRegionsData()])
  .then(() => {
    console.log('Comunas y regiones cargadas:', { communesData, regionsData });
  })
  .catch((error) => {
    console.error('Error al cargar los datos:', error);
  });

app.get('/api/regions', (req, res) => {
  res.json(Object.values(regionsData));
});

app.get('/api/regions/:regionId', (req, res) => {
  const regionId = req.params.regionId;
  const region = regionsData[regionId];

  if (region) {
    res.json(region);
  } else {
    res.status(404).send({ error: 'Región no encontrada' });
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
    res.status(404).send({ error: 'Región no encontrada' });
  }
});

describe('API Tests', () => {
  test('should get all regions', async () => {
    const response = await request(app).get('/api/regions');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('should get region by ID', async () => {
    const response = await request(app).get('/api/regions/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', '1');
  });

  test('should return 404 for non-existent region ID', async () => {
    const response = await request(app).get('/api/regions/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Región no encontrada');
  });

  test('should get communes by region ID', async () => {
    const response = await request(app).get('/api/communes/1');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('should get communes by region alias', async () => {
    const response = await request(app).get('/api/communes/rm');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('should return 404 for non-existent communes by ID', async () => {
    const response = await request(app).get('/api/communes/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Región no encontrada');
  });
});
