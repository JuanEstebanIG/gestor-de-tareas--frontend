import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { getCategories, getTasks } from "../app.js";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(false);
  const [error, setError] = useState("");

  const loadInitialData = async () => {
    setLoading(true);
    setError("");

    try {
      const [tasksData, categoriesData] = await Promise.all([
        getTasks(),
        getCategories()
      ]);

      setTasks(tasksData);
      setCategories(categoriesData);
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshTasks = async () => {
    setTasksLoading(true);
    setError("");

    try {
      const tasksData = await getTasks();
      setTasks(tasksData);
      return tasksData;
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
      throw error;
    } finally {
      setTasksLoading(false);
    }
  };

  const refreshAll = async () => {
    await loadInitialData();
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const stats = useMemo(() => {
    const pending = tasks.filter((task) => !task.completed).length;
    const completed = tasks.filter((task) => task.completed).length;

    return {
      total: tasks.length,
      pending,
      completed
    };
  }, [tasks]);

  const value = useMemo(
    () => ({
      tasks,
      categories,
      loading,
      tasksLoading,
      error,
      stats,
      refreshTasks,
      refreshAll
    }),
    [tasks, categories, loading, tasksLoading, error, stats]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error("useTasks debe usarse dentro de TaskProvider");
  }

  return context;
};
