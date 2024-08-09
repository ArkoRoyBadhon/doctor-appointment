import { api } from "@/redux/api/appSlice";

const appointmentAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getAppointmentByPatient: builder.query({
      query: ({ page = 1, limit = 10, filter = "scheduled" }) => ({
        url: "/appointment/a/patient/get",
        method: "GET",
        params: { page, limit, status: filter },
      }),
      providesTags: ["appointment"],
    }),
    getAppointmentByDoctor: builder.query({
      query: () => ({
        url: "/appointment/a/doctor/get",
        method: "GET",
      }),
      providesTags: ["appointment"],
    }),
    getAppointmentById: builder.query({
      query: (id: string) => ({
        url: `/appointment/a/get/${id}`,
        method: "GET",
      }),
      providesTags: ["appointment"],
    }),
    updateAppointmentById: builder.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/appointment/update/${id}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["appointment"],
    }),
    createAppointment: builder.mutation({
      query: (data) => ({
        url: `/appointment/create`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointment"],
    }),
  }),
  // overrideExisting: false,
});

export const {
  useGetAppointmentByPatientQuery,
  useGetAppointmentByDoctorQuery,
  useGetAppointmentByIdQuery,
  useUpdateAppointmentByIdMutation,
  useCreateAppointmentMutation,
} = appointmentAPI;
