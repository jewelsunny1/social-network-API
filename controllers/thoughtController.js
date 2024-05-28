const {Thought, User}= require('../models');
//bringing in the Models bc we can only attach CRUD operations to Models

module.exports= {
  // GET all thoughts
  //  /api/thoughts
  async getAllThoughts (req,res) {
    try{
      const thought= await Thought.find();
      return res.json(thought);
    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  //create new thought //POST
 //  /api/thoughts
  async createNewThought(req,res){
    try{
      const {thoughtText, username}= req.body;
      const newThought= await Thought.create(
        {thoughtText, username})
      res.status(200).json({message:'New thought created successfully!', thought: newThought})

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },

  //   /api/thoughts/:thoughId
  async getSingleThought(req,res){
    try{
      const thought= await Thought.findOne({_id:req.params.thoughtId})

      if(!thought){
        res.status(404).json({message:'Thought not found'})
      }

      return res.json(thought)

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  async updateThought(req,res){
    try{
      const thought= await Thought.findOneAndUpdate({_id:req.params.thoughtId},
      {$set: req.body},//updates the fields specified in req.body
    {runValidators:true,new:true})
    if(!thought){
      res.status(404).json({message:'Thought not found'})
    }

    return res.json(thought)

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },

  //DELETE thought  /api/thoughts/:thoughId
  async deleteThought(req,res){
    try{
      const thought= await Thought.findByIdAndDelete({_id:req.params.thoughtId})

      if(!thought){
        res.status(404).json({message:'Thought not found'})
      }
      return res.json({success:true, message:'Thought deleted successfully!',})

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },

  // POST /api/thoughts/:thoughtId/reactions
  async createReaction(req,res){
    try{
     const thought= await Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},//where
      {$push: {reactions:req.body}},//push whats given by the client(insom) through thr req.body into the reactions object?
      {runValidators:true, new:true}
     )
      if(!thought){
        res.status(404).json({message:'Thought not found'})
      }

      return res.status(200).json({message: 'Reaction added successfully!', thought
      :thought})

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  },
  async deleteReaction(req,res){
    try{
      const thought =await Thought.findOneAndUpdate(
        {_id:req.params.thoughtId},
        {$pull:{reactions:{reactionId:req.params.reactionId}}},
        {runValidators:true, new:true}
      )
      if(!thought){
        res.status(404).json({message:'Thought not found'})
      }

      res.status(200).json({message:'Reaction deleted',thought: thought})

    }catch(err){
      return res.status(500).json({message:'Internal server error', error: err.message});
    }
  }
};

