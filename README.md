# chireco

chireco is a Node.js API that provides comprehensive data on Chilean regions and communes. Built with educational purposes in mind, it uses CSV files to deliver detailed and accurate information, such as region IDs, aliases, capitals, climates, and more.

### features

- retrieve detailed information on Chilean regions and communes.
- query regions by ID or alias.
- supports JSON responses for seamless integration with other applications.
- enhanced security with rate limiting, HTTP headers protection, and input sanitization.

### roadmap

- optimize CSV parsing for faster responses.

### api documentation

#### available endpoints

- **[GET]** `/api/regions` - Retrieve all regions with their details.
- **[GET]** `/api/regions/:regionId` - Retrieve details of a specific region by ID.
- **[GET]** `/api/communes/:regionIdentifier` - Retrieve communes by region ID or alias.

### technologies used

- **Node.js**: JavaScript runtime for building the application.
- **Express**: Web framework for APIs.
- **CSV-parser**: For parsing CSV data files.
- **Jest**: Testing framework for unit tests.
- **express-rate-limit**: To limit repeated requests for enhanced API security.
- **helmet**: To secure HTTP headers.
- **xss-clean**: To sanitize user inputs against XSS attacks.

### contributing

generally don't require contributions on my projects because they are for learning purposes, but feel free to suggest improvements or report bugs!

### license

this project is released under the [MIT license](LICENSE).  
it's an experimental and non-commercial project meant for fun.

### thanks to

- [Comunas de Chile - Wikipedia](https://es.wikipedia.org/wiki/Comunas_de_Chile)
- [Códigos Postales de Chile](https://casavisos.cl/content/codigos-postales-de-chile.html)
- [Códigos Únicos Territoriales (2010)](https://www.sinim.gov.cl/archivos/centro_descargas/modificacion_instructivo_pres_codigos.pdf)
- [Códigos Únicos Territoriales (2018)](https://www.subdere.gov.cl/documentacion/c%C3%B3digos-%C3%BAnicos-territoriales-actualizados-al-06-de-septiembre-2018)

### contact

reach out to me for feedback or suggestions at [diegoeffar@gmail.com](mailto:diegoeffar@gmail.com).
