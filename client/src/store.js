import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import patientSlice from "./features/patient/patientSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    patient: patientSlice,
  },
});
