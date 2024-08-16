const User = require('../models/User');
const createUser = async (req,res) =>{
    try{
        const createdUser = User.createUser();
        res.status(201).json({message: "Sucessfully created user",NewUser: createdUser});
    }
    catch(error){
        console.error(error);
        res.status(500).send("Error creating a new user")
    }
}

const getAllUsers = async (req,res) =>{
    try{
        const retrievedUsers = User.getAllUsers();
        res.send(200).json({message:"Sucessfully retrived all users",users:retrievedUsers});
    }
    catch(error){
        console.error(error);
        res.status(500).send("Error retrieving users from the database");
    }
}

const getUserById = async (req,res) =>{
    try{
        const useId = req.params.id;
        const user = await User.getUserById(useId);
        if (!user){
            return res.status(404).send("There is no user with the id provided");
            // Unable to find resource requested
        }

        res.status(200).json(user);


    }

    catch (error){
        console.error(error);
        res.status((500).send("Error retrieving user"))
        // handle server error
    }
}

const deleteUser = async (req,res) =>{
    try{
        const useId = req.params.id;
        const success = User.deleteUser(useId);
        if(!success){
            return res.status(404).send("User id provided does not exists")
        }
        return res.status(204).json({message: "Sucessfully deleted user",rowsAffected:success});
    }
    catch(error){
        console.error(error);
        res.status(500).send("Error deleting the user")
    }

}

const updateUser = async (req,res) =>{
    try{
        const useId = req.params.id;
        const newUserData = req.body;
        const updatedUser = User.updateUser(useId,newUserData);
        if(!updatedUser){
            return res.status(400).send("Unable to update the user with the coresponding id provided as id given does not exists")
        }
        return res.status(200).json({message:"Sucessfully updated the user wqith the corresponding id given",newUserData:updatedUser});
    
    }
    catch(error){
        console.error(error);
        res.status(500).send("Error updating user")
    }
   
}

async function searchUsers(req, res) {
    const searchTerm = req.query.searchTerm; // Extract search term from query params
  
    try {    
      const users = await User.searchUsers(searchTerm);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error searching users" });
    }
  }
module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    searchUsers
}