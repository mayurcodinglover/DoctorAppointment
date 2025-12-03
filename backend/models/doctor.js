import mongoose from "mongoose";

const doctorSchema=new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    degree:{type:String,required:true},
    Experience:{type:Number,required:true},
    Fees:{type:Number,required:true},
    Address:{type:String,required:true},
    AboutDoctor:{type:String,required:true},
    image:{type:String},
    speciality:{type:String,required:true},
},
{
    timestamps:true
});

const Doctor=mongoose.model("Doctor",doctorSchema);

export default Doctor;