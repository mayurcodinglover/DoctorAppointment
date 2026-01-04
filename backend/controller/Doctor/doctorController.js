import Doctor from "../../models/doctor.js";
import Appointment from "../../models/appointments.js";

const totalDoctorDataCount=async(req,res)=>{
    try {
        const id=req.user.id;
        let fees;
        const doctor=await Doctor.findOne({userid:id}).select("Fees");
        if(doctor)
        {
            fees=doctor?.Fees;
        }
        const totalAppointments=await Appointment.countDocuments({drid:doctor._id});
        const uniquePatients=await Appointment.distinct("uid",{drid:doctor._id});
        const totalPatients=uniquePatients.length;
        const completeAppointment=await Appointment.countDocuments({drid:doctor._id,status:"complete"});
        const totalEarning=completeAppointment*fees;

        return res.json({status:true,message:"data fetched successfully",data:{totalAppointments,totalPatients,totalEarning}});
    } catch (error) {
        console.log(error);
        res.json({status:false,message:"Internal server error"});
    }
}
const latestBookingDoctor=async(req,res)=>{
    try {
        const id=req.user.id;
        const did=await Doctor.find({userid:id});
        const appointment=await Appointment.find({drid:did},"booking_date uid status").populate({
           path: "drid",
           select:"image",
    populate: {
      path: "userid",
      select: "name"
    }
        });
        return res.json({status:true,message:"Latest Booking get",appointment});
    } catch (error) {
        console.log(error);
        return res.json({status:false,message:"Internal server error"});
    }
}

const allAppointmentsDoctor=async(req,res)=>{
    try {
        const allappointment=await Appointment.find({},"payment_mode date time").populate({
            path:"drid",
            select:"Fees",
        }).populate({
            path:"uid",
            select:"age name"
        });
        return res.json({status:true,message:"AllApointment get",allappointment});
    } catch (error) {
        console.log(error);
        return res.json({status:false,message:"Internal server Error"});
    }
}

const changeAppointmentStatus=async(req,res)=>{
    try {
        const {id,status}= req.body;
        const appointment=await Appointment.find({_id:id});
        if(!appointment)
        {
            return res.json({status:false,message:"Appointment not found"});
        }
        const updatedAppointment=await Appointment.findByIdAndUpdate(id,{$set:{status}},{new:true});
        return res.json({status:true,message:"status changed successfully",updatedAppointment});
    } catch (error) {
        console.log(errro);
        return res.json({status:false,message:"Internal server Error"});
    }
}

export {totalDoctorDataCount,latestBookingDoctor,allAppointmentsDoctor,changeAppointmentStatus}