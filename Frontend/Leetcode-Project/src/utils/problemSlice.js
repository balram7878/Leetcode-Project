import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "./axiosClient";

export const getAllProblems = createAsyncThunk(
  "problemSlice/getAllProblems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("problem/getAllProblems");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const getSolvedProblems = createAsyncThunk(
  "problemSlice/getSolvedProblems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("problem/solvedProblems");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const problemSlice = createSlice({
  name: "problemSlice",
  initialState: {
    allProblems: [],
    solvedProblems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.allProblems = action.payload;
      })
      .addCase(getAllProblems.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.allProblems = [];
      })
      .addCase(getSolvedProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSolvedProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.solvedProblems = action.payload;
      })
      .addCase(getSolvedProblems.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
        state.solvedProblems = [];
      });
  },
});

export default problemSlice.reducer;
