"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

interface EnquiryFormValues {
  name: string;
  email: string;
  contactNumber: string;
  preferredContactMethod: string;
  country: string;
  message: string;
  howDidYouHear: string;
}

const ContactUsPage: React.FC = () => {
  const initialValues: EnquiryFormValues = {
    name: "",
    email: "",
    contactNumber: "",
    preferredContactMethod: "",
    country: "",
    message: "",
    howDidYouHear: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    contactNumber: Yup.string().required("Contact number is required"),
    preferredContactMethod: Yup.string().required(
      "Please select a preferred contact method"
    ),
    country: Yup.string().required("Country is required"),
    message: Yup.string().required("Message is required"),
    howDidYouHear: Yup.string().required(
      "Please let us know how you heard about us"
    ),
  });

  const handleSubmit = (values: EnquiryFormValues, { resetForm }: any) => {
    console.log("Form data", values);
    toast.success("Form submitted successfully!");
    resetForm();
  };

  return (
    <main className="center w-full px-[10px] md:px-[0px] mx-auto py-[60px]">
      <div className="border px-[20px] py-[20px] rounded-md w-full md:w-[600px] shadow-md">
        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="max-w-lg mx-auto flex flex-col gap-5 p-4 lg:py-10 lg:px-0">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="label-style">
                  Name
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="field-style"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="label-style">
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="field-style"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contactNumber" className="label-style">
                  Contact Number
                </label>
                <Field
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  className="field-style"
                />
                <ErrorMessage
                  name="contactNumber"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="preferredContactMethod" className="label-style">
                  Preferred Contact Method
                </label>
                <Field
                  as="select"
                  id="preferredContactMethod"
                  name="preferredContactMethod"
                  className="field-style"
                >
                  <option value="" label="Select contact method" />
                  <option value="email" label="Email" />
                  <option value="phone" label="Phone" />
                </Field>
                <ErrorMessage
                  name="preferredContactMethod"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="country" className="label-style">
                  Country
                </label>
                <Field
                  type="text"
                  id="country"
                  name="country"
                  className="field-style"
                />
                <ErrorMessage
                  name="country"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="label-style">
                  Message
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  className="field-style py-2"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="howDidYouHear" className="label-style">
                  How did you hear about us?
                </label>
                <Field
                  type="text"
                  id="howDidYouHear"
                  name="howDidYouHear"
                  className="field-style"
                />
                <ErrorMessage
                  name="howDidYouHear"
                  component="div"
                  className="error-message"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-btn cursor-pointer bg-primaryBg hover:bg-primaryBgHover"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};

export default ContactUsPage;
