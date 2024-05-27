const {Schema, model}= require('mongoose');

//Schema is the structure/blueprint of our document(rows)
const userSchema= new Schema(
    {
        username:{
            type:String,
            unique:true,
            required:true,
            trim:true
        },

        email:{
            type:String,
            required:true,
            unique:true,
            match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match a valid email address!']
        },
        thoughts:[
          {
            type:Schema.Types.ObjectId,
            ref:'Thought'//refers to Thought model//remember that ONLY models can perform static mehtods(CRUD operations)
          }
        ],
        friends:[//stores array of objectIds,each representing a friend (another user) references other user documents(obj/rows)
          {
            type:Schema.Types.ObjectId,
            ref:'User'//self referencing the User model
          }
        ]
      },
      {
        toJSON:{//virtuals must be converted to JSON b/c virtuals are NOT stored in MongoDB database, they are computed dynamically based in other fields in the document//now friendCount virtual property can be included in the output
          virtuals: true//
        },
        id:false//removes the default virtual property from output
      });
      //Virtuals are mainly used and computed during read operations such as find, findOne, and findById.
      userSchema.virtual('friendCount').get(function(){
        return this.friends.length
      });//this creates a virtual property call 'friendCount'that retrieves the length of the user's friends array field on query.
      

      const User= model('User', userSchema);//intialize User model//Model:User, which follows the layout/blueprint Schema created

      module.exports= User;