const {Schema, model}= require('mongoose');
//reactionSchema is NOT a model, it will be used as the reaction field's subdocument schema in the Thought model
const reactionSchema= new Schema(
  {
    reactionId:{
      type:Schema.Types.ObjectId,
      default:()=> new Schema.Types.ObjectId()
    },
    reactionBody:{
      type:String,
      required:true,
      maxlength: 280
    },
    username:{
      type:String,
      required:true,
      maxlength:280
    },
    createdAt:{
      type:Date,
      default:Date.now,
      get:timestamp=> new Date (timestamp).toLocaleString()
    }
  },
  {
    toJSON:{
      getters:true
    },
    id:false
  }
)

const thoughtSchema= new Schema(
  {
    thoughtText:{
      type:String,
      required:true,
      minlength:1,
      maxlength:280
    },
    createdAt:{
      type:Date,
      default:Date.now,
      get:timestamp=> new Date (timestamp).toLocaleString()//getters: are func that define how a property should be retrieved when accessed
    },
    username:{
      type:String,
      required:true
    },
    reactions:[reactionSchema]
  },
  {
    toJSON:{
      virtuals:true,
      getters:true,//allows you to include any getters defined in schema
    },
    id:false
  }
);

thoughtSchema.virtual('reactionCount').get(function(){
  return this.reactions.length;
});

const Thought= model ('Thought',thoughtSchema)

module.exports=Thought;
