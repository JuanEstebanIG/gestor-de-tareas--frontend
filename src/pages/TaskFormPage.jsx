import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createTask, getTaskById, updateTask } from "../app.js";
import PageHeader from "../components/PageHeader.jsx";
import TaskForm from "../components/TaskForm.jsx";
import LoadingState from "../components/LoadingState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import { useTasks } from "../context/TaskContext.jsx";

function TaskFormPage({ mode = "create" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = mode === "edit";
  const { categories, loading, refreshTasks } = useTasks();

  const [initialValues, setInitialValues] = useState(null);
  const [pageLoading, setPageLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    if (!isEditing) {
      setInitialValues({
        title: "",
        description: "",
        priority: "medium",
        categoryId: ""
      });
      setPageLoading(false);
      return;
    }

    const loadTask = async () => {
      setPageLoading(true);
      setLoadError("");

      try {
        const task = await getTaskById(id);
        setInitialValues(task);
      } catch (error) {
        setLoadError(error.message);
        toast.error(error.message);
      } finally {
        setPageLoading(false);
      }
    };

    loadTask();
  }, [id, isEditing]);

  const pageTitle = useMemo(
    () => (isEditing ? "Editar tarea" : "Crear tarea"),
    [isEditing]
  );

  const pageDescription = isEditing
    ? "Actualiza el contenido, la prioridad y la categoría de la tarea seleccionada."
    : "Registra una nueva tarea con un formulario controlado y validado en frontend y backend.";

  const cancelTo = isEditing
    ? initialValues?.completed
      ? "/completed"
      : "/pending"
    : "/pending";

  const handleSubmit = async (values) => {
    setSubmitting(true);

    try {
      if (isEditing) {
        const response = await updateTask(id, {
          ...values,
          completed: Boolean(initialValues?.completed)
        });

        toast.success(response.message || "Tarea actualizada correctamente");
      } else {
        const response = await createTask({
          ...values,
          completed: false
        });

        toast.success(response.message || "Tarea creada correctamente");
      }

      await refreshTasks();
      navigate(isEditing && initialValues?.completed ? "/completed" : "/pending");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || pageLoading) {
    return <LoadingState message="Cargando formulario..." />;
  }

  if (loadError && isEditing) {
    return (
      <EmptyState
        title="No fue posible cargar la tarea"
        description={loadError}
      />
    );
  }

  if (!categories.length) {
    return (
      <EmptyState
        title="No hay categorías disponibles"
        description="Debes tener categorías registradas en la base de datos para crear o editar tareas."
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={pageTitle} description={pageDescription} />
      <TaskForm
        initialValues={initialValues}
        categories={categories}
        onSubmit={handleSubmit}
        isEditing={isEditing}
        submitting={submitting}
        cancelTo={cancelTo}
      />
    </div>
  );
}

export default TaskFormPage;
