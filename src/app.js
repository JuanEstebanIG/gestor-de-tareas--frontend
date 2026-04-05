import config from "./config.js";

const buildRequestOptions = (options = {}) => {
  const headers = {
    Accept: "application/json",
    ...(options.headers || {})
  };

  if (options.body) {
    headers["Content-Type"] = "application/json";
  }

  return {
    ...options,
    headers
  };
};

const request = async (endpoint, options = {}) => {
  let response;

  try {
    response = await fetch(
      `${config.apiBaseUrl}${endpoint}`,
      buildRequestOptions(options)
    );
  } catch (error) {
    throw new Error("No fue posible conectar con el servidor");
  }

  let responseData = {};

  try {
    responseData = await response.json();
  } catch (error) {
    responseData = {};
  }

  if (!response.ok) {
    throw new Error(
      responseData.message || "Ocurrió un error al procesar la solicitud"
    );
  }

  return responseData;
};

export const getTasks = async () => {
  const response = await request("/tasks");
  return response.data;
};

export const getTaskById = async (id) => {
  const response = await request(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (payload) => {
  return request("/tasks", {
    method: "POST",
    body: JSON.stringify(payload)
  });
};

export const updateTask = async (id, payload) => {
  return request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
};

export const deleteTask = async (id) => {
  return request(`/tasks/${id}`, {
    method: "DELETE"
  });
};

export const getCategories = async () => {
  const response = await request("/categories");
  return response.data;
};
