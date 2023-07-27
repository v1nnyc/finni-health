import customFetch, { checkForUnauthorizedResponse } from "../../utils/axios";

export const getAllPatientsThunk = async (_, thunkAPI) => {
  const { page, firstName, middleName, lastName, status, sort } =
    thunkAPI.getState().allPatients;

  let url = `/patients?status=${status}&sort=${sort}&page=${page}`;

  if (firstName) {
    url += `&firstName=${firstName}`;
  }

  if (middleName) {
    url += `&middleName=${middleName}`;
  }

  if (lastName) {
    url += `&lastName=${lastName}`;
  }

  try {
    const resp = await customFetch.get(url);
    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/patients/stats");

    return resp.data;
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI);
  }
};
