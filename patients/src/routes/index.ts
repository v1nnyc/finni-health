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
    const page = Number(req.query.page) || 1;

    const pageSize = 10; // number of patients per page

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
        sortOption = { firstName: 1, middleName: 1, lastName: 1 };
      } else if (sort === "z-a") {
        sortOption = { firstName: -1, middleName: -1, lastName: -1 };
      }
    }

    if (status && status.toLowerCase() !== "all") {
      query.status = status;
    }

    const patients = await Patient.find(query)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort(sortOption);

    const totalPatients = await Patient.countDocuments(query);

    res.send({
      patients,
      totalPatients,
      numOfPages: Math.ceil(totalPatients / pageSize),
    });
  }
);

export { router as indexPatientsRouter };
