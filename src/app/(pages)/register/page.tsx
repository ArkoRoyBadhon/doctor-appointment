"use client";
import { useRegisterPatientMutation } from "@/redux/features/user/userApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PhoneInput, {
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  name: "",
  age: "1",
  email: "",
  password: "",
  confirmPassword: "",
};
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  age: Yup.number().required("Age is required").min(1),
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

const page = () => {
  const [createPatient, logs] = useRegisterPatientMutation();

  const [phone, setContactNumber] = useState<string>("");
  const [contactErr, setContactErr] = useState<string>("");
  const [gender, setGender] = useState<string>("male");

  const router = useRouter();

  const handleSubmit = async (values: TValues) => {
    if (!isPossiblePhoneNumber(phone) || !isValidPhoneNumber(phone)) {
      return setContactErr("Invalid phone number");
    }

    const toastId = toast.loading("Please wait...");

    try {
      const { data: res } = await createPatient({ ...values, gender, phone });

      if (!res) {
        return toast.error("Email already in used");
      }
      if (!res.success) {
        return toast.error(res.message || "Failed to create your account");
      }
      toast.success("User created successfully");
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
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6  mx-auto py-[50px]">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-[550px] xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create your Patient account
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
                      htmlFor="age"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your Age
                    </label>
                    <Field
                      type="number"
                      name="age"
                      id="age"
                      className={`bg-gray-50 border ${
                        errors.age && touched.age
                          ? "border-red-500"
                          : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                      placeholder="Age"
                    />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Your Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="bg-gray-50 border text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
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
                      style={contactErr ? { border: "1px solid red" } : {}}
                    />
                    <p className="text-[#ff6767] text-[14px] mt-[5px]">
                      {contactErr}
                    </p>
                  </div>
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
                      href="/register/doctor"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Doctor?
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

export default page;
