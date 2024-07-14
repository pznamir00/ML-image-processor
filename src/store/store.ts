import { configureStore } from "@reduxjs/toolkit";
import datasetsReducer from "./datasets/reducer";
import { imagesApi } from "./images/api";
import imagesReducer from "./images/reducer";

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    datasets: datasetsReducer,
    [imagesApi.reducerPath]: imagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(imagesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
