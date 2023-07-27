import { requireAuth } from "@v1nnyc/common";
import express, { Request, Response } from "express";
import { Patient } from "../models/patient";

const router = express.Router();

router.get(
  "/api/patients/",
  requireAuth,
  async (req: Request, res: Response) => {
    const patients = await Patient.find({
      providerId: req.currentUser!.id,
    });

    res.send({ patients });
  }
);

export { router as indexPatientsRouter };
