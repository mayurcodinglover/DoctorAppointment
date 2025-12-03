import mongoose from "mongoose";

const appointmentSchema=mongoose.Schema({
    uid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    drid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Doctor",
        required:true
    },
    date:{type:Date,required:true},
    time:{type:String,required:true},
    booking_date:{type:Date,default:Date.now()},
    status:{type:String,enum:["pending","confirmed","completed","cancelled"],default:"pending"},
    payment_mode:{type:String,enum:["online","cash"],default:"cash"},
    payment_status:{type:String,enum:["paid","unpaid","refunded"],default:"unpaid"}
},
{
    timestamps:true
});

const Appointment=new mongoose.model("Appointment",appointmentSchema);
export default Appointment;