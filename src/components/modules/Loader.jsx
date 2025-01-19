import React from "react";
import { HashLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <HashLoader size={50} color="#4A90E2" />
    </div>
  );
};

export default Loader;
