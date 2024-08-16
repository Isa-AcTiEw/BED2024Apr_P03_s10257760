const sql = require('mssql');
const dbConfig = require('../config/dbConfig');
class User{
    constructor(id,username,email){
        this.id = id;
        this.username = username;
        this.email = email;
    }

    static async getAllUsers(){
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Users`
        const request = connection.request();
        const result = await request.query(sqlQuery);
        return result.recordset.map(
            (row) => new User(row.id,row.username,row.email)
        )
    }

    static async createUser(User){
        const connection = await sql.connect(dbConfig);
        // sql statement to create a new user tuple with the releavnt user information with id incremented automatically
        const sqlQuery = `INSERT INTO Users (username,email) VALUES(@username,@email); SELECT SCOPE_IDENTITY() as id`
        const request = connection.request();
        request.input("email",User.email);
        request,input("username",User.username);
        const result = await request.query(sqlQuery);
        return result.rowsAffected;
    }

    static async getUserById(id){
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `SELECT * FROM Users WHERE id = @id`
        const request = connection.request();
        request.input("id",id);
        const result = await request.query(sqlQuery);
        return result.recordset[0]
        ? new User(
            result.recordset[0].id,
            result.recordset[0].username,
            result.recordset[0].email
        )
        : null; // Handle User not found
    }

    static async updateUser(id,updatedUser){
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `INSERT INTO Users(username,email) VALUES(@username,@email) WHERE id = @id`
        const request = connection.request();
        request.input("id",id);
        request.input("username",updatedUser.username);
        request.input("email",updatedUser.email);
        // return the newly created user by passing in result into the method getuserById
        return this.getUserById(id);
    }

    static async deleteUser(id){
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `DELETE Users WHERE id = @id`
        const request = connection.request();
        request.input("id",id);
        const result = await request.query(sqlQuery);
        return result.rowsAffected > 0 ? result.rowsAffected: null;
        // return the rowsaffected in the table (return null if unsucessful deletion)
    }

    // Use a query string from request params to query db to match wildcard operator 
    static async searchUsers(searchTerm) {
        const connection = await sql.connect(dbConfig);
    
        try {
          const query = `
            SELECT *
            FROM Users
            WHERE username LIKE '%${searchTerm}%'
              OR email LIKE '%${searchTerm}%'
          `;
    
          const result = await connection.request().query(query);
          return result.recordset;
        } 
        catch (error) {
          throw new Error("Error searching users"); // Or handle error differently
        } 
        finally {
          await connection.close(); // Close connection even on errors
        }
      }

      static async getUsersWithBooks() {
        const connection = await sql.connect(dbConfig);
        
        // joining tables be it left join inner join allows for you to query information from multiple tables and display it to the client
        // Comparing the fk (ub.user_id = u.id, ub.book_id = b.id) 
        // from right and left tables if it matches then join this allows to retrive the books borrowed by secific user and the book details
        // u and ub are table alias representing Users and UserBooks tables respectively
        try {
          const query = `
            SELECT u.id AS user_id, u.username, u.email, b.id AS book_id, b.title, b.author
            FROM Users u
            LEFT JOIN UserBooks ub ON ub.user_id = u.id
            LEFT JOIN Books b ON ub.book_id = b.id
            ORDER BY u.username;
          `;
    
          const result = await connection.request().query(query);
    
          // Group each users and their books 
          const usersWithBooks = {};
          for (const row of result.recordset) {
            const userId = row.user_id;
            if (!usersWithBooks[userId]) {
              usersWithBooks[userId] = {
                id: userId,
                username: row.username,
                email: row.email,
                books: [],
              };
            }
            usersWithBooks[userId].books.push({
              id: row.book_id,
              title: row.title,
              author: row.author,
            });
          }
    
          return Object.values(usersWithBooks);
        } 
        catch (error) {
          throw new Error("Error fetching users with books");
        } 
        finally {
          await connection.close();
        }
      }
}
module.exports = User;