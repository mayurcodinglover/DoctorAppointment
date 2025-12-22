import Appointment from "../../models/appointments.js";
import Doctor from "../../models/doctor.js";


const createAppointment=async(req,res)=>{
    try {
        const {uid,drid,date,time,booking_date,status,payment_mode,payment_status}=req.body;
        if(!uid || !drid || !date || !time )
        {
            return res.json({status:false,message:"All Field is Reqired"});
        }
        const appointment=new Appointment({
            uid,
            drid,
            date,
            time,
            status,
            payment_mode,
            payment_status
        });
        await appointment.save();
        return res.json({status:true,message:"Appointment Book Successfully"
        });
    } catch (error) {
        console.log(error);
        return res.json({status:false,message:"internal server Error"});
    }
}
const getSpeciality=async(req,res)=>{
    try {
        const speciality=await Doctor.distinct("speciality");
        if(!speciality)
        {
            return res.json({status:false,message:"Not Found"});
        }
        return res.json({status:true,data:speciality});
    } catch (error) {
        console.log(error);
        return res.json({status:false,message:"Internal server Error"});
    }
}
const getDoctorDetails=async(req,res)=>{
    try {
        const drid=req.params.id;
        const doctorDetails=await Doctor.findById(drid).populate("userid");
        if(!doctorDetails)
        {
            return res.json({status:false,message:"Not Found Doctor Details"});
        }
        return res.json({status:true,data:doctorDetails});
    } catch (error) {
        console.log(error);
        return res.json({status:false,message:"Internal server Error"});
    }
}

export {createAppointment,getSpeciality,getDoctorDetails};