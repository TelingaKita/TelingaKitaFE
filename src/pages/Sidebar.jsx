import React, { useState } from "react";
import { FaCamera, FaBook, FaUserCircle, FaBars } from "react-icons/fa";

const menuItems = [
  { label: "Deteksi Huruf", icon: <FaCamera /> },
  { label: "Tentang BISINDO", icon: <FaBook /> },
  { label: "Tentang Pengembang", icon: <FaUserCircle /> },
];

const Sidebar = ({ selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Navbar */}
      <header className="bg-[#FCD953] shadow-md px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-bold text-black">TelingaKita</div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setSelected(item.label)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                selected === item.label
                  ? "bg-yellow-400 font-semibold"
                  : "hover:bg-yellow-300"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Mobile Burger */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaBars />
        </button>
      </header>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#FCD953] shadow-md px-4 py-2 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setSelected(item.label);
                setIsOpen(false);
              }}
              className={`flex items-center space-x-2 w-full text-left px-4 py-2 rounded-md transition-colors ${
                selected === item.label
                  ? "bg-yellow-400 font-semibold"
                  : "hover:bg-yellow-300"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Sidebar;
