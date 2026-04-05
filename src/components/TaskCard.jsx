import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge.jsx";
import PriorityBadge from "./PriorityBadge.jsx";

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

function TaskCard({ task, onDelete, onComplete }) {
  return (
    <article className="card p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-brand-dark">
                {task.title}
              </h3>
              <StatusBadge completed={task.completed} />
              <PriorityBadge priority={task.priority} />
            </div>
            <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          </div>
        </div>

        <div className="grid gap-3 rounded-2xl bg-slate-50 p-4 text-sm text-brand-muted md:grid-cols-3">
          <p>
            <span className="font-semibold text-brand-dark">Categoría:</span>{" "}
            {task.category}
          </p>
          <p>
            <span className="font-semibold text-brand-dark">Creada:</span>{" "}
            {formatDate(task.createdAt)}
          </p>
          <p>
            <span className="font-semibold text-brand-dark">Código:</span> #
            {task.id}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to={`/edit/${task.id}`} className="button-secondary">
            Editar
          </Link>

          {!task.completed ? (
            <button
              type="button"
              onClick={() => onComplete(task)}
              className="button-primary"
            >
              Marcar como completada
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => onDelete(task)}
            className="button-danger"
          >
            Eliminar
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
