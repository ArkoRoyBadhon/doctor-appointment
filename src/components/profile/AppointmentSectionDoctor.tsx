"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loader from "../shared/Loader";
import { useGetAppointmentByDoctorQuery, useUpdateAppointmentByIdMutation } from "@/redux/features/appointment/apoointmentApi";
import { toast } from "sonner";

interface Appointment {
  _id: string;
  doctor: any;
  patient: any;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

const AppointmentsSectionDoctor: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filter, setFilter] = useState("scheduled");
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const router = useRouter();

  const { data: appointmentData, isSuccess, isLoading, error } = useGetAppointmentByDoctorQuery({ page, limit, filter });
  const [updateAppointmentById, {isSuccess:isSuccessAppointment, error:errorAppointment}] = useUpdateAppointmentByIdMutation();

  useEffect(() => {
    if (appointmentData && appointmentData.appointments) {
      setAppointments(appointmentData.appointments);
    }
  }, [appointmentData]);

  const handleAppointmentClick = (appointmentId: string) => {
    router.push(`/appointment/${appointmentId}`);
  };

  const handleUpdateAppointmentStatus = async (appointmentId: string, status: string) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment._id === appointmentId ? { ...appointment, status } : appointment
    );
    setAppointments(updatedAppointments);

    await updateAppointmentById({ id: appointmentId, status });
  };

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === filter
  );

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  if (isLoading) {
    return <div className="center w-full pt-[40px]"><Loader /></div>;
  }

  if (error) {
    console.error("Error fetching appointments:", error);
    return <div>Error loading appointments</div>;
  }

  if(isSuccessAppointment) {
    toast.success("Operation Done Successfully!",{id: "operation-done"})
  }
  if(errorAppointment) {
    toast.error("Operation failed!",{id: "operation-failed"})
  }


  if (isSuccess) {
    return (
      <div className="shadow-md rounded-lg p-6 border h-[400px] overflow-auto">
        <div className="flex justify-between items-center mb-4 bg-primaryBg px-[10px] rounded-md py-[12px]">
          <h3 className="text-xl font-semibold text-white  ">My Appointments</h3>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
        <ul>
          {filteredAppointments.length > 0 ? filteredAppointments.map((appointment) => (
            <li
              key={appointment._id}
              className="mb-4 flex justify-between items-center border-b-2"
            >
              <div
                className="cursor-pointer"
                onClick={() => handleAppointmentClick(appointment._id)}
              >
                <p className="text-gray-800 font-medium">
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit'
                  }).format(new Date(appointment.date))} at {appointment.startTime} - {appointment.endTime}
                </p>
                <p className="text-gray-600">
                  <b>Patient:</b> {appointment?.patient?.name}
                </p>
              </div>
              {filter === "scheduled" && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleUpdateAppointmentStatus(appointment?._id, "completed")}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
                  >
                    Complete
                  </button>
                </div>
              )}
            </li>
          ))
        :

        <div className="">
          <p className="text-borderDark px-[20px] pt-[20px] h-[200px]">No Apoointment Available</p>
        </div>
        }
        </ul>
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
    );
  }

  return <p className="text-gray-600">You have no {filter} appointments.</p>;
};

export default AppointmentsSectionDoctor;
