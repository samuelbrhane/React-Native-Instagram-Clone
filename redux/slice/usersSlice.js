import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeUser: undefined,
  users: [],
  userPosts: [],
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
    GET_USERS: (state, action) => {
      state.users = action.payload;
    },
    GET_USER_POSTS: (state, action) => {
      state.userPosts = action.payload;
    },
  },
});

export const { ACTIVE_USER, LOGOUT_USER, GET_USERS, GET_USER_POSTS } =
  usersSlice.actions;
export const selectActiveUser = (state) => state.users.activeUser;
export const selectUsers = (state) => state.users.users;
export const selectUserPosts = (state) => state.users.userPosts;

export default usersSlice.reducer;
