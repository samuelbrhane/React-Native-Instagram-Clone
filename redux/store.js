import { configureStore, combineReducers } from "@reduxjs/toolkit";
import usersSlice from "./slice/usersSlice";

const rootReducer = combineReducers({
  users: usersSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
