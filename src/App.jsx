import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { TaskProvider } from "./context/TaskContext.jsx";
import Layout from "./components/Layout.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PendingTasksPage from "./pages/PendingTasksPage.jsx";
import CompletedTasksPage from "./pages/CompletedTasksPage.jsx";
import TaskFormPage from "./pages/TaskFormPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <TaskProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<DashboardPage />} />
            <Route path="pending" element={<PendingTasksPage />} />
            <Route path="completed" element={<CompletedTasksPage />} />
            <Route path="new" element={<TaskFormPage mode="create" />} />
            <Route path="edit/:id" element={<TaskFormPage mode="edit" />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          theme="light"
        />
      </TaskProvider>
    </BrowserRouter>
  );
}

export default App;
