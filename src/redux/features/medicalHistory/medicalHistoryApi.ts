import { api } from "@/redux/api/appSlice";

const medicalHistoryAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getBillingBypatient: builder.query({
      query: ({ page = 1, limit = 10, sort = '-createdAt' }) => ({
        url: "/billing/b/get/user",
        method: "GET",
        params: { page, limit, sort },
      }),
      providesTags: ["appointment"],
    }),
    createBilling: builder.mutation({
      query: (data) => ({
        url: "/billing/b/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointment"],
    }),
  }),
});

export const { useGetBillingBypatientQuery, useCreateBillingMutation } =
  medicalHistoryAPI;
