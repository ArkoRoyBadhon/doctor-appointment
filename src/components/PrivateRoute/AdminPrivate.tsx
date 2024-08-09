"use client";

import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

const AdminPrivate = ({ children }: { children: React.ReactNode }) => {
  const { email, role } = useAppSelector((state) => state.user);
  const router = useRouter();
  if (!email) {
    router.push("/");
    return <></>;
  }


  if (role !== "admin") {
    router.push("/");
    return <></>;
  }

  return children;
};

export default AdminPrivate;
