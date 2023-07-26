import express from "express";
import { currentUser } from "@v1nnyc/common";

const router = express.Router();

router.use(currentUser);

router.get("/api/users/currentuser", currentUser, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
