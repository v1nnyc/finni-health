import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createPatientThunk,
  deletePatientThunk,
  editPatientThunk,
} from "./patientThunk";
const initialState = {
  isLoading: false,
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  status: "Inquiry",
  statusOptions: ["Inquiry", "Onboarding", "Active", "Churned"],
  addresses: [""],
  additionalTextFields: [""],
  additionalNumericalFields: ["0"],
  isEditing: false,
  editPatientId: "",
};

export const createPatient = createAsyncThunk(
  "patient/createPatient",
  createPatientThunk
);

export const deletePatient = createAsyncThunk(
  "patient/deletePatient",
  deletePatientThunk
);

export const editPatient = createAsyncThunk(
  "patient/editPatient",
  editPatientThunk
);

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearValues: () => {
      return {
        ...initialState,
      };
    },
    setEditPatient: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPatient.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Patient Created");
      })
      .addCase(createPatient.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deletePatient.fulfilled, (state, { payload }) => {
        toast.success("Patient Deleted...");
      })
      .addCase(deletePatient.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPatient.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Patient Modified...");
      })
      .addCase(editPatient.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.toString());
      });
  },
});

export const { handleChange, clearValues, setEditPatient } =
  patientSlice.actions;

export default patientSlice.reducer;
