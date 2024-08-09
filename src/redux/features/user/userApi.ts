import { api } from "@/redux/api/appSlice";
import { IDoctor, IPatient } from "../../../../Types/user";

const userAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    registerPatient: builder.mutation({
      query: (patient: IPatient) => ({
        url: "/auth/register",
        method: "POST",
        body: patient,
      }),
      invalidatesTags: ["user"],
    }),
    registerDoctor: builder.mutation({
      query: (doctor: Partial<IDoctor>) => ({
        url: "/auth/register-doctor",
        method: "POST",
        body: doctor,
      }),
      invalidatesTags: ["user"],
    }),
    login: builder.mutation({
      query: (payload: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["user"],
    }),
    getAuthor: builder.query({
      query: (token: string) => ({
        url: "/auth/auth-state",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["user"],
    }),
  }),
});

export const {
  useRegisterPatientMutation,
  useRegisterDoctorMutation,
  useLoginMutation,
  useGetAuthorQuery,
} = userAPI;
