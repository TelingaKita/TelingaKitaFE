// File: src/pages/Sidebar.jsx
import React from "react";
import { FaCamera, FaBook, FaUserCircle } from "react-icons/fa";

const Sidebar = ({ selected, setSelected }) => {
  const menuItems = [
    { label: "Deteksi Huruf", icon: <FaCamera /> },
    { label: "Tentang BISINDO", icon: <FaBook /> },
    { label: "Tentang Pengembang", icon: <FaUserCircle /> },
  ];

  return (
    <aside className="w-64 bg-yellow-400 text-black shadow-lg flex flex-col py-6 px-4 rounded-tr-2xl rounded-br-2xl">
      <div className="text-center mb-6">
        <img src="/TelingaKita.PNG" alt="Logo" className="w-20 mx-auto rounded-lg" />
        <h2 className="text-xl font-bold mt-2">TelingaKita</h2>
      </div>
      <nav className="flex flex-col gap-4">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => setSelected(item.label)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-all font-medium hover:bg-yellow-300
              ${selected === item.label ? "bg-white text-black shadow" : "bg-yellow-400"}`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
