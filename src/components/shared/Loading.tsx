import Image from "next/image";
import React from "react";
import Loader from "./Loader";

const Loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader />
    </div>
  );
};

export default Loading;
