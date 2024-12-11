# chireco 🇨🇱

chireco is a node.js api that provides comprehensive data on **chi**lean **re**gions and **co**mmunes.
built with educational purposes in mind, it uses csv files to deliver detailed and accurate information, such as region IDs, access aliases, capitals, climates, and more.

### features

- retrieve detailed information on chilean regions and communes.
- supports JSON responses for seamless integration with other applications.
- enhanced security with rate limiting, HTTP headers protection, and input sanitization.

### roadmap

- add regions/communes additional information.
- optimize csv parsing for faster responses.

### available endpoints

- **GET**: `/api/regions` return all regions with their details.
- **GET**: `/api/regions/:region` return details of a specific region by id or alias.
- **GET**: `/api/communes/:region` return communes by region id or alias.

### technologies used

- **node.js**: javascript runtime for building the application.
- **express**: web framework for APIs.
- **csv-parser**: for parsing CSV data files.
- **jest**: testing framework for unit tests.
- **express-rate-limit**: to limit repeated requests for enhanced API security.
- **helmet**: to secure HTTP headers.
- **xss-clean**: to sanitize user inputs against XSS attacks.

### license

this project is released under the [MIT license](LICENSE).  
it's an experimental and non-commercial project designed for fun.

### thanks to

- [Comunas de Chile – Wikipedia](https://es.wikipedia.org/wiki/Comunas_de_Chile)
- [Códigos Postales de Chile](https://casavisos.cl/content/codigos-postales-de-chile.html)
- [Códigos Únicos Territoriales (2010)](https://www.sinim.gov.cl/archivos/centro_descargas/modificacion_instructivo_pres_codigos.pdf)
- [Códigos Únicos Territoriales (2018)](https://www.subdere.gov.cl/documentacion/c%C3%B3digos-%C3%BAnicos-territoriales-actualizados-al-06-de-septiembre-2018)

### contact

feedback or suggestions to [dieggoyz@gmail.com](mailto:dieggoyz@gmail.com)!
