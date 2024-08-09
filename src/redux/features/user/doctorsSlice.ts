import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type UserType = {
  name?: string;
  email?: string;
  password?: string;
  age?: string;
  gender?: string;
  phone?: string;
  location?: string;
  about?: string;
  fee?: number | string;
  specialization?: string
};

// Define initial state
export const InitialDoctor: UserType = {
  name: '',
  email: '',
  password: '',
  gender: '',
  phone: '',
  location: '',
  about: '',
  fee: 0,
  specialization: ""
};

const doctorSlice = createSlice({
  name: 'doctor',
  initialState: InitialDoctor,
  reducers: {
    setDoctor(state, action: PayloadAction<UserType>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;