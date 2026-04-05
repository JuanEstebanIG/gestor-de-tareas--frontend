import { NavLink } from "react-router-dom";
import config from "../config.js";

const navItems = [
  { to: "/", label: "Dashboard", end: true },
  { to: "/pending", label: "Pendientes" },
  { to: "/completed", label: "Completadas" },
  { to: "/new", label: "Nueva tarea" }
];

const getNavLinkClass = ({ isActive }) =>
  [
    "rounded-full px-4 py-2 text-sm font-medium transition",
    isActive
      ? "bg-brand-blue text-white"
      : "text-slate-700 hover:bg-slate-100 hover:text-brand-dark"
  ].join(" ");

function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container-app flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-muted">
            Proyecto Full Stack
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-brand-dark">
              {config.projectName}
            </h1>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-brand-muted">
              React + Node + MySQL
            </span>
          </div>
        </div>

        <nav className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={getNavLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
