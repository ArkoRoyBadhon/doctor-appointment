"use client";
import { useGetAllSpecializationsQuery } from "@/redux/features/specializations/specializations.api";
import { setDoctor } from "@/redux/features/user/doctorsSlice";
import { useAppDispatch } from "@/redux/hook";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";
import * as Yup from "yup";

const initialValues = {
  fee: "",
};

const validationSchema = Yup.object().shape({
  fee: Yup.number().required("Fee is required").positive("Fee must be positive"),
});

type TValues = typeof initialValues;

const Step2 = ({
  handleNext,
  handlePrevious,
}: {
  handleNext: () => void;
  handlePrevious: () => void;
}) => {
  const [specialization, setSpecialization] = useState("");
  const { data, isLoading } = useGetAllSpecializationsQuery(undefined);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: TValues) => {
    
    if (values.fee && specialization) {
      const payload = {
        ...values,
        specialization,
      };
      dispatch(setDoctor(payload));
      handleNext();
    } else {
      toast.warning("Please Fill All The Fields");
    }
  };

  console.log("aaaa", data && data?.data);
  

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 mx-auto pb-[50px]">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-[550px] xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <button onClick={() => handlePrevious()} className="text-gray-700 hover:text-gray-900 mb-4">
              <FaArrowLeftLong size={24} />
            </button>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Your Specialization and Fee
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-4 md:space-y-6">
                  <div>
                    <label
                      htmlFor="fee"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your visit Fee
                    </label>
                    <Field
                      type="number"
                      name="fee"
                      id="fee"
                      className={`bg-gray-50 border ${
                        errors.fee && touched.fee
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    />
                    <ErrorMessage
                      name="fee"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="specialization"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your specialization
                    </label>
                    <select
                      className={`bg-gray-50 border ${
                        !specialization ? "border-red-500" : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      value={specialization}
                      onChange={(e) => setSpecialization(e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      {data?.data?.map(({ _id, label }:any) => (
                        <option key={_id} value={_id}>{label}</option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-primaryBg hover:bg-primaryBgHover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Next
                  </button>
                  <p className="text-sm font-light text-gray-500 flex items-center justify-start gap-2">
                    Already have an account?
                    <Link
                      href="/login"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                  <p className="text-sm font-light text-gray-500 flex items-center justify-start gap-2">
                    Are you a
                    <Link
                      href="/register"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Patient?
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Step2;
