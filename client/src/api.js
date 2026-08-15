// One place that knows how to talk to our backend.
// Every page imports from here instead of writing fetch() calls everywhere.

const BASE_URL = "http://localhost:5000/api";

// Small wrapper around fetch() that adds the JWT token automatically
// (if the user is logged in) and throws a readable error on failure.
async function request(path, { method = "GET", body } = {}) {
  const token = localStorage.getItem("token");

  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// ----- Auth -----
export const signup = (name, email, password) =>
  request("/auth/signup", { method: "POST", body: { name, email, password } });

export const login = (email, password) =>
  request("/auth/login", { method: "POST", body: { email, password } });

// ----- Jobs -----
export const getJobs = () => request("/jobs");

export const createJob = (job) =>
  request("/jobs", { method: "POST", body: job });

export const updateJob = (id, job) =>
  request(`/jobs/${id}`, { method: "PUT", body: job });

export const deleteJob = (id) =>
  request(`/jobs/${id}`, { method: "DELETE" });
