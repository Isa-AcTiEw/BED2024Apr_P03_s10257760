const express = require("express")
const sql = require("mssql")
const dbConfig = require("./dbConfig.js")



const app = express();

const port = process.env.PORT || 3000;

app.listen(port, async () =>{
    try{
        // connect to the databse using an async function (wait response from db)
        await sql.connect(dbConfig);

        console.log("Database connection established successfully")

    }

    catch (err){
        console.error("Database connection error",err);
        // Terminate application with an error code
        process.exit(1); // Exit with code 1 indicating an error
    }
});

// close the connection pool on SIGINT signal

process.on("SIGNT", async()=>{
    console.log("Server is gracefully shutting down");

    // perform cleanup tasks (close databse connection)

    await sql.close();
    console.log("Database connection closed");
    process.exit(0);
});

//  code utilizes the SIGINT signal handler to manage graceful shutdown. This signal is typically sent when you terminate the application using Ctrl+C
