import express, { Request, Response } from "express";
import { body } from "express-validator";

import { User } from "../models/user";
import { validateRequest, BadRequestError } from "@v1nnyc/common";
import Password from "../services/password";
import jt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("you must supply a password!"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError("Email not in use");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("invalid credentials");
    }

    const userJwt = jt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
