"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import "react-phone-number-input/style.css";
import * as Yup from "yup";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useAppDispatch } from "@/redux/hook";
import { InitialDoctor, setDoctor } from "@/redux/features/user/doctorsSlice";
import { toast } from "sonner";



const initialValues = {
  name: "",
  location: "",
  about: "",
  gender: "",
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  location: Yup.string().required("locations is required"),
  about: Yup.string().required("Write about your self"),
});
type TValues = typeof initialValues;

const Step1 = ({handleNext}:{handleNext: () => void}) => {
  const [phone, setContactNumber] = useState<string>("");
  const dispatch = useAppDispatch() 
  const handleSubmit = async (values: TValues) => {
   console.log("step 1", {...values, gender: values.gender || "male", phone});


   if(values.name && phone && values.location && values.about) {
    const payload = {
      ...InitialDoctor,
      ...values,
      gender: values.gender || "male", phone
    } 
    dispatch(setDoctor(payload))
    handleNext()
   } else {
   toast.warning("Please Fill All The Fields")
   }

  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6  mx-auto pb-[50px]">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-[550px] xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Your Basic Info
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
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      className={`bg-gray-50 border ${
                        errors.name && touched.name
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="David Putra"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your Location
                    </label>
                    <Field
                      type="text"
                      name="location"
                      id="location"
                      className={`bg-gray-50 border ${
                        errors.location && touched.location
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Location..."
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Your Phone Number
                    </label>
                    <PhoneInput
                      defaultCountry="BD"
                      international
                      placeholder="Enter your phone number"
                      onChange={(value) => setContactNumber(value as string)}
                      className={`bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      style={phone ? { border: "1px solid red" } : {}}
                    />
                    {/* <p className="text-[#ff6767] text-[14px] mt-[5px]">
                      {phone}
                    </p> */}
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      About yourself
                    </label>
                    <Field
                      as="textArea"
                      type="text"
                      name="about"
                      id="about"
                      className={`bg-gray-50 border ${
                        errors.about && touched.about
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Hello! I'm.."
                    />
                    <ErrorMessage
                      name="about"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Select your gender
                    </label>
                    <Field
                      as="select"
                      name="gender"
                      id="gender"
                      className={`bg-gray-50 border ${
                        errors.gender && touched.gender
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Hello! I'm.."
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Other</option>
                    </Field>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primaryBg hover:bg-primaryBgHover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Next
                  </button>
                  <p className="text-sm font-light text-gray-500  center justify-start gap-[2px]">
                    Already have an account?
                    <Link
                      href="/login"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                  <p className="text-sm font-light text-gray-500 center justify-start gap-[2px]">
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

export default Step1;
