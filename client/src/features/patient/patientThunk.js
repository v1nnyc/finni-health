// import { showLoading, hideLoading, getAllJobs } from '../allJobs/allJobsSlice';
import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";
import { clearValues } from "./patientSlice";

export const createPatientThunk = async (patient, thunkAPI) => {
  try {
    const resp = await customFetch.post("/patients", patient);
    thunkAPI.dispatch(clearValues());
    return resp.data.msg;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const deletePatientThunk = async (patientId, thunkAPI) => {
  // thunkAPI.dispatch(showLoading());
  try {
    const resp = await customFetch.delete(`/patients/${patientId}`);
    // thunkAPI.dispatch(getAllJobs());
    return resp.data.msg;
  } catch (error) {
    // thunkAPI.dispatch(hideLoading());
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
export const editPatientThunk = async ({ patientId, patient }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/patients/${patientId}`, patient);
    thunkAPI.dispatch(clearValues());
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
