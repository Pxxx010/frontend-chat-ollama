import { FiGlobe, FiMoon, FiAirplay } from "react-icons/fi";
import { FaMagic } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    onLogout?.();
    navigate("/login");
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#1A103D] text-white px-6 py-3 flex justify-between items-center shadow w-full relative">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <FaMagic className="text-green-500 text-xl" />
        <span className="text-green-500 font-semibold text-lg">NeoAgent</span>
      </div>

      {/* Ícones à direita */}
      <div className="flex items-center gap-5 text-green-400 text-xl relative">
        <FiAirplay className="cursor-pointer hover:text-green-300" onClick={() => navigate('/')} />
        <FiGlobe className="cursor-pointer hover:text-green-300" onClick={() => navigate('/agentes')} />
        <FiMoon className="cursor-pointer hover:text-green-300" />

        {/* Avatar */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            A
          </div>

          {showDropdown && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg py-2 w-32 z-10">
              <button
                onClick={() => navigate('/perfil')}
                className="block w-full text-left px-4 py-2 hover:bg-zinc-100 text-sm"
              >
                Perfil
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-zinc-100 text-sm"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
