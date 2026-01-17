import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allAppointmentsDoctor, changeAppointmentStatus, latestBookingDoctor, totalDoctorDataCount ,getDoctor, updateDoctor} from "../controller/Doctor/doctorController.js";

const app=express.Router();

app.get("/doctordatacount",authMiddleware,totalDoctorDataCount);
app.get("/latestbookingdoctor",authMiddleware,latestBookingDoctor);
app.get("/allappointmentsdoctor",allAppointmentsDoctor);
app.post("/changeappointmentstatus",changeAppointmentStatus);
app.get("/getdoctoruser",authMiddleware,getDoctor);
app.post("/updatedoctor",authMiddleware,updateDoctor);

export default app;