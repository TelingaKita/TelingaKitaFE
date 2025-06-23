import React, { useState, useEffect } from "react";
import Sidebar from "./pages/Sidebar"; // Ini adalah navbar atas sekarang
import Detection from "./pages/Detection";
import TentangBISINDO from "./pages/TentangBISINDO";
import TentangPengembang from "./pages/TentangPengembang";
import Splash from "./pages/Splash";

const App = () => {
  const [selected, setSelected] = useState("Deteksi Huruf");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <Splash />;

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar atas */}
      <Sidebar selected={selected} setSelected={setSelected} />

      {/* Konten berdasarkan menu */}
      <main className="p-6 text-black">
        {selected === "Deteksi Huruf" && <Detection />}
        {selected === "Tentang BISINDO" && <TentangBISINDO />}
        {selected === "Tentang Pengembang" && <TentangPengembang />}
      </main>
    </div>
  );
};

export default App;
