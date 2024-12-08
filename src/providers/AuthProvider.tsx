"use client";

import Loading from "@/components/shared/Loading";
import { useGetAuthorQuery } from "@/redux/features/user/userApi";
import { setUser } from "@/redux/features/user/userSlice";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = Cookies.get("accessToken");
  const { data, isSuccess, isError, isLoading } = useGetAuthorQuery(
    token || ""
  );


  useEffect(() => {
    if (isSuccess && data && data.data) {
      dispatch(setUser({...data.data, role: data.role}));
    }

    if (isError) {
      Cookies.remove("accessToken");
      // router.push("/login");
    }
    
   
  }, [isSuccess, data, isError, dispatch]);

  // if (isLoading) {
  //   return <Loading />;
  // }
  
  return <>{children}</>;
};

export default AuthProvider;
