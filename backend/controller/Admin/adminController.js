import User from "../../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Role from "../../models/role.js";
import Doctor from "../../models/doctor.js";
import Appointment from "../../models/appointments.js";

const Register=async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    console.log(name,email,password);
    
    const user=await User.findOne({email});
    if(user)
    {
      return res.json({status:false,messge:"User Already exist"});
    }
    const role=await Role.find({rolename:"User"});
    console.log(role);
    
    const hashpassword=await bcrypt.hash(password,10);
    const usersave=User({
      name:name,
      roleid:role[0]._id,
      email:email,
      password:hashpassword
    });
    await usersave.save();
    const token=jwt.sign(
      {id:usersave._id,role:usersave.roleid.rolename},
      process.env.JWT_SECRET,
      {expiresIn:process.env.JWT_EXPIRE}
    );
    return res.json({status:true,message:"user created successfully",token:token,user:usersave});
  } catch (error) {
    console.log(error);
  }
}
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
const getUser=async(req,res)=>{
  const {id}=req.params;
  try {
    const user=await User.findById(id);
    if(!user)
    {
      return res.json({status:false,message:"User not found"});
    }
    return res.json({status:true,message:"User get",data:user});
  } catch (error) {
    console.log(error);
    return res.json({status:false,message:"Internal server Error"});
    
  }
}

const getUserDoctor=async (req,res)=>{
  try {
      const alldoctoruser=await User.find({roleid:'6929c41b374701cef30d6cfc'});
      if(alldoctoruser)
      {
        return res.json({status:"true",message:"All Doctor user fetch successfully",data:alldoctoruser});
      }
  } catch (error) {
    console.log(error);
    return res.json({status:false,message:"Internal server Error"});
  }
}

//User CRUD
const insertUser=async (req,res)=>{
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
        return res.json({status:true,message:"User inserted Successfully"});
    } catch (error) {
        console.log(error);
        return res.json({status:false,message:"Internal server error"});
    }
}
const updateUser=async(req,res)=>{
    try {
        const {_id,name,email,password,roleid}=req.body;
        let hashedPassword;
        console.log(_id,name,email,password,roleid);
        
        if(password)
        {
             hashedPassword=await bcrypt.hash(password,10);
        }
        const user=await User.findByIdAndUpdate(_id,{$set:{
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
        const user=await User.findById(id);
        if(!user)
        {
          return res.json({status:false,message:"User not found"});
        }
        const doctor=await Doctor.findOne({userid:id});
        if(doctor)
        {
          await Appointment.deleteMany({drid:doctor._id});
          await Doctor.findByIdAndDelete(doctor._id);
        }
        await Appointment.deleteMany({uid:id});

        await User.findByIdAndDelete(id);

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
    const allDoctor=await Doctor.find({}).populate("userid");
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
        select:"Fees image",
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
const listUsers=async(req,res)=>{
  try {
    const users=await User.find({}).populate("roleid");
    if(!users)
    {
      return res.json({status:false,message:"No User Found"});
    }
    console.log(users);
    return res.json({status:true,message:"users fetch successfully",data:users});
  } catch (error) {
    console.log(error);
    return res.json({status:false,message:error});
  }
}


export { Login ,insertUser,updateUser,deleteUser,addDoctor,listDoctor,deleteDoctor,totalAdminDataCount,latestBookingAdmin,allAppointmentsAdmin,cancelllAppointment,getUserDoctor,listUsers,getUser,Register};
