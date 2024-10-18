// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import taskManagerReducer from "./taskSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const persistConfig = {
  key: "key",
  storage,
};

const persistedReducer = persistReducer(persistConfig, taskManagerReducer);

export const store = configureStore({
  reducer: {
    taskManager: persistedReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;