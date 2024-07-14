import { configureStore } from "@reduxjs/toolkit";
import datasetsReducer from "./datasets/reducer";
import imagesReducer from "./images/reducer";

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    datasets: datasetsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
