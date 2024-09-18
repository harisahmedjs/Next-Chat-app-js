import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username :{
        type : String,
        reqiured : [true , "please provide a username"],
        unique : true
    },
    email:{
        type : String,
        required : [true , "please provide an email"]
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
    },
    imageUrl: {
        type: String,
        required: false, // Set to false if the image is optional
      },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users" , userSchema)

export default User