import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { deleteTask, updateTask } from "../app.js";
import PageHeader from "../components/PageHeader.jsx";
import SearchBar from "../components/SearchBar.jsx";
import SortControls from "../components/SortControls.jsx";
import TaskCard from "../components/TaskCard.jsx";
import EmptyState from "../components/EmptyState.jsx";
import LoadingState from "../components/LoadingState.jsx";
import { useTasks } from "../context/TaskContext.jsx";

const sortTasks = (items, sortBy) => {
  const tasksToSort = [...items];

  switch (sortBy) {
    case "oldest":
      return tasksToSort.sort(
        (firstTask, secondTask) =>
          new Date(firstTask.createdAt) - new Date(secondTask.createdAt)
      );
    case "az":
      return tasksToSort.sort((firstTask, secondTask) =>
        firstTask.title.localeCompare(secondTask.title, "es", {
          sensitivity: "base"
        })
      );
    case "za":
      return tasksToSort.sort((firstTask, secondTask) =>
        secondTask.title.localeCompare(firstTask.title, "es", {
          sensitivity: "base"
        })
      );
    case "newest":
    default:
      return tasksToSort.sort(
        (firstTask, secondTask) =>
          new Date(secondTask.createdAt) - new Date(firstTask.createdAt)
      );
  }
};

function TaskListPage({ mode = "pending" }) {
  const isCompletedView = mode === "completed";
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const { tasks, loading, tasksLoading, error, refreshTasks } = useTasks();

  const filteredTasks = useMemo(() => {
    const tasksByStatus = tasks.filter(
      (task) => task.completed === isCompletedView
    );

    const searchedTasks = tasksByStatus.filter((task) =>
      task.title.toLowerCase().includes(search.trim().toLowerCase())
    );

    return sortTasks(searchedTasks, sortBy);
  }, [tasks, isCompletedView, search, sortBy]);

  const handleDelete = async (task) => {
    const result = await Swal.fire({
      title: "¿Eliminar tarea?",
      text: `La tarea "${task.title}" se eliminará de forma permanente.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2B2B2B"
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await deleteTask(task.id);
      toast.success(response.message || "Tarea eliminada correctamente");
      await refreshTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleComplete = async (task) => {
    const result = await Swal.fire({
      title: "¿Marcar como completada?",
      text: `La tarea "${task.title}" pasará a la vista de completadas.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, completar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1561F0",
      cancelButtonColor: "#2B2B2B"
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      const response = await updateTask(task.id, {
        title: task.title,
        description: task.description,
        priority: task.priority,
        categoryId: task.categoryId,
        completed: true
      });

      toast.success(response.message || "Tarea completada correctamente");
      await refreshTasks();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const title = isCompletedView ? "Tareas completadas" : "Tareas pendientes";
  const description = isCompletedView
    ? "Consulta las tareas finalizadas, busca por título y ordénalas por fecha o alfabéticamente."
    : "Administra las tareas activas, complétalas cuando sea necesario y mantén el seguimiento del trabajo pendiente.";

  if (loading) {
    return <LoadingState message="Cargando tareas..." />;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={title}
        description={description}
        action={
          <Link to="/new" className="button-primary">
            Crear tarea
          </Link>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1fr,260px]">
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Busca por el título de la tarea"
        />
        <SortControls value={sortBy} onChange={setSortBy} />
      </div>

      {error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {tasksLoading ? (
        <div className="rounded-3xl border border-blue-200 bg-blue-50 p-4 text-sm text-brand-blue">
          Actualizando lista de tareas...
        </div>
      ) : null}

      {filteredTasks.length === 0 ? (
        <EmptyState
          title={
            isCompletedView
              ? "No hay tareas completadas"
              : "No hay tareas pendientes"
          }
          description={
            search
              ? "No se encontraron tareas que coincidan con la búsqueda actual."
              : isCompletedView
              ? "Cuando completes tareas, aparecerán listadas aquí."
              : "Crea una nueva tarea para comenzar a organizar tu trabajo."
          }
          action={
            !isCompletedView ? (
              <Link to="/new" className="button-primary">
                Crear tarea
              </Link>
            ) : null
          }
        />
      ) : (
        <div className="grid gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={handleDelete}
              onComplete={handleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskListPage;
