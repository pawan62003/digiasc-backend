const express = require('express');
const { connect } = require('./db');
const cors = require("cors");
const { userRoute } = require('./routes/user.route');
const { LoginSignupRoute } = require('./routes/LoginSignup.route');
const app = express();

app.use(express.json())
app.use(cors());
app.use("/users",userRoute);
app.use("/",LoginSignupRoute)


app.listen(8080,async()=>{
    try {
        await connect
        console.log("connected with database")
        console.log("server is running at port 8080")
    } catch (error) {
        console.log("something went wrong while running server")
    }
})