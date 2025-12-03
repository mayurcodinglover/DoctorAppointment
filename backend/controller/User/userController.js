import Appointment from "../../models/appointments.js";

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

export {createAppointment};