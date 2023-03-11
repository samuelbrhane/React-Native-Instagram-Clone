import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";

const initialState = {
  activeUser: null,
  otherUsers: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    GET_USERS: (state, action) => {
      const currentUser = auth?.currentUser.uid;
      state.activeUser = action.payload.find((user) => user.id === currentUser);
      state.otherUsers = action.payload.filter(
        (user) => user.id !== currentUser
      );
    },
  },
});

export const { GET_USERS } = usersSlice.actions;
export const selectActiveUser = (state) => state.users.activeUser;
export const selectOtherUsers = (state) => state.users.otherUsers;

export default usersSlice.reducer;
