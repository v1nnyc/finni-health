import { requireAuth } from "@v1nnyc/common";
import express, { Request, Response } from "express";
import { Patient } from "../models/patient";

const router = express.Router();

router.post(
  "/api/patients",
  requireAuth,
  async (req: Request, res: Response) => {
    const patientData = req.body;

    const patient = Patient.build({
      providerId: req.currentUser!.id,
      firstName: patientData.firstName,
      middleName: patientData.middleName,
      lastName: patientData.lastName,
      dateOfBirth: patientData.dateOfBirth,
      status: patientData.status,
    });

    await patient.save();

    res.status(201).send(patient);
  }
);

export { router as newPatientRouter };
