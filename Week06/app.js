// set up the ports
const express = require("express");
const dbConfig = require("./config/dbConfig");
const app = express();
const sql = require('mssql');
const port = process.env.PORT || 2000;

// existing code above
const usersController = require("./controllers/usersController");

// ... existing code in between

app.post("/users", usersController.createUser); // Create user
app.get("/users", usersController.getAllUsers); // Get all users
app.get("/users/:id", usersController.getUserById); // Get user by ID
app.put("/users/:id", usersController.updateUser); // Update user
app.delete("/users/:id", usersController.deleteUser); // Delete user
app.get("/users/search", usersController.searchUsers); // search user using search parameter in req param
app.get("/users/with-books", usersController.getUsersWithBooks);

// ... existing code after

app.listen(port,async ()=>{
    try {
        // Connect to the database
        await sql.connect(dbConfig);
        console.log("Database connection established successfully");
      } catch (err) {
        console.error("Database connection error:", err);
        // Terminate the application with an error code (optional)
        process.exit(1); // Exit with code 1 indicating an error
      }
    
      console.log(`Server listening on port ${port}`);
    }
);

process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    // Perform cleanup tasks (e.g., close database connections)
    await sql.close();
    console.log("Database connection closed");
    process.exit(0); // Exit with code 0 indicating successful shutdown
  });
