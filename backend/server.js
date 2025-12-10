import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import Role from "./models/role.js";
import User from "./models/user.js";
import bcrypt from "bcryptjs";
import adminroute from "./routes/adminRoute.js";
import userroute from "./routes/userRoute.js";
import doctorroute from "./routes/doctorRoute.js";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
connectDB();
const insertDefaultRoles=async()=>{
    const count=await Role.countDocuments();
    if(count===0)
    {
        await Role.insertMany([
            {rolename:"Admin"},
            {rolename:"Doctor"},
            {rolename:"User"},
        ]);
        console.log("Default roles inserted");
    }
    else{
        console.log("roles already exist");
    }
}
const insertDefaultAdmin=async()=>{
    const userCount=await User.countDocuments();
    if(userCount===0)
    {
        const role=await Role.findOne({rolename:"Admin"});

        const hashedPassword=await bcrypt.hash("123456",10);

        await User.create({
            name:"Mayur",
            roleid:role._id,
            email:"mayur@gmail.com",
            password:hashedPassword,
            phoneno:"1234567890",
            gender:"Male",
            age:"30"
        });
        console.log("Default Admin is created successfully");
    }
    else{
        console.log("Admin already created");
    }
}
const intializedData=async()=>{
    await insertDefaultRoles();
    await insertDefaultAdmin();
}
intializedData();

app.use("/admin",adminroute);
app.use("/user",userroute);
app.use("/doctor",doctorroute);
app.get("/",(req,res)=>{
    res.send("Api is running");
})

const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Server running on port ${port}`));