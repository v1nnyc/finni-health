import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import patientSlice from "./features/patient/patientSlice";
import allPatientsSlice from "./features/allPatients/allPatientsSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    patient: patientSlice,
    allPatients: allPatientsSlice,
  },
});
