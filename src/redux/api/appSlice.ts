import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = Cookies.get("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  refetchOnMountOrArgChange: 30,
  tagTypes: [
    "user",
    "signUpData",
    "signInData",
    "sendOTPData",
    "verifyData",
    "userUpdate",
    "profile",
    "appointment",
    "specialization"
  ],
  endpoints: () => ({}),
});
