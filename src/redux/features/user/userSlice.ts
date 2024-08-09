import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Availability {
  day: string;
  startTime: string;
  endTime: string;
  maxPatient: number;
}

export type UserType = {
  _id: string;
  name: string;
  email: string;
  password: string;
  picture: string;
  age?: string;
  gender?: string;
  phone?: string;
  location?: string;
  isVarify: boolean;
  file: string;
  role: string;
  about?: string;
  fee?: number;
  specialization?: string;
  availability?: Availability[];
};

export const initialState: UserType = {
  _id: "",
  name: "",
  email: "",
  password: "",
  picture: "",
  age: "",
  gender: "",
  phone: "",
  location: "",
  isVarify: false,
  file: "",
  role: "",
  about: "",
  fee: 0,
  specialization: "",
  availability: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(_, action: PayloadAction<UserType>) {
      return { ...action.payload };
    },
    updateUserField(state, action: PayloadAction<Partial<UserType>>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUser, updateUserField } = userSlice.actions;
export default userSlice.reducer;
