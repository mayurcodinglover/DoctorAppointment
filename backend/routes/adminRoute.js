import express from "express";
import { addDoctor, allAppointmentsAdmin, cancelllAppointment, deleteDoctor, deleteUser, updateUser, getUserDoctor, insertUser, latestBookingAdmin, listDoctor, Login, totalAdminDataCount,listUsers,getUser } from "../controller/Admin/adminController.js";
import upload from "../config/multerConfig.js";

const adminroute=express.Router();
adminroute.post("/login",Login);
adminroute.post("/insertuser",insertUser);
adminroute.put("/edituser",updateUser);
adminroute.delete("/deleteuser/:id",deleteUser);
adminroute.post('/adddoctor',upload.single("image"),addDoctor);
adminroute.get('/listdoctor',listDoctor);
adminroute.delete("/deletedoctor/:id",deleteDoctor);
adminroute.get("/admindatacount",totalAdminDataCount);
adminroute.get("/latestbookingadmin",latestBookingAdmin);
adminroute.get('/allAppointmentsAdmin',allAppointmentsAdmin);
adminroute.post('/cancelappointment',cancelllAppointment);
adminroute.get('/getdocutoruser',getUserDoctor);
adminroute.get('/getuser/:id',getUser);
adminroute.get('/listusers',listUsers)

export default adminroute;