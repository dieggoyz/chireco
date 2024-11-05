# API: Chilean Regions and Communes

This project is a Node.js application that provides an API to retrieve information about Chilean regions and communes.

## Technologies Used

- **Node.js**: JavaScript runtime for building the application.
- **Express**: Web framework for building APIs.
- **CSV-parser**: For parsing CSV files containing region and commune data.
- **Jest**: Testing framework for running unit tests.

## Features

- Load regions and communes from CSV files.
- Retrieve all regions with detailed information.
- Retrieve communes by region ID or region alias.

## API Endpoints

### 1. Get All Regions

- **Endpoint**: `/api/regions`
- **Method**: `GET`
- **Response**: Returns a JSON array of all regions.

### 2. Get Region by ID

- **Endpoint**: `/api/regions/:regionId`
- **Method**: `GET`
- **Response**: Returns detailed information about a specific region by its ID.

### 3. Get Communes by Region ID or Alias

- **Endpoint**: `/api/communes/:regionIdentifier`
- **Method**: `GET`
- **Response**: Returns a JSON array of communes belonging to the specified region, either by its ID or alias.

## Available Data

### Regions

- Each region has the following information:
  - **id**: Unique identifier for the region.
  - **name**: Official name of the region.
  - **alias**: Alternative names for the region (comma-separated).
  - **capital**: Capital city of the region.
  - **climate**: Climate type of the region.
  - **coordinates**: Geographic coordinates of the region's capital.

### Communes

- Each commune has the following information:
  - **region_id**: ID of the associated region.
  - **commune_id**: Unique identifier for the commune.
  - **commune_name**: Name of the commune.
  - **postal_code**: Postal code of the commune.
  - **coordinates**: Geographic coordinates of the commune.

## Tests

- To run the tests, use Jest. Ensure you have the necessary data files in place and execute the following command:

```bash
npm test
```

## Sources

- [Comunas de Chile - Wikipedia](https://es.wikipedia.org/wiki/Comunas_de_Chile)
- [Códigos Únicos Territoriales (2010)](https://www.sinim.gov.cl/archivos/centro_descargas/modificacion_instructivo_pres_codigos.pdf)
- [Códigos Únicos Territoriales (2018)](https://www.subdere.gov.cl/documentacion/c%C3%B3digos-%C3%BAnicos-territoriales-actualizados-al-06-de-septiembre-2018)
