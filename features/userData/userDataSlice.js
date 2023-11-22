"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "@/api/server";

const initialState = {
  userDetails: {},
};

export const getUserDetails = createAsyncThunk(
  "userDetails/getUserDetails",
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      //   const resp = await Axios.get(url);
      if (name.toLowerCase() === "employer") {
        const res = await Axios.get(
          `/jobRecruiter/getJobRecruiterById/${sessionStorage.getItem(
            "employerId"
          )}`
        );
        return res.data.data;
      }
      if (name.toLowerCase() === "job-seeker") {
        const res = await Axios.get(
          `/jobSeeker/getJobSeekerById/${sessionStorage.getItem("jobSeekerId")}`
        );
        return res.data.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.fulfilled, (state, action) => {
        console.log(action, "hihihihihihi extra");
        state.userDetails = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        console.log(action);
      });
  },
});

// console.log();

export default userDataSlice.reducer;
