import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";

import { currentUser, errorHandler, NotFoundError } from "@v1nnyc/common";
import { indexPatientsRouter } from "./routes";
// import { showOrdersRouter } from "./routes/show";
import { newPatientRouter } from "./routes/new";
import { deletePatientRouter } from "./routes/delete";
import { updatePatientRouter } from "./routes/patch";
import { populateRouter } from "./routes/populate";
// import { patchOrdersRouter } from "./routes/patch";
const cors = require("cors");

const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(indexPatientsRouter);
app.use(newPatientRouter);
app.use(updatePatientRouter);
app.use(deletePatientRouter);
app.use(populateRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
