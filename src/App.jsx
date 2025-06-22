// File: src/App.jsx
import React, { useState, useEffect } from "react";
import Sidebar from "./pages/Sidebar";
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
    <div className="flex min-h-screen">
      <Sidebar selected={selected} setSelected={setSelected} />
      <main className="flex-1 bg-gray-900 text-white overflow-y-auto p-6">
        {selected === "Deteksi Huruf" && <Detection />}
        {selected === "Tentang BISINDO" && <TentangBISINDO />}
        {selected === "Tentang Pengembang" && <TentangPengembang />}
      </main>
    </div>
  );
};

export default App;
