const path = require('path')
// test if the path exists
console.log(path.resolve(__dirname,".env"));
// specify the location of the .env file
require('dotenv').config({path:path.resolve(__dirname,'.env')}); 
module.exports = {
    user: process.env.DBUSE,
    password: process.env.DBPASSWRD,
    server: "localhost",
    database: process.env.DBNAME,
    trustServerCertificate: true,
    options: {
        port: 1433, // Default SQL server port
        connectionTimeout: 60000, // Connection Timeout
    },
};

