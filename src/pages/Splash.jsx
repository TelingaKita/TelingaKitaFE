import React from "react";
import logo from "../TelingaKita.png"; // Pastikan path benar

const Splash = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0a1f44]">
      <img
        src={logo}
        alt="TelingaKita Logo"
        className="w-64 h-auto mb-6 object-contain"
      />
    </div>
  );
};

export default Splash;
