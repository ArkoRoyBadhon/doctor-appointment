"use client";
import { useRegisterDoctorMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});
type TValues = typeof initialValues;

const Step3 = ({handlePrevious}: {handlePrevious:()=> void}) => {
  const [createDoctor, logs] = useRegisterDoctorMutation();
  const { name, location, gender, about, phone, fee, specialization } =
    useAppSelector((state) => state.doctor);
  const router = useRouter();

  const handleSubmit = async (values: TValues) => {
    const toastId = toast.loading("Please wait...");

    const info = {
      name,
      location,
      gender,
      about,
      phone,
      fee,
      specialization,
      ...values,
    };

    try {
      const { data: res } = await createDoctor(info);

      if (!res) {
        return toast.error("Email already in used");
      }
      if (!res.success) {
        return toast.error(res.message || "Failed to create your account");
      }
      toast.message("Successfully request for doctor account", {
        description: "Admin confirmation Granted",
      });
      Cookies.set("accessToken", res.accessToken);
      Cookies.set("refreshToken", res.refreshToken);
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Failed to create account");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6  mx-auto pb-[50px]">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-[550px] xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <button onClick={() => handlePrevious()}>
              <FaArrowLeftLong />
            </button>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create your Doctor account
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
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className={`bg-gray-50 border ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="name@company.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className={`bg-gray-50 border ${
                        errors.password && touched.password
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Confirm Password
                    </label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      className={`bg-gray-50 border ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primaryBg hover:bg-primaryBgHover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign up
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

export default Step3;
