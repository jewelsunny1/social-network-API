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
            match:[/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Must match a valid email address!'

        ]
        }
    }

)