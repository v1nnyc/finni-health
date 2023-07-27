import { requireAuth } from "@v1nnyc/common";
import express, { Request, Response } from "express";
import { Patient } from "../models/patient";

const router = express.Router();

router.get(
  "/api/patients/",
  requireAuth,
  async (req: Request, res: Response) => {
    const status = req.query.status as string;
    const firstName = req.query.firstName as string;
    const middleName = req.query.middleName as string;
    const lastName = req.query.lastName as string;
    const sort = req.query.sort as string;

    let query: {
      providerId: string;
      status?: string;
      firstName?: any;
      middleName?: any;
      lastName?: any;
    } = {
      providerId: req.currentUser!.id,
    };

    if (firstName) {
      query.firstName = { $regex: new RegExp(firstName, "i") };
    }

    if (middleName) {
      query.middleName = { $regex: new RegExp(middleName, "i") };
    }

    if (lastName) {
      query.lastName = { $regex: new RegExp(lastName, "i") };
    }

    let sortOption = {};
    if (sort) {
      if (sort === "a-z") {
        sortOption = { firstName: 1, middleName: 1, lastName: 1 }; // 1 for ascending order
      } else if (sort === "z-a") {
        sortOption = { firstName: -1, middleName: -1, lastName: -1 }; // -1 for descending order
      }
    }

    if (status && status.toLowerCase() !== "all") {
      query.status = status;
    }

    const patients = await Patient.find(query).sort(sortOption);

    res.send({ patients });
  }
);

export { router as indexPatientsRouter };
