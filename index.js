const path = require('path')
const fs = require('fs')
const csv = require('csv-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3000

let communesData = {}
let regionsData = {}

const communesPath = path.join(__dirname, 'data', 'communes.csv')
const regionsPath = path.join(__dirname, 'data', 'regions.csv')

// Función para cargar los datos de las comunas
function loadCommunesData() {
	return new Promise((resolve, reject) => {
		fs.createReadStream(communesPath)
			.pipe(csv())
			.on('data', (row) => {
				const regionId = row.region_id

				if (!communesData[regionId]) {
					communesData[regionId] = []
				}
				communesData[regionId].push({
					region_id: row.region_id,
					commune_id: row.commune_id,
					commune_name: row.commune_name,
					postal_code: row.postal_code,
					coordinates: row.coordinates
				})
			})
			.on('end', () => {
				resolve()
			})
			.on('error', (error) => {
				reject(error)
			})
	})
}

// Función para cargar los datos de las regiones
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
					coordinates: row.coordinates
				}
			})
			.on('end', () => {
				resolve()
			})
			.on('error', (error) => {
				reject(error)
			})
	})
}

// Cargar los datos al iniciar el servidor
Promise.all([loadCommunesData(), loadRegionsData()])
	.then(() => {
		console.log('Regions and communes loaded:', { communesData, regionsData })
	})
	.catch((error) => {
		console.error('Error loading data:', error)
	})

app.use(cors())

// Root endpoint to show API version
app.get('/', (req, res) => {
	res.send({ version: '1.1.0' })
})

// Redirect /api/ to /api/regions
app.get('/api/', (req, res) => {
	res.redirect('/api/regions')
})

// Ruta para obtener todas las regiones
app.get('/api/regions', (req, res) => {
	const allRegions = Object.values(regionsData) // Obtener todas las regiones como un array
	res.json(allRegions)
})

// Ruta para obtener información sobre la región
app.get('/api/regions/:regionId', (req, res) => {
	const regionId = req.params.regionId
	const region = regionsData[regionId]

	if (region) {
		res.json(region)
	} else {
		res.status(404).send({ error: 'Region not found' })
	}
})

// Ruta para obtener comunas por ID de región o alias
app.get('/api/communes/:regionIdentifier', (req, res) => {
	const regionIdentifier = req.params.regionIdentifier.toLowerCase() // Puede ser ID o alias
	let regionId

	// Verificar si regionIdentifier es un número natural (ID), sino buscar comunas por alias
	if (!isNaN(regionIdentifier)) {
		regionId = regionIdentifier // Es un ID válido
	} else {
		for (const [id, region] of Object.entries(regionsData)) {
			if (region.alias.split(',').includes(regionIdentifier.toLowerCase())) {
				regionId = id
				break
			}
		}
	}

	// Si encontramos un ID, devolver las comunas
	const communes = communesData[regionId]

	if (communes) {
		res.json(communes)
	} else {
		res.status(404).send({ error: 'Region not found' })
	}
})

// Iniciar el servidor
if (require.main === module) {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`)
	})
}

module.exports = app
