import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";


export default {
    // CRUD operations
    getAllUsers: async (req, res) => {
        try {
            const users = await userModel.find({});
            console.log("Users from DB:", users);

            res.status(200).json({
                message: "Users fetched successfully",
                users
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ 
                message: "eror fetching users", 
                error: error.message });
        }
    },
      getUser: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "Not authenticated" });
      }

      const user = await userModel.findById(req.user.id);
      res.status(200).json({ message: "User verified successfully", user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  },
    createUser: async (req, res) => {
        try {
            const { user_name, user_email , password ,phone_number , user_role } = req.body;
            const newUser = new UserModel({ user_name, user_email ,password, phone_number , user_role });
            await newUser.save();   
            res.status(201).json({
                message: "User created successfully",
                user: newUser
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({ 
                message: "error creating user", 
                error: error.message });
        }   
    },  
    deleteUser: async (req, res) => {
        try {
            // Support multiple ways the client may send the id: params, query or body
            const {id} = req.params           
            console.log('deleteUser called with', id);

            const deletedUser = await userModel.findByIdAndDelete(id);
            if (!deletedUser) {
                return res.status(404).json({ message: "User not found" }); 
            }
            res.status(200).json({
                message: "User deleted successfully",
                user: deletedUser
            });
        } catch (error) {
            console.log(error); 
            res.status(500).json({
                message: "error deleting user", 
                error: error.message 
            });
        }
    }, 
    updateUser: async (req, res) => {
        try {
            const {id } = req.params;
            const updateData  = req.body;
            if (req.user.id !== id) {
                return res.status(403).json({ message: "Forbidden: You can only update your own profile" });
            }

            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }

            const user = await userModel.findByIdAndUpdate(id, updateData,{ new: true });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Respond with updated user
                res.status(200).json({
                    message: "User updated successfully",
                    user
                });
        }
        catch (error) {
            console.log(error);
            res.status(500).json({
                message: "error updating user",
                error: error.message
            });
        }
    }
     

};

