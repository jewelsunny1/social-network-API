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
            ref:'Thought'//refers to Thought model
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
        id:false//removes the dfault virtual property from output
      });

      const User= model('User', userSchema)//Model:User, which follows the layout/blueprint Schema created