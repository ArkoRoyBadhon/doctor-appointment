"use client";
import { useUpdateProfileMutation } from "@/redux/features/profile/profileApi";
import { setUser } from "@/redux/features/user/userSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hook"; // Assuming you have this hook setup for Redux
import uploadImage from "@/utils/imageUploadByFetch";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuUploadCloud } from "react-icons/lu";
import { toast } from "sonner";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Required"),
  age: Yup.number().required("Required").positive().integer(),
  gender: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  location: Yup.string(),
});

const EditPatient = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [updateProfile, { isSuccess }] = useUpdateProfileMutation();
  const [userPic, setUserPic] = useState<string | undefined>();

  const initialValues = {
    name: user?.name || "",
    age: user?.age || 0,
    gender: user?.gender || "",
    phone: user?.phone || "",
    email: user?.email || "",
    location: user?.location || "",
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const toastid = toast.loading("Please wait updating your image...");
    console.log("imaa", file);

    try {
      if (file) {
        const imageUrl = await uploadImage(file, user.picture || "");
        setUserPic(imageUrl?.url as string);
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      toast.dismiss(toastid);
    }
  };

  const handleSubmit = async (values: any) => {

    try {
      console.log("form update", { ...values, picture: userPic });
      
      dispatch(setUser({ ...values, picture: userPic }));
      await updateProfile({ ...values, picture: userPic });
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };

  if (isSuccess) {
    toast.success("Profile updated successfully");
    router.push("/profile");
  }

  // console.log("link", userPic);
  

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 w-full md:w-[600px]">
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-primaryTxt md:text-2xl">
            Edit Profile
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4 space-y-4 lg:mt-5 md:space-y-5">
                <div>
                  <label htmlFor="profile">
                    <input
                      id="profile"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <div className="relative group overflow-hidden rounded-md">
                      {user ? (
                        <img
                          src={user?.picture || userPic || "/images/profileicon.png"}
                          alt="profile pic"
                          className="w-full h-[250px] rounded-md object-cover border border-primary inline-block"
                        />
                      ) : (
                        <div className="w-full h-[250px] rounded-md border border-primary center bg-gray-300 font-bold">
                          Upload image
                        </div>
                      )}

                      <div className="bg-black/25 absolute inset-0 z-10 scale-150 group-hover:scale-100 opacity-0 group-hover:opacity-100 duration-150 flex items-center justify-center cursor-pointer">
                        <LuUploadCloud className="text-white text-2xl" />
                      </div>
                    </div>
                  </label>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 mt-2"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Age
                  </label>
                  <Field
                    type="number"
                    name="age"
                    id="age"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="age"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gender"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Gender
                  </label>
                  <Field
                    as="select"
                    name="gender"
                    id="gender"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Phone
                  </label>
                  <Field
                    type="text"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Address
                  </label>
                  <Field
                    type="text"
                    name="location"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>

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

export default EditPatient;
