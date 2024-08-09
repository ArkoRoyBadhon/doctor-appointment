import { api } from "@/redux/api/appSlice";

const reviewAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: "/review/r/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["appointment"],
    }),
  }),
});

export const { useCreateReviewMutation } =
reviewAPI;
