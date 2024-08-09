"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import AppointmentsSection from "./AppointmentSection";
import MedicalHistory from "./MedicalHistory";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Cookies from "js-cookie";
import { initialState, setUser } from "@/redux/features/user/userSlice";
import Link from "next/link";
import AppointmentsSectionDoctor from "./AppointmentSectionDoctor";
import EditSpecializationAvailability from "./EditAvailability";

const ProfileBody: React.FC = () => {
  const [hover, setHover] = useState<boolean>(false);
  const { email, name, phone, picture, location, age, role, fee, about } =
    useAppSelector((state: any) => state.user);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleEditClick = () => {
    router.push("/profile/edit");
  };

  const handleLogOut = () => {
    Cookies.remove("accessToken");
    setToken(null);
    dispatch(setUser(initialState));
  };

  useEffect(() => {
    const tokenCookie = Cookies.get("accessToken");
    setToken(tokenCookie || null);
    if (!tokenCookie) {
      router.push("/login");
    }
  }, [email]);

  return (
    <div className="container mx-auto px-6 lg:px-20 py-10">
      <div
        className="bg-white shadow-md rounded-lg p-6 mb-10 border relative"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="flex items-center">
          <Image
            src={picture || "/images/profileicon.png"}
            alt="User Profile"
            width={100}
            height={100}
            className="rounded-md w-[200px] h-[130px]"
          />
          <div className="ml-6">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <p className="text-gray-600">
              <strong>Email:</strong> {email}
            </p>
            <p className="text-gray-600">
              <strong>Phone:</strong> {phone}
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> {location}
            </p>
            {role === "patient" && (
              <p className="text-gray-600">
                <strong>Age:</strong> {age}
              </p>
            )}
            {role === "doctor" && (
              <>
                <p className="text-gray-600">
                  <strong>About:</strong> {about}
                </p>
                <p className="text-gray-600">
                  <strong>fee:</strong> {fee}
                </p>
              </>
            )}
            {token ? (
              <button
                onClick={() => handleLogOut()}
                className="relative flex justify-center items-center gap-[5px] border rounded-md px-[12px] py-[6px] w-fit bg-borderColor hover:bg-borderDark hover:text-white transition-all ease-in font-semibold mt-[10px]"
              >
                Log Out
              </button>
            ) : (
              <Link
                href="/login"
                className="font-semibold text-[16px] md:hidden text-center py-[10px] w-full bg-borderColor hover:bg-borderDark hover:text-white transition-all ease-in"
              >
                SignIn
              </Link>
            )}

            {hover && (
              <div
                className="absolute top-6 right-6 cursor-pointer"
                onClick={handleEditClick}
              >
                <FaEdit
                  size={24}
                  className="text-gray-600 hover:text-gray-800 transition duration-300"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {role === "patient" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AppointmentsSection />
          <MedicalHistory />
        </div>
      )}
      {role === "doctor" && (
        <>
          <Link className="" href="/profile/main/edit">
            <div className="border shadow-md mb-[40px] px-[20px] py-[20px] rounded-md flex justify-between">
              <p className="font-medium">
                Update Specialization and Availability
              </p>
              <FaEdit />
            </div>
          </Link>
          <AppointmentsSectionDoctor />
        </>
      )}
    </div>
  );
};

export default ProfileBody;
