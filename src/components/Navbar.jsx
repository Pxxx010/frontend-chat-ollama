import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className="bg-zinc-950 text-white px-6 py-4 shadow flex justify-between items-center w-full">
      <h1 className="text-xl font-bold">Meu Assistente IA</h1>
      <div className="space-x-4">
        <Link
          to="/"
          className={`hover:underline ${
            pathname === "/" ? "text-cyan-400 font-semibold" : "text-zinc-300"
          }`}
        >
          Chat
        </Link>
        <Link
          to="/agentes"
          className={`hover:underline ${
            pathname === "/agentes" ? "text-cyan-400 font-semibold" : "text-zinc-300"
          }`}
        >
          Agentes
        </Link>
      </div>
    </nav>
  );
}
