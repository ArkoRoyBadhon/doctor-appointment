import { api } from "../../api/appSlice";
interface ISpecialization {
  name: string;
  _id: string;
}
const specializationAPi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllSpecializations: builder.query<{data:ISpecialization[]}, undefined>({
      query: () => {
        return {
          url: `/specialization/get`,
          method: "GET",
        };
      },
      providesTags: ["specialization"],
    }),
  }),
});

export const { useGetAllSpecializationsQuery } = specializationAPi;
