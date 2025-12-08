import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { totalDoctorDataCount } from "../controller/Doctor/doctorController";

const app=express.Router();

app.get("/doctordatacount",authMiddleware,totalDoctorDataCount);