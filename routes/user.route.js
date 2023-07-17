const express = require("express");
const { UserModel } = require("../model/user.model");

const userRoute = express.Router();

userRoute.get("/",async(req,res)=>{
    try {
        const {page,limit,q} = req.query
        const newPage = page || 1;
        const newLimit = limit || 6;
        // const newrole = role|| 
        const skip = (newPage - 1) * newLimit;
        const regexPattern = q.split(' ').map(term => `(?=.*${term})`).join('');
        const data = await UserModel.find({ name: { $regex: regexPattern, $options: 'i' }})
        .skip(skip).limit(newLimit)
        const count = await UserModel.countDocuments({ name: { $regex: regexPattern, $options: 'i' }}||{skill: { $regex: regexPattern, $options: 'i' }});
          res.status(200).send({
            data,
            currentPage: parseInt(newPage),
            totalPages: Math.ceil(count / newLimit),
          });
    } catch (error) {
        res.send({"err":error})
    }
})

userRoute.get("/:id",async(req,res)=>{
    try {
        const {id} = req.params
        const user = await UserModel.find({_id:id})
        res.send(user)
    } catch (error) {
        res.send({"err":error})
    }
})

userRoute.post("/",async(req,res)=>{
    try {
        const data = new UserModel(req.body)
        await data.save()
        res.send({"msg":"data is added in your database"})
    } catch (error) {
        res.send({"err":error})
    }
})

userRoute.delete("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const afterDelete = await UserModel.findByIdAndDelete({_id:id})
        res.send({"msg":"this user removed from your database"})
    } catch (error) {
        res.send(error)
    }
})

userRoute.patch("/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const afterUpdation = await UserModel.findByIdAndUpdate({_id:id},req.body)
        res.send({"msg":"user Data id updated"})
    } catch (error) {
        res.send({"err":error})
    }
})



module.exports = {
    userRoute
}