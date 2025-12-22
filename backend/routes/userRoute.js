import express from "express";
import { createAppointment, getDoctorDetails, getSpeciality } from "../controller/User/userController.js";

const userroute=express.Router();

userroute.post("/bookappointment",createAppointment);
userroute.get("/getspeciality",getSpeciality);
userroute.get("/getdoctordetails/:id",getDoctorDetails);

export default userroute;