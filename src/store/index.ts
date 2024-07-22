import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from "./slice/user.slice";
import categorySlice from "./slice/category.slice";
import categoryItemSlice from "./slice/categoryitem.slice"
import heroSlice from "./slice/hero.slice";
import itemSlice from "./slice/item.slice";

const reducer = { userSlice, categorySlice, heroSlice, categoryItemSlice, itemSlice };

export const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === "development",
});

// export type of root state from reducers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();