import react, { useId } from "react";
import Doctor from "../../models/doctor";
import Appointment from "../../models/appointments";

const totalDoctorDataCount=async(req,res)=>{
    try {
        const id=req.user.id;
        const doctor=await Doctor.findOne({userid:id}).select("Fees");
        if(doctor)
        {
            const fees=doctor?.Fees;
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

export {totalDoctorDataCount}