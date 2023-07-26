import { requireAuth } from "@v1nnyc/common";
import express, { Request, Response } from "express";
// import { Order } from "../models/patient";

const router = express.Router();

router.get(
  "/api/patients/",
  // requireAuth,
  async (req: Request, res: Response) => {
    // const orders = await Order.find({
    //   userId: req.currentUser!.id,
    // }).populate("ticket");

    res.send([
      {
        patientId: "123456",
        providerId: "123",
        firstName: "John",
        middleName: "Doe",
        lastName: "Smith",
        status: "PatientStatus.ACTIVE",
      },
    ]);
  }
);

export { router as indexPatientsRouter };
