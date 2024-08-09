"use client";
import { useLoginMutation } from "@/redux/features/user/userApi";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as Yup from "yup";
const initialValues = {
  email: "",
  password: "",
};
type TValues = typeof initialValues;
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});
const page = () => {
  const [login] = useLoginMutation();

  const router = useRouter();

  const handleSubmit = async (values: TValues) => {
    const toastId = toast.loading("Please wait...");

    try {
      const { data: res } = await login(values);

      if (!res) {
        return toast.error("Invalid email or password");
      }
      if (!res.success) {
        return toast.error(res.message || "Failed to create your account");
      }

      if (res.success) {
        Cookies.set("accessToken", res.accessToken);
        Cookies.set("refreshToken", res.refreshToken);
        toast.success("Successfully loged in");
        router.push("/");
      } else {
        toast.error("Failed to retrieve access token");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to login to your account");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
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
                        errors.password ? "border-red-500" : "border-gray-300"
                      } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Link
                      href="/"
                      className="text-sm font-medium text-primary-600 hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primaryBg hover:bg-primaryBgHover focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500">
                    Don’t have an account yet?
                    <Link
                      href="register"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Sign up
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
