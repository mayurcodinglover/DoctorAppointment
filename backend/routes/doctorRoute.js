import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { allAppointmentsDoctor, changeAppointmentStatus, latestBookingDoctor, totalDoctorDataCount ,getDoctor} from "../controller/Doctor/doctorController.js";

const app=express.Router();

app.get("/doctordatacount",authMiddleware,totalDoctorDataCount);
app.get("/latestbookingdoctor",authMiddleware,latestBookingDoctor);
app.get("/allappointmentsdoctor",allAppointmentsDoctor);
app.post("/changeappointmentstatus",changeAppointmentStatus);
app.get("/getdoctoruser",authMiddleware,getDoctor);

export default app;