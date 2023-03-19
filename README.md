## PazzPay-server

This is a ExpressJs-based API for [frontend project](https://github.com/permana017/pazzpay-fe). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `https://github.com/permana017/pazzpay-be.git`
* `cd backend`
* `npm install` to install all required dependencies
* `node index.js` to start the local server

## DB Structure

Open [schema](https://drawsql.app/teams/array/diagrams/copy-of-auth-db)

## Folder Structure

     ┣ 📂public
     ┃ ┗ 📂uploads
     ┃ ┃ ┗ 📂images
     ┣ 📂src
     ┃ ┣ 📂controllers
     ┃ ┃ ┣ 📜auth.controller.js
     ┃ ┃ ┣ 📜transfer.controller.js
     ┃ ┃ ┣ 📜users.controller.js
     ┃ ┣ 📂middleware
     ┃ ┃ ┣ 📜formUpload.js
     ┃ ┃ ┗ 📜validation-user.js
     ┃ ┣ 📂model
     ┃ ┃ ┣ 📜auth.model.js
     ┃ ┃ ┣ 📜transfer.model.js
     ┃ ┃ ┣ 📜users.model.js
     ┃ ┗ 📂routes
     ┃ ┃ ┣ 📜auth.route.js
     ┃ ┃ ┣ 📜index.js
     ┃ ┃ ┣ 📜transfer.route.js
     ┃ ┃ ┣ 📜users.route.js
    
## Endpoints
users endpoint

    GET      /api/users
    GET      /api/users/:id
    PATCH    /api/users/:id
    DEL      /api/users/:id
    
auth endpoint

    POST      /api/auth/login-user
    POST      /auth/regis-user

transaction endpoint

    GET      /transaction/transfer
    POST     /transaction/transfer:id
    PATCH    /transaction/transfer:id
    DEL      /transaction/transfer:id
    

when put under a domain with `prefix`, it would look like:

    https://www.example.com/api/users
 
 

