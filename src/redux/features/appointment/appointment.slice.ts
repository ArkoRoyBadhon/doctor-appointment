import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctor: "",
  patient: "",
  description: "",
  dayOfWeek: "",
  startTime: "",
  endTime: "",
  status: "",
  fee: "",
};
type Appointment = typeof initialState;
const appointemtSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAppointment(_, action: PayloadAction<Appointment>) {
      return action.payload;
    },
    clearAppointment(_, action) {
      return initialState;
    },
  },
});

export const { setAppointment, clearAppointment } = appointemtSlice.actions;
export default appointemtSlice.reducer;
