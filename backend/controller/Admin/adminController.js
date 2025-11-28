import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Role from "../../models/role.js";

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).populate("roleid");
    if (!user) {
      return res.json({ status: false, message: "User not exist" });
    }

    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return res.json({ status: false, message: "Password wrong" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.roleid.rolename },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    return res.json({
      status: true,
      message: "User Login Successfully",
      token: token,
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
        role: user.roleid.rolename,
      },
    });

  } catch (error) {
    console.log(error.message);
    return res.json({ status: false, message: "Internal server error" });
  }
};

//User CRUD
const insertUser=async(req,res)=>{
    try {
        const {name,email,password,roleid}=req.body;
        if(!name || !email || !password || !roleid)
        {
            return res.json({status:false,message:"All Field is required"});
        }
        const role=await Role.findOne({rolename:"Doctor"});
        const hashpassword=await bcrypt.hash(password,10);
        const newUser=User({
            name,
            email,
            password:hashpassword,
            roleid:role._id
        });
        await newUser.save();
        return res.json({status:true,message:"Doctor inserted Successfully"});
    } catch (error) {
        console.log(error);
        return res.json({status:false,message:"Internal server error"});
    }
}
const editUser=async(req,res)=>{
    try {
        const {id,name,email,password,roleid}=req.body;
        let hashedPassword;
        if(password)
        {
             hashedPassword=await bcrypt.hash(password,10);
        }
        const user=await User.findByIdAndUpdate(id,{$set:{
            name,
            email,
            password:hashedPassword,
            roleid:roleid
        }},{new:true});
        return res.json({
            status:true,
            message:"User updated successfully",
            user
        });
    } catch (error) {
        console.log(error.message);
        return res.json({status:false,message:"Internal server Erorr"})
    }
}
const deleteUser=async(req,res)=>{
    try {
        const {id}=req.params;
        
        const deleteUser=await User.findByIdAndDelete(id);
        if(!deleteUser)
        {
            return res.json({status:false,message:"User not found"});
        }
        return res.json({status:true,message:"User Deleted Successfully"});
    } catch (error) {
        console.log(error.message);
        return res.json({status:false,message:"Internal server Error"});
        
    }
}

export { Login ,insertUser,editUser,deleteUser};
