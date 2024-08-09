"use client";

import { useAppSelector } from "@/redux/hook";
import { useRouter } from "next/navigation";

const AuthPrivate = ({ children }: { children: React.ReactNode }) => {
  const { email, } = useAppSelector((state) => state.user);
  const router = useRouter();
  if (!email) {
    router.push("/");
    return <></>;
  }

  return children;
};

export default AuthPrivate;
