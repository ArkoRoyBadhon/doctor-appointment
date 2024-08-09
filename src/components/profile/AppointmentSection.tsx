"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../shared/Loader";
import ReviewModal from "./ReviewModal";
import { useGetAppointmentByPatientQuery, useUpdateAppointmentByIdMutation } from "@/redux/features/appointment/apoointmentApi";
import { useCreateReviewMutation } from "@/redux/features/reviews/reviewApi";
import { toast } from "sonner";

interface Appointment {
  _id: string;
  doctor: any;
  patient: any;
  date: string;
  time: string;
  status: string;
}

const AppointmentsSection: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("scheduled");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  const router = useRouter();

  const { data: appointmentData, isSuccess, isLoading } = useGetAppointmentByPatientQuery({
    page,
    limit,
    filter
  });
  const [updateAppointmentById, {isSuccess:isSuccessAppointment, error:errorAppointment}] = useUpdateAppointmentByIdMutation();
  const [createReview, {isSuccess:isSuccessReview, error:errorReview}] = useCreateReviewMutation();


  if(isSuccessAppointment || isSuccessReview) {
    toast.success("Operation Done Successfully!", {id: "operation-ok"})
  }
  if(errorAppointment || errorReview) {
    toast.error("Operation failed!",{id: "operation-error"})
  }

  useEffect(() => {
    if (isSuccess && appointmentData) {
      setAppointments(appointmentData.appointments);
    }
  }, [appointmentData, isSuccess]);

  const handleAppointmentClick = (appointmentId: string) => {
    router.push(`/appointment/${appointmentId}`);
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    const result = appointments.map((appointment: any) =>
      appointment._id === appointmentId
        ? { ...appointment, status: "canceled" }
        : appointment
    );
    setAppointments(result);
    await updateAppointmentById({ id: appointmentId, status: "canceled" });
  };

  const handleReviewClick = (doctorName: string, appointmentId: string) => {
    setSelectedDoctor(doctorName);
    setSelectedAppointmentId(appointmentId);
    setIsModalOpen(true);
  };

  const handleReviewSubmit = async ({ rating, comment }: { rating: number; comment: string }) => {
    await createReview({ appointment: selectedAppointmentId, rating, comment });
    setIsModalOpen(false);
  };

  const filteredAppointments = appointments.filter(
    (appointment: any) => appointment.status === filter
  );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) {
    return (
      <div className="center w-full pt-[40px]">
        <Loader />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <>
        <ReviewModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleReviewSubmit}
          doctorName={selectedDoctor}
        />
        <div className="bg-white shadow-md rounded-lg border h-[400px] overflow-auto relative">
          <div className="flex justify-between items-center mb-4 bg-primaryBg py-[10px] px-[10px] rounded-md sticky top-0 z-30">
            <h3 className="text-xl font-semibold text-white">My Appointments</h3>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
          {filteredAppointments.length > 0 ? (
            <ul className="z-0 px-[20px] pb-[20px]">
              {filteredAppointments.map((appointment: any) => (
                <li
                  key={appointment._id}
                  className="mb-4 flex justify-between items-center border-b-2"
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => handleAppointmentClick(appointment._id)}
                  >
                    <p className="text-gray-800 font-medium">
                      {new Date(appointment.date).toLocaleDateString()} at{" "}
                      {appointment.startTime}
                    </p>
                    <p className="text-gray-600">
                      <b>Doctor:</b> {appointment.doctor.name}
                    </p>
                  </div>
                  {filter === "scheduled" && (
                    <button
                      onClick={() => handleCancelAppointment(appointment._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    >
                      Cancel
                    </button>
                  )}
                  {filter === "completed" && (
                    <button
                      onClick={() => handleReviewClick(appointment.doctor.name, appointment._id)}
                      className="bg-primaryBg text-white px-4 py-2 rounded-md hover:bg-primaryBgHover transition duration-300"
                    >
                      Review
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-borderDark px-[20px]">You have no {filter} appointments.</p>
          )}
          <div className="flex justify-between px-4 py-2">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="bg-gray-300 text-gray-600 py-2 px-4 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNextPage}
              disabled={filteredAppointments.length < limit}
              className="bg-primaryBg text-white py-2 px-4 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </>
    );
  }

  return null;
};

export default AppointmentsSection;
