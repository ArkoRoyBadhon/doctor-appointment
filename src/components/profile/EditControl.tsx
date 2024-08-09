"use client";
import React from "react";
import EditUser from "./EditUser";
import { useAppSelector } from "@/redux/hook";
import EditDoctor from "./EditDoctor";
import { useRouter } from "next/navigation";

const EditControl = () => {
  const { role } = useAppSelector((state) => state.user);
  const router = useRouter()

  if(!role) {
    router.push("/login")
  }

  return (
    <div className="my-[80px]">
      {role === "patient" && <EditUser />}
      {role === "doctor" && <EditDoctor />}
    </div>
  );
};

export default EditControl;
