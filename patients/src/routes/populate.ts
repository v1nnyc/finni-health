import { requireAuth } from "@v1nnyc/common";
import express, { Request, Response } from "express";
import { Patient, PatientStatus } from "../models/patient";
import { faker } from "@faker-js/faker";

const router = express.Router();

router.get(
  "/api/patients/populate/:count",
  requireAuth,
  async (req: Request, res: Response) => {
    const patientCount = Number(req.params.count);
    const patients = [];

    for (let i = 0; i < patientCount; i++) {
      const addresses = Array.from({ length: faker.number.int(5) }, () =>
        faker.location.streetAddress()
      );

      const additionalTextFields = Array.from(
        { length: faker.number.int(5) },
        () => faker.word.words()
      );

      const additionalNumericalFields = Array.from(
        { length: faker.number.int(5) },
        () => faker.number.int(10000)
      );

      const patient = Patient.build({
        providerId: req.currentUser!.id,
        firstName: faker.person.firstName(),
        middleName: faker.person.middleName(),
        lastName: faker.person.lastName(),
        dateOfBirth: faker.date.birthdate(),
        status: faker.helpers.arrayElement(Object.values(PatientStatus)),
        addresses: addresses,
        additionalTextFields: additionalTextFields,
        additionalNumericalFields: additionalNumericalFields,
      });

      await patient.save();
      patients.push(patient);
    }

    res.status(201).send(patients);
  }
);

export { router as populateRouter };
