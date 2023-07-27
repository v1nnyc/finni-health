import express, { Request, Response } from "express";
import { body } from "express-validator";
import jt from "jsonwebtoken";

import { User } from "../models/user";
import { BadRequestError, validateRequest } from "@v1nnyc/common";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const existingUserWithEmail = await User.findOne({ email });

    if (existingUserWithEmail) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ name, email, password });

    await user.save();

    const userJwt = jt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
