import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllPatientsThunk } from "./allPatientsThunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  patients: [],
  totalPatients: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const getAllPatients = createAsyncThunk(
  "patients/",
  getAllPatientsThunk
);

const allPatientsSlice = createSlice({
  name: "allPatients",
  initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true;
    },
    hideLoading: (state) => {
      state.isLoading = false;
    },
    handleChange: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    changePage: (state, { payload }) => {
      state.page = payload;
    },
    clearAllPatientsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPatients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPatients.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.patients = payload.patients;
        // state.numOfPages = payload.numOfPages;
        // state.totalPatients = payload.totalPatients;
      })
      .addCase(getAllPatients.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllPatientsState,
} = allPatientsSlice.actions;

export default allPatientsSlice.reducer;
