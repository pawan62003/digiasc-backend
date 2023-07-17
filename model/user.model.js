const mongoose = require("mongoose")


const UserSchema = mongoose.Schema({
    name:{required:true,type:String},
    skill:{required:true,type:String},
    gender:{required:true,type:String},
    contact:{required:true,type:Number}
},{
    versionkey:false
})

const UserModel = mongoose.model("user",UserSchema)

module.exports = {
    UserModel
}