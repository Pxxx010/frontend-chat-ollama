import { FiGlobe, FiMoon } from "react-icons/fi";
import { FaRegUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { FaMagic } from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="bg-[#1A103D] text-white px-6 py-3 flex justify-between items-center shadow w-full">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <FaMagic className="text-green-500 text-xl" />
        <span className="text-green-500 font-semibold text-lg">NeoAgent</span>
      </div>

      {/* Ícones à direita */}
      <div className="flex items-center gap-5 text-green-400 text-xl">
        <FiGlobe className="cursor-pointer hover:text-green-300" />
        <FiMoon className="cursor-pointer hover:text-green-300" />
        <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
          T
        </div>
      </div>
    </nav>
  );
}
