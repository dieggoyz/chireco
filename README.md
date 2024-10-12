# API: Chilean Regions and Communes 

This API serves as a comprehensive resource for all regions and their corresponding communes in Chile, facilitating easy access and management of regional data. 🫡

## Usage/Examples

- **Get all regions**: Fetches all available regions along with their unique identifiers.
  - *Endpoint*: [chireco.vercel.app/api](https://chireco.vercel.app/api/)
- **Get gommunes by region ID**: Returns communes for a specified region ID.
  - *Example*: [chireco.vercel.app/api/${id}](https://chireco.vercel.app/api/xiii) for the Metropolitana de Santiago.
- **Search by name or alias**: Search for regions or communes using their name or alias.
  - *Example*: [chireco.vercel.app/api/rm](https://chireco.vercel.app/api/rm) returns all communes that match "rm".

Available ids, pseudonyms and aliases for easy reference are:

| ID    | Name                                        | Alias                                        |
| :---- | :------------------------------------------ | :------------------------------------------- |
| `i`   | `Tarapacá`                                  | `1`, `tarapacá`, `tarapaca`                  |
| `ii`  | `Antofagasta`                               | `2`, `antofagasta`                           |
| `iii` | `Atacama`                                   | `3`, `atacama`                               |
| `iv`  | `Coquimbo`                                  | `4`, `coquimbo`                              |
| `v`   | `Valparaíso`                                | `5`, `valparaíso`, `valparaiso`              |
| `vi`  | `Libertador General Bernardo O'Higgins`     | `6`, `ohiggins`                              |
| `vii` | `Maule`                                     | `7`, `maule`                                 |
| `viii`| `Biobío`                                    | `8`, `biobío`, `biobio`                      |
| `ix`  | `Araucanía`                                 | `9`, `araucanía`, `araucania`                |
| `x`   | `Los Lagos`                                 | `10`, `loslagos`, `lagos`                    |
| `xi`  | `Aysén del General Carlos Ibáñez del Campo` | `11`, `aysén`, `aysen`                       |
| `xii` | `Magallanes y Antártica Chilena`            | `12`, `magallanes`, `antártica`, `antartica` |
| `xiii`| `Metropolitana de Santiago`                 | `13`, `metropolitana`, `santiago`, `rm`      |
| `xiv` | `Los Ríos`                                  | `14`, `losríos`, `losrios`                   |
| `xv`  | `Arica y Parinacota`                        | `15`, `arica`, `parinacota`                  |
| `xvi` | `Ñuble`                                     | `16`, `ñuble`, `nuble`                       |

## API Features
- Fast and lightweight, ensuring quick responses.
- Comprehensive coverage of all Chilean regions and communes.
- Supports searching through aliases for enhanced usability.

## Local Development

To run the API locally using Node.js:

```bash
npm install
node index.js
```

And open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

To ensure the API is functioning correctly, you can run the test suite using the following command:

```bash
npm test
```

This will execute all tests defined in the project, checking for the expected behavior of the API endpoints. Make sure the server is not running while executing tests, as the tests will start the server automatically.

## Data Source

The information provided by this API is extracted and updated according to data from [Wikipedia](https://es.wikipedia.org/wiki/Regiones_de_Chile).

## Support

For any questions or issues, feel free to reach out via email at diegoeffar@gmail.com.
