import express from "express";
import { deleteUser, editUser, insertUser, Login } from "../controller/Admin/adminController.js";

const adminroute=express.Router();
adminroute.post("/login",Login);
adminroute.post("/insertuser",insertUser);
adminroute.put("/edituser",editUser);
adminroute.delete("/deleteuser/:id",deleteUser);

export default adminroute;