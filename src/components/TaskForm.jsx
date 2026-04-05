import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const defaultValues = {
  title: "",
  description: "",
  priority: "medium",
  categoryId: ""
};

const validateValues = (values) => {
  const errors = {};

  const title = values.title.trim();
  const description = values.description.trim();

  if (!title) {
    errors.title = "El título es obligatorio";
  } else if (title.length < 3 || title.length > 100) {
    errors.title = "El título debe tener entre 3 y 100 caracteres";
  }

  if (!description) {
    errors.description = "La descripción es obligatoria";
  } else if (description.length < 5 || description.length > 500) {
    errors.description = "La descripción debe tener entre 5 y 500 caracteres";
  }

  if (!values.priority) {
    errors.priority = "La prioridad es obligatoria";
  }

  if (!values.categoryId) {
    errors.categoryId = "Debes seleccionar una categoría";
  }

  return errors;
};

function TaskForm({
  initialValues,
  categories,
  onSubmit,
  isEditing = false,
  submitting = false,
  cancelTo = "/pending"
}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setValues({
        title: initialValues.title || "",
        description: initialValues.description || "",
        priority: initialValues.priority || "medium",
        categoryId: initialValues.categoryId
          ? String(initialValues.categoryId)
          : ""
      });
    } else {
      setValues(defaultValues);
    }
  }, [initialValues]);

  const submitLabel = useMemo(
    () => (isEditing ? "Guardar cambios" : "Crear tarea"),
    [isEditing]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues((previousValues) => ({
      ...previousValues,
      [name]: value
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: ""
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateValues(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    await onSubmit({
      title: values.title.trim(),
      description: values.description.trim(),
      priority: values.priority,
      categoryId: Number(values.categoryId)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
      <div className="grid gap-6">
        <div>
          <label htmlFor="title" className="label">
            Título
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={values.title}
            onChange={handleChange}
            placeholder="Ejemplo: Preparar la sustentación"
            className="input-control"
          />
          {errors.title ? (
            <p className="error-text">{errors.title}</p>
          ) : (
            <p className="helper-text">
              Usa un título claro y concreto para identificar la tarea.
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="label">
            Descripción
          </label>
          <textarea
            id="description"
            name="description"
            rows="5"
            value={values.description}
            onChange={handleChange}
            placeholder="Describe lo que debes hacer y el contexto necesario."
            className="input-control resize-none"
          />
          {errors.description ? (
            <p className="error-text">{errors.description}</p>
          ) : (
            <p className="helper-text">
              Puedes incluir pasos, recordatorios o detalles de la entrega.
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="priority" className="label">
              Prioridad
            </label>
            <select
              id="priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
              className="input-control"
            >
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
            {errors.priority ? (
              <p className="error-text">{errors.priority}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="categoryId" className="label">
              Categoría
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={values.categoryId}
              onChange={handleChange}
              className="input-control"
            >
              <option value="">Selecciona una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId ? (
              <p className="error-text">{errors.categoryId}</p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button type="submit" className="button-primary" disabled={submitting}>
            {submitting ? "Guardando..." : submitLabel}
          </button>

          <Link to={cancelTo} className="button-secondary">
            Cancelar
          </Link>
        </div>
      </div>
    </form>
  );
}

export default TaskForm;
