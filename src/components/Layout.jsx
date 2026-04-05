import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import config from "../config.js";

function Layout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="container-app py-8">
        <section className="mb-8 overflow-hidden rounded-[2rem] bg-brand-dark px-6 py-8 text-white shadow-soft sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-200">
            Gestor académico de tareas
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            {config.projectName}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
            {config.subtitle}
          </p>
        </section>

        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
