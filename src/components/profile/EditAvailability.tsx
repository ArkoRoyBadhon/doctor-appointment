"use client";
import { useState, useEffect } from "react";
import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hook"; // Assuming you have this hook setup for Redux
import { useUpdateProfileMutation } from "@/redux/features/profile/profileApi";
import { setUser } from "@/redux/features/user/userSlice";
import { toast } from "sonner";
import * as Yup from "yup";
import { useGetAllSpecializationsQuery } from "@/redux/features/specializations/specializations.api";
import { FaArrowLeftLong } from "react-icons/fa6";
import Link from "next/link";

const validationSchema = Yup.object({
  specialization: Yup.string().required("Required"),
  availability: Yup.array().of(
    Yup.object({
      day: Yup.string().required("Required"),
      startTime: Yup.string().required("Required"),
      endTime: Yup.string().required("Required"),
      maxPatient: Yup.number().required("Required").positive(),
    })
  ),
});

const EditSpecializationAvailability = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [updateProfile] = useUpdateProfileMutation();

  const { data } = useGetAllSpecializationsQuery(undefined);

  const initialValues = {
    specialization: user.specialization || "",
    availability: user.availability?.length
      ? user.availability
      : [{ day: "", startTime: "", endTime: "", maxPatient: 1 }],
  };

  const handleSubmit = async (values: any) => {
    try {
      console.log("Specialization and Availability", values);
      dispatch(setUser(values));
      await updateProfile(values);
      toast.success("Profile updated successfully");
      router.push("/profile");
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  return (
    <section className="mt-[20px]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 md:w-[600px] my-[20px]">
          <Link className="" href="/profile">
            <FaArrowLeftLong />
          </Link>
          <h2 className="mb-1 mt-[10px] text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Update Specialization & Availability
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({ values, isSubmitting }) => (
              <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div>
                  <label
                    htmlFor="specialization"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Specialization
                  </label>
                  <Field
                    as="select"
                    name="specialization"
                    id="specialization"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="" label="Select specialization" />
                    {data &&
                      data.data.map((specialization: any) => (
                        <option
                          key={specialization._id}
                          value={specialization._id}
                        >
                          {specialization.label}
                        </option>
                      ))}
                  </Field>
                </div>

                <FieldArray name="availability">
                  {({ insert, remove, push }) => (
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Availability
                      </label>
                      {values.availability.length > 0 &&
                        values.availability.map((availability, index) => (
                          <div
                            className="flex flex-wrap -mx-2 mb-4"
                            key={index}
                          >
                            <div className="w-full md:w-1/4 px-2">
                              <label
                                htmlFor={`availability.${index}.day`}
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Day
                              </label>
                              <Field
                                as="select"
                                name={`availability.${index}.day`}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                              >
                                <option value="" label="Select day" />
                                <option value="Monday" label="Monday" />
                                <option value="Tuesday" label="Tuesday" />
                                <option value="Wednesday" label="Wednesday" />
                                <option value="Thursday" label="Thursday" />
                                <option value="Friday" label="Friday" />
                                <option value="Saturday" label="Saturday" />
                                <option value="Sunday" label="Sunday" />
                              </Field>
                              <ErrorMessage
                                name={`availability.${index}.day`}
                                component="div"
                                className="text-red-600 text-sm"
                              />
                            </div>
                            <div className="w-full md:w-1/4 px-2">
                              <label
                                htmlFor={`availability.${index}.startTime`}
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Start Time
                              </label>
                              <Field
                                type="time"
                                name={`availability.${index}.startTime`}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                              />
                              <ErrorMessage
                                name={`availability.${index}.startTime`}
                                component="div"
                                className="text-red-600 text-sm"
                              />
                            </div>
                            <div className="w-full md:w-1/4 px-2">
                              <label
                                htmlFor={`availability.${index}.endTime`}
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                End Time
                              </label>
                              <Field
                                type="time"
                                name={`availability.${index}.endTime`}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                              />
                              <ErrorMessage
                                name={`availability.${index}.endTime`}
                                component="div"
                                className="text-red-600 text-sm"
                              />
                            </div>
                            <div className="w-full md:w-1/4 px-2">
                              <label
                                htmlFor={`availability.${index}.maxPatient`}
                                className="block mb-2 text-sm font-medium text-gray-900"
                              >
                                Max Patient
                              </label>
                              <Field
                                type="number"
                                name={`availability.${index}.maxPatient`}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                              />
                              <ErrorMessage
                                name={`availability.${index}.maxPatient`}
                                component="div"
                                className="text-red-600 text-sm"
                              />
                            </div>
                            <div className="w-full md:w-1/4 px-2 mt-4">
                              <button
                                type="button"
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                        onClick={() =>
                          push({
                            day: "",
                            startTime: "",
                            endTime: "",
                            maxPatient: 1,
                          })
                        }
                      >
                        Add Availability
                      </button>
                    </div>
                  )}
                </FieldArray>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full text-white bg-primaryBg hover:bg-primaryBgHover duration-[0.2s] hover:scale-[0.97] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Save Changes
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default EditSpecializationAvailability;
