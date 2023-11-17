import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AuthState {
  name: string | null;
}

const initialState: AuthState = {
  name: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ name: string }>) => {
      state.name = action.payload.name;
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: action.payload.name,
        })
      );
    },
  },
});

export const { setUser } = authSlice.actions;

export const selectUserName = (state: RootState) => state.auth;

export default authSlice.reducer;
