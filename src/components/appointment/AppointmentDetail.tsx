
import { cookies } from "next/headers";
import Link from "next/link";

interface Doctor {
  _id: string;
  name: string;
}

interface Patient {
  _id: string;
  name: string;
}

interface Appointment {
  _id: string;
  doctor: Doctor;
  patient: Patient;
  description: string;
  date?: string;
  startTime: string;
  endTime: string;
  status: string;
}

const getAppointment = async (id: string) => {
  const cookieStore = cookies();
  const token = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/appointment/get/${id}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const result = await res.json();
  return result;
};

const AppointmentDetail = async ({ id }: { id: string }) => {
  const result = await getAppointment(id);
  const data: Appointment = result?.appointment;

  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700">
          Appointment Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">General Info</h3>
            <p className="text-gray-800 font-medium mb-2">
              <strong>Date:</strong> {data?.date ? new Date(data.date).toLocaleDateString() : "N/A"} at {data.startTime} - {data.endTime}
            </p>
            <p className="text-gray-800 font-medium mb-2">
              <strong>Status:</strong> <span className={`px-2 py-1 rounded-md ${data.status === "scheduled" ? "bg-yellow-200 text-yellow-800" : data.status === "completed" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{data.status}</span>
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Participants</h3>
            <p className="text-gray-800 font-medium mb-2">
              <strong>Doctor:</strong> {data.doctor?.name}
            </p>
            <p className="text-gray-800 font-medium mb-2">
              <strong>Patient:</strong> {data.patient?.name || "N/A"}
            </p>
          </div>
        </div>
        <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Description</h3>
          <p className="text-gray-800 font-medium mb-2">{data.description || "No description provided."}</p>
        </div>
        <div className="mt-6 text-center">
          <Link href="/profile">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
              Back to Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
