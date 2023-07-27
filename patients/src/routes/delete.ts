import { requireAuth } from "@v1nnyc/common";
import express, { Request, Response } from "express";
import { Patient } from "../models/patient";

const router = express.Router();

router.delete(
  "/api/patients/:patientId",
  requireAuth,
  async (req: Request, res: Response) => {
    const patientId = req.params.patientId;

    // Find the patient by id and delete it
    const patient = await Patient.findById(patientId);

    // Check if the patient exists
    if (!patient) {
      return res.status(404).send({ error: "Patient not found" });
    }

    // Check if the patient is associated with the logged-in user
    if (patient.providerId.toString() !== req.currentUser!.id) {
      return res.status(401).send({ error: "Not authorized" });
    }

    // Delete the patient
    await Patient.findByIdAndDelete(patientId);

    res.status(200).send({ message: "Patient deleted successfully" });
  }
);

export { router as deletePatientRouter };
