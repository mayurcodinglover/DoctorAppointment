import express from "express";
import { addDoctor, allAppointmentsAdmin, deleteDoctor, deleteUser, editUser, insertUser, latestBookingAdmin, listDoctor, Login, totalAdminDataCount } from "../controller/Admin/adminController.js";
import upload from "../config/multerConfig.js";

const adminroute=express.Router();
adminroute.post("/login",Login);
adminroute.post("/insertuser",insertUser);
adminroute.put("/edituser",editUser);
adminroute.delete("/deleteuser/:id",deleteUser);
adminroute.post('/adddoctor',upload.single("image"),addDoctor);
adminroute.get('/listdoctor',listDoctor);
adminroute.delete("/deletedoctor/:id",deleteDoctor);
adminroute.get("/admindatacount",totalAdminDataCount);
adminroute.get("/latestbookingadmin",latestBookingAdmin);
adminroute.get('/allAppointmentsAdmin',allAppointmentsAdmin);

export default adminroute;