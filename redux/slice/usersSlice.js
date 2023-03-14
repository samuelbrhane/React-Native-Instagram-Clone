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
    REMOVE_USER: (state, action) => {
      state.users = state.users.filter(
        (user) => user.data.id !== action.payload
      );
    },
    FOLLOW_USER: (state, action) => {
      console.log("state.users", state.users);
      console.log("state.activeUsers", state.activeUser);
      state.users = state.users.map((user) => {
        if (user.data.id === action.payload)
          return {
            ...user,
            data: {
              ...user.data,
              followers: [...user.data.followers, action.payload],
            },
          };
        else if (user.data.id === state.activeUser.id) {
          return {
            ...user,
            data: {
              ...user.data,
              following: [...user.data.following, action.payload],
            },
          };
        }
        return user;
      });
    },
  },
});

export const {
  ACTIVE_USER,
  LOGOUT_USER,
  GET_USERS,
  GET_USER_POSTS,
  REMOVE_USER,
  FOLLOW_USER,
} = usersSlice.actions;
export const selectActiveUser = (state) => state.users.activeUser;
export const selectUsers = (state) => state.users.users;
export const selectUserPosts = (state) => state.users.userPosts;

export default usersSlice.reducer;
