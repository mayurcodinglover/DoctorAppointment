import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1];

        if(!token)
        {
            return res.status(401).json({status:false,message:"No token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id).populate("roleid").select("-password");
        if(!user)
        {
            return res.status(404).json({status:false,message:"User not Found"});
        }
        req.user=user;
        
        
        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: "Invalid token" });
    }
}