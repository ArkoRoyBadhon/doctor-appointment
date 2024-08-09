import { api } from "../../api/appSlice";

const userProfileApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateProfile: builder.mutation({
      query: (data) => {
        // console.log("From redux: ", data, id);
        return {
          url: `/auth/auth-state/update`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUpdateProfileMutation } = userProfileApi;
