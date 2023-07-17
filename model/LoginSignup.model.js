const mongoose = require("mongoose");

const LoginSignupSchema = mongoose.Schema({
    email:{required:true,type:String},
    password:{required:true,type:String}
},{
    versionkey:false
})

const LoginSignupModel = mongoose.model("/signupData",LoginSignupSchema)

module.exports={
    LoginSignupModel
}