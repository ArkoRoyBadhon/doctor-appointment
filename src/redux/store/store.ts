import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/appSlice";
import appointmentSlice from "../features/appointment/appointment.slice";
import userSlice from "../features/user/userSlice";
import doctorSlice from "../features/user/doctorsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    doctor: doctorSlice,
    [api.reducerPath]: api.reducer,
    appointment: appointmentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
