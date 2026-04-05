import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import StatCard from "../components/StatCard.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useTasks } from "../context/TaskContext.jsx";

const formatDate = (value) => {
  try {
    return new Intl.DateTimeFormat("es-CO", {
      dateStyle: "medium",
      timeStyle: "short"
    }).format(new Date(value));
  } catch (error) {
    return value;
  }
};

function DashboardPage() {
  const { tasks, categories, stats, loading, error, refreshAll } = useTasks();

  const latestTasks = [...tasks]
    .sort((firstTask, secondTask) => {
      return new Date(secondTask.createdAt) - new Date(firstTask.createdAt);
    })
    .slice(0, 4);

  const prioritySummary = {
    high: tasks.filter((task) => task.priority === "high").length,
    medium: tasks.filter((task) => task.priority === "medium").length,
    low: tasks.filter((task) => task.priority === "low").length
  };

  if (loading) {
    return <LoadingState message="Cargando dashboard..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Revisa el estado actual de tus tareas, las prioridades más usadas y accede rápido a cada vista de trabajo."
        action={
          <Link to="/new" className="button-primary">
            Crear nueva tarea
          </Link>
        }
      />

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>{error}</p>
            <button type="button" onClick={refreshAll} className="button-secondary">
              Reintentar carga
            </button>
          </div>
        </div>
      ) : null}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total de tareas"
          value={stats.total}
          description="Cantidad total registrada actualmente en el sistema."
        />
        <StatCard
          title="Pendientes"
          value={stats.pending}
          description="Tareas que aún requieren trabajo o seguimiento."
        />
        <StatCard
          title="Completadas"
          value={stats.completed}
          description="Tareas finalizadas y disponibles para consulta."
        />
        <StatCard
          title="Categorías"
          value={categories.length}
          description="Opciones disponibles para clasificar cada tarea."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.4fr,0.8fr]">
        <div className="card p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-xl font-semibold text-brand-dark">
                Últimas tareas creadas
              </h3>
              <p className="mt-1 text-sm text-brand-muted">
                Vista rápida de los registros más recientes.
              </p>
            </div>
            <Link to="/pending" className="text-sm font-semibold text-brand-blue">
              Ver pendientes
            </Link>
          </div>

          {latestTasks.length === 0 ? (
            <div className="pt-6">
              <EmptyState
                title="Aún no has creado tareas"
                description="Empieza registrando tu primera tarea para ver estadísticas y seguimiento desde el dashboard."
                action={
                  <Link to="/new" className="button-primary">
                    Crear primera tarea
                  </Link>
                }
              />
            </div>
          ) : (
            <div className="mt-6 grid gap-4">
              {latestTasks.map((task) => (
                <article
                  key={task.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h4 className="text-base font-semibold text-brand-dark">
                        {task.title}
                      </h4>
                      <p className="mt-1 text-sm text-brand-muted">
                        {task.category} · {task.completed ? "Completada" : "Pendiente"}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-brand-muted">
                      {formatDate(task.createdAt)}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        <div className="grid gap-6">


          <section className="card p-6">
            <h3 className="text-xl font-semibold text-brand-dark">
              Resumen por prioridad
            </h3>
            <div className="mt-5 grid gap-3">
              <div className="rounded-2xl bg-red-50 p-4">
                <p className="text-sm font-medium text-red-700">Alta</p>
                <p className="mt-2 text-3xl font-semibold text-red-700">
                  {prioritySummary.high}
                </p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-4">
                <p className="text-sm font-medium text-blue-700">Media</p>
                <p className="mt-2 text-3xl font-semibold text-blue-700">
                  {prioritySummary.medium}
                </p>
              </div>
              <div className="rounded-2xl bg-slate-100 p-4">
                <p className="text-sm font-medium text-slate-700">Baja</p>
                <p className="mt-2 text-3xl font-semibold text-slate-700">
                  {prioritySummary.low}
                </p>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
