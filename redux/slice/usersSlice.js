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
    HANDLE_FOLLOW: (state, action) => {
      state.activeUser = {
        ...state.activeUser,
        data: {
          ...state.activeUser.data,
          following: [...state.activeUser.data.following, action.payload],
        },
      };
      state.otherUsers = state.otherUsers.map((user) => {
        if (user.id === action.payload) {
          return {
            ...user,
            data: {
              ...user.data,
              followers: [...user.data.followers, action.payload],
            },
          };
        }
        return user;
      });
    },
  },
});

export const { GET_USERS, HANDLE_FOLLOW } = usersSlice.actions;
export const selectActiveUser = (state) => state.users.activeUser;
export const selectOtherUsers = (state) => state.users.otherUsers;

export default usersSlice.reducer;
