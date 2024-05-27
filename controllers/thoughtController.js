const {Thought, User}= require('../models');
//bringing in the Models bc we can only attach CRUD operations to Models

module.exports= {
  // GET all thoughts
  async getAllThoughts (req,res) {
    try{
      const thought= await Thought.find();
      return res.json(thought);
    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  //create new thought //POST
  async createNewThought(req,res){
    try{
      const {thoughtText, username}= req.body;
      

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  async getSingleThought(req,res){
    try{

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  async updateThought(req,res){
    try{

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  async deleteThought(req,res){
    try{

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  async createReaction(req,res){
    try{

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  async deleteReaction(req,res){
    try{

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  }
};

