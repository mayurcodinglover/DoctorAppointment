import express from "express";
import { addDoctor, deleteDoctor, deleteUser, editUser, insertUser, listDoctor, Login } from "../controller/Admin/adminController.js";
import upload from "../config/multerConfig.js";

const adminroute=express.Router();
adminroute.post("/login",Login);
adminroute.post("/insertuser",insertUser);
adminroute.put("/edituser",editUser);
adminroute.delete("/deleteuser/:id",deleteUser);
adminroute.post('/adddoctor',upload.single("image"),addDoctor);
adminroute.get('/listdoctor',listDoctor);
adminroute.delete("/deletedoctor/:id",deleteDoctor);

export default adminroute;