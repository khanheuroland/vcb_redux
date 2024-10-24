import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//Create middleware with redux thunk
export const fetchPerson = createAsyncThunk("users", async (page) => {
  const response = await fetch(`https://reqres.in/api/users?page=${page}`);
  const res = await response.json();
  console.log(res);
  return res;
});

const personSlice = createSlice({
  name: "person",
  initialState: {
    currentPage:1,
    totalPage: 1,
    lstPerson: [],
    status: "idle", //'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerson.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPerson.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentPage = action.payload.page;
        state.totalPage = action.payload.total_pages;
        state.lstPerson = [...state.lstPerson, ...action.payload.data];
      })
      .addCase(fetchPerson.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default personSlice.reducer;
