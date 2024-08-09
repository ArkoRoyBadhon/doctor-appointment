// import { ErrorMessage } from 'formik';
// import React from 'react';

// const Available = () => {
//     return (
//         <section className="bg-gray-50">
//         <div className="flex flex-col items-center justify-center px-6 mx-auto py-[50px]">
//           <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-[550px] xl:p-0">
//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//               <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
//                 Doctor Availability
//               </h1>
//               <Formik
//                 initialValues={{
//                   day: "",
//                   startTime: "",
//                   endTime: "",
//                   maxPatient: 0,
//                 }}
//                 // validationSchema={/* Add your validation schema here */}
//                 onSubmit={(vales) => vales}
//               >
//                 {({ errors, touched }) => (
//                   <Form className="space-y-4 md:space-y-6">
//                     <div>
//                       <label
//                         htmlFor="day"
//                         className="block mb-2 text-sm font-medium text-gray-900"
//                       >
//                         Day
//                       </label>
//                       <Field
//                         type="text"
//                         name="day"
//                         id="day"
//                         className={`bg-gray-50 border ${
//                           errors.day && touched.day
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
//                         placeholder="Monday"
//                       />
//                       <ErrorMessage
//                         name="day"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="startTime"
//                         className="block mb-2 text-sm font-medium text-gray-900"
//                       >
//                         Start Time
//                       </label>
//                       <Field
//                         type="text"
//                         name="startTime"
//                         id="startTime"
//                         className={`bg-gray-50 border ${
//                           errors.startTime && touched.startTime
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
//                         placeholder="09:00 AM"
//                       />
//                       <ErrorMessage
//                         name="startTime"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="endTime"
//                         className="block mb-2 text-sm font-medium text-gray-900"
//                       >
//                         End Time
//                       </label>
//                       <Field
//                         type="text"
//                         name="endTime"
//                         id="endTime"
//                         className={`bg-gray-50 border ${
//                           errors.endTime && touched.endTime
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
//                         placeholder="05:00 PM"
//                       />
//                       <ErrorMessage
//                         name="endTime"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                     <div>
//                       <label
//                         htmlFor="maxPatient"
//                         className="block mb-2 text-sm font-medium text-gray-900"
//                       >
//                         Max Patients
//                       </label>
//                       <Field
//                         type="number"
//                         name="maxPatient"
//                         id="maxPatient"
//                         className={`bg-gray-50 border ${
//                           errors.maxPatient && touched.maxPatient
//                             ? "border-red-500"
//                             : "border-gray-300"
//                         } text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5`}
//                         placeholder="5"
//                       />
//                       <ErrorMessage
//                         name="maxPatient"
//                         component="div"
//                         className="text-red-500 text-sm mt-1"
//                       />
//                     </div>
//                     <button
//                       type="submit"
//                       className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//                     >
//                       Save Availability
//                     </button>
//                   </Form>
//                 )}
//               </Formik>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
// };

// export default Available;
