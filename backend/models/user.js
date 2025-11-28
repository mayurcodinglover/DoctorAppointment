import mongoose from "mongoose";

const userSchema=await mongoose.Schema({
    name:{type:String,required:true},
    roleid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Role",
        required:true
    },
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phoneno:{type:String},
    gender:{type:String},
    age:{type:String},
},
{
    timestamps:true
});

const User=mongoose.model("User",userSchema);
export default User;