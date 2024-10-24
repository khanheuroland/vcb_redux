import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSignIn = createAsyncThunk(
  "signin",
  async ({username, password}) => {
    console.log(username)
    console.log(password)
    const response = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email: username, password: password }),
    });

    const data = await response.json();
    return {userName: username, token: data.token};
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userName: "",
    token: "",
    refreshToken: "",
    status: "idle",
  },
  reducers: {
    updateUserName: (state, action)=>{
        state.userName = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSignIn.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.userName = action.payload.userName;
    })
    .addCase(fetchSignIn.pending, (state)=>{
        state.status = "loading"
    })
    .addCase(fetchSignIn.rejected, (state, action)=>{
        state.status = "error"
    })
  },
});

export const {updateUserName} = authSlice.actions;
export default authSlice.reducer;