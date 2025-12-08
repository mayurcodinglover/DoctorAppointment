import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Role from "../../models/role.js";
import Doctor from "../../models/doctor.js";
import Appointment from "../../models/appointments.js";


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
        const {name,email,password,roleid,age}=req.body;
        if(!name || !email || !password || !roleid || !age)
        {
            return res.json({status:false,message:"All Field is required"});
        }
        const role=await Role.findOne({rolename:"Doctor"});
        const hashpassword=await bcrypt.hash(password,10);
        const newUser=User({
            name,
            email,
            password:hashpassword,
            roleid:role._id,
            age
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

const addDoctor=async(req,res)=>{
    const {userid,degree,experience,fees,address,aboutdoctor,speciality}=req.body;
    const existingDoctor=await Doctor.findOne({userid});
    if(existingDoctor)
      {
        console.log(existingDoctor);
        return res.json({status:false,message:"Doctor already Exist"});
      }    
    try {
        const doctor=new Doctor({
      userid,
      degree,
      Experience:experience,
      Fees:fees,
      Address:address,
      AboutDoctor:aboutdoctor,
      image:req.file.filename,
      speciality
    });
    await doctor.save();
    return res.json({status:true,message:"Doctor created Successfully"});
    } catch (error) {
      console.log(error.message);
      return res.json({status:false,message:"Internal server Error"});
    }
}


const listDoctor=async(req,res)=>{
  try {
    const allDoctor=await Doctor.find({});
  if(!allDoctor)
  {
    return res.json({status:true,message:"No Doctor Found"});
  }
  return res.json({status:true,message:"Doctor Found Successfully",allDoctor});
  } catch (error) {
    console.log(error.message);
    return res.json({status:false,message:"Internal server Error"});
  }
}

const deleteDoctor=async(req,res)=>{
  const {id}=req.params;
try {
      const isDoctor=await Doctor.find({_id:id});
  if(!isDoctor)
  {
    return res.json({status:false,message:"Doctor not found"});
  }
  await Doctor.findByIdAndDelete(id);
  return res.json({status:true,message:"Doctor delete successfully"});
} catch (error) {
  console.log(error.message);
  return res.json({status:false,message:"Internal server Error"});
}
}

const totalAdminDataCount=async(req,res)=>{
    try {
      const totalDoctor=(await Doctor.distinct("_id")).length;
    const totalAppointment=(await Appointment.distinct("_id")).length;
    const totalPatients=(await Appointment.distinct("uid")).length;

    return res.json({success:true,message:"Total data receved",counts:{totalDoctor,totalAppointment,totalPatients}});
    } catch (error) {
      console.log(error);
      return res.json({sttus:false,message:"Internal server Error"});
    }
    
}

const latestBookingAdmin=async(req,res)=>{
  try {
        const latestBooking = await Appointment.find({})
  .populate({
    path: "drid",
    populate: {
      path: "userid",
      select: "name"
    }
  });
        return res.json({status:true,message:"latest Booking fetched",booking:latestBooking});
  } catch (error) {
    console.log(error);
    return res.json({success:false,message:"Internal server Errror"});
  }
}

const allAppointmentsAdmin=async(req,res)=>{
  try {
      const appointments=await Appointment.find({})
      .populate({
        path:"uid",
        select:"name age"
      })
      .populate({
        path:"drid",
        select:"Fees",
        populate:{
          path:"userid",
          select:"name"
        }
      });
      return res.json({success:true,message:"Appointments fetched successfully",appointment:appointments});
  } catch (error) {
    console.log(errro);
    return res.json({success:false,message:"Internal server Error"})
  }
}

const cancelllAppointment=async(req,res)=>{
  const {id}=req.body;
  
  try {
    const updatedAppointment=await Appointment.findByIdAndUpdate(id,{$set:{status:"cancelled"}},{new:true});
    if(updatedAppointment)
    {
      return res.json({status:true,message:"Appointment cancelled successfully"});
    }
  } catch (error) {
    console.log(error); 
    return res.json({status:false,message:"Internal server Error"});
  }
}


export { Login ,insertUser,editUser,deleteUser,addDoctor,listDoctor,deleteDoctor,totalAdminDataCount,latestBookingAdmin,allAppointmentsAdmin,cancelllAppointment};
