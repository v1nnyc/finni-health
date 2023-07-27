import {
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
  requireAuth,
} from "@v1nnyc/common";
import express, { Request, Response } from "express";
import { Patient } from "../models/patient";

const router = express.Router();

router.patch(
  "/api/patients/:patientId",
  requireAuth,
  async (req: Request, res: Response) => {
    const patientId = req.params.patientId;

    // Assuming that the updated details are in the request body
    const updates = req.body;

    const patient = await Patient.findById(patientId);

    if (!patient) {
      throw new NotFoundError();
    }

    if (patient.providerId.toString() !== req.currentUser!.id) {
      throw new NotAuthorizedError("Not authorized to view this patient");
    }

    // Update the patient details with the updated details
    Object.assign(patient, updates);

    // Save the updated patient
    await patient.save();

    res.status(200).send(patient);
  }
);

export { router as updatePatientRouter };
