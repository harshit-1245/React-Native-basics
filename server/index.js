const express=require("express")
const cors=require("cors")
const connectDB = require( "./database/db" )
const User =require("./model/userModel")
const app=express()
require("dotenv").config()

const port =process.env.PORT || 5000

connectDB()

app.use(cors())
app.use(express.json())

//creating endpoint for registrating user
app.post("/register",async(req,res)=>{
  try {
      const {username,email,password}=req.body;
  
      if (!username || !email || !password) {
          return res.status(400).json({ message: "Please fill required fields" });
        }
        const existedUser = await User.findOne({
            $or: [{ username }, { email }],
          });
          if (existedUser) {
            return res.json({ message: "User or email already registered" });
          }
          const user = await User.create({
            username,
            email,
            password,
            
          
          });
          await user.save()

          res.status(200).json(user)

  } catch (error) {
    console.log(error)
    res.status(500).json({messsage:"Something went wrong"})
  }
})

app.get("/user",async(req,res)=>{
  try {
    
      const users = await User.find()
      res.json({ users });
  } catch (error) {
    res.status(500).json({messsage:"Something went wrong"})
  
  }
})

app.listen(port,()=>{
    console.log(`server live at ${port}`)
})