import axios from "axios";
import { signoutUser } from "../features/user/userSlice";

const customFetch = axios.create({
  baseURL: "https://finni.dev/api",
});

export const checkForUnauthorizedResponse = (error, thunkAPI) => {
  if (error.response.status === 401) {
    thunkAPI.dispatch(signoutUser());
    return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
  }
  return thunkAPI.rejectWithValue(error.response.data.msg);
};

export default customFetch;
