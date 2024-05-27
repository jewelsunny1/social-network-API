const {Thought, User} = require('../models');
const { findByIdAndUpdate } = require('../models/User');

module.exports={
  //GET ALL users
  // /api/users
  async getAllUsers (req,res){
    try{
     const users= await User.find();
     res.json(users)
  
    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  //POST create a new user
  //  /api/users
  async createNewUser (req,res){
    try{
     const {username, email}=req.body
     const newUser= await User.create({username, email});
     res.status(200).json({message:'New user created successfully!', user: newUser});
    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  // GET /api/users/:userId
  async getSingleUser (req,res){
    try{
      const user= await User.findOne({_id: req.params.userId});

      if(!user){
        return res.status(404).json({message:'No user found with that ID'})
      }
      res.json(user)

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },

  //PUT /api/users/:userId
  async updateUser (req,res){
    try{
      const user= await User.findOneAndUpdate({_id: req.params.userId},//specifies the query criteria to find the application in the database.//update user with that id passed in :userId
      { $set: req.body},//updates the fields specified in req.body while leaving other fields unchanged.
      //the req.body must have username and email b/c those vlaues are rquired in User model
      {runValidators:true, new:true}//any validation rules defined in the application's schema are applied to the updated fields
      //set new:true bc this will return the udated user document(row/obj) by the function
    );
    if(!user){
      return res.status(404).json({message:'No user found with that ID'});
    }
    return res.json(user);

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
//DELETE /api/users/:userId
  async deleteUser (req,res){
    try{
      const user= await User.findByIdAndDelete({_id: req.params.userId
      })
      if(!user){
        return res.status(404).json({message:'No user found with that ID'});
      }
      return res.json({success:true, message:'User deleted successfully!',})
  
    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },

  async addNewFriend (req,res){
    try{
     const {userId, friendId}= req.params;

     const user= await User.findByIdAndUpdate(
      userId,//find user by ID
      {$addToSet:{ friends: friendId}},//add frienId to friends array defined in User schema
      {new: true}//return updated user document
     );
    
     if(!user){
      return res.status(404).json({message:'No user found with that ID'});
    }
    return res.json({message:'Friend added successfully'})

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  async deleteFriend (req,res){
    try{
      const {userId, friendId}= req.params;

      const user= await User.findByIdAndUpdate(
       userId,//find user by ID
       {$pull:{ friends: friendId}},//remove frienId f/o friends array defined in User schema
       {new: true}//return updated user document
      );
     
      if(!user){
       return res.status(404).json({message:'No user found with that ID'});
     }
     return res.json({message:'Friend deleted successfully'})
 
  
    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
}