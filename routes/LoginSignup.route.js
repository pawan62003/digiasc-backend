const express = require("express")
const {LoginSignupModel} = require("../model/LoginSignup.model")
const LoginSignupRoute = express.Router();
const jwt = require("jsonwebtoken")

LoginSignupRoute.post("/signup",async(req,res)=>{
    try {
        const {email,password} = req.body
        const user = await LoginSignupModel.find({email})
        if(user.length===0){
            const newUser = new LoginSignupModel(req.body);
            await newUser.save();
            res.send({"msg":"your Account is created Please Login !!!"})
        }
        else{
            res.send({"msg":"your data is allready registered please Login !!!"})
        }
    } catch (error) {
        res.send({"err":error})
    }
})

LoginSignupRoute.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
        const data = await LoginSignupModel.find({email})
        if(!data){
            res.send({"msg":"Please Signup your Data"})
        }
        else{
            const token = jwt.sign({userId:data._id},"digi_asc")
            res.send({
                token,
                "msg":"Login successfully"
            })
        }
    } catch (error) {
        res.send({"err":error})
    }
})

module.exports = {
    LoginSignupRoute
}