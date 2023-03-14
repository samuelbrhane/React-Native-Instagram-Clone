import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUser: undefined,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    ACTIVE_USER: (state, action) => {
      state.activeUser = action.payload;
    },
    LOGOUT_USER: (state, action) => {
      state.activeUser = undefined;
    },
  },
});

export const { ACTIVE_USER, LOGOUT_USER } = usersSlice.actions;
export const selectActiveUser = (state) => state.users.activeUser;

export default usersSlice.reducer;
