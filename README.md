# dev_int_proj

Interview Project.

## Getting Started

Clone the Repo.
-------------
Run `npm install` to install all necessary packages.

### Prerequisites

The following tools will be needed to run this application successfully:

Node v8.11.3 or above
---
Npm v5.6 or above
---

### ENDPOINTS

- POST `/api/v1/products` Create a product.
- GET `/api/v1/products` Fetch all products.
- GET `/api/v1/products/:productId/` Fetch a product by Id.
- GET `/api/v1/docs` Api Documentation.

### Installing

## On your Local Machine
- Pull the [develop](https://github.com/openwell/dev_int_proj) branch off this repository
- Install postgreSql 11 on your local machine or registered on any online platform
- Rename the sample.env file to .env and input the right configurations
- Run `npm i` to install all dependencies
- Run `npm run createTable` to create the database table
- Run `npm start` to start the app
- App runs on port 3000
- Access endpoints on `localhost:3000`


### Break down into end to end tests

- It tests the API end-point.
- It tests the REST API functionality

### Deployment on Heroku Server
`https://dev-int-proj.herokuapp.com/api/v1`

### Hosted UI
`https://openwell.github.io/dev_int_proj`

## Built With

* [Node.js](http://www.nodejs.org/) - Runtime-Environment

## Author

* **Ojo Timileyin**