import mongoose from "mongoose";

const roleSchema=await mongoose.Schema({
    rolename:{type:String,required:true},

},
{
    timestamps:true
});
const Role= mongoose.model("Role",roleSchema);
export default Role;