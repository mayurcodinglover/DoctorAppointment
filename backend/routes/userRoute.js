import express from "express";
import { createAppointment } from "../controller/User/userController.js";

const userroute=express.Router();

userroute.post("/bookappointment",createAppointment);

export default userroute;