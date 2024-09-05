import axios from 'axios';

// Function to get the auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Fetch all tasks
export const fetchTasks = async () => {
  const headers = getAuthHeaders();
  const response = await axios.get("http://localhost:4001/task/getalltasks", { headers });
  return response.data.tasks || [];
};

// Fetch important tasks
export const fetchImportantTasks = async () => {
  const headers = getAuthHeaders();
  const response = await axios.get("http://localhost:4001/task/getimptasks", { headers });
    console.log(response.data.impTasks)

  return response.data.impTasks || [];
};

export const fetchCompletedTasks = async () => {
  const headers = getAuthHeaders();
  const response = await axios.get("http://localhost:4001/task/getcomptasks", { headers });
    console.log(response.data.completedTasks)

  return response.data.completedTasks || [];
};

export const fetchInCompletedTasks = async () => {
  try {
    const headers = getAuthHeaders(); // Ensure this function correctly returns authentication headers
    const response = await axios.get("http://localhost:4001/task/getincomptasks", { headers });

    // Log the complete response data for debugging
    console.log(response.data);

    // Access the tasks data based on your server response structure
    const incompTasks = response.data.incompTasks || []; // Make sure this matches the server response

    return incompTasks;
  } catch (error) {
    console.error('Error fetching incomplete tasks:', error);
    // Handle the error or rethrow it based on your application needs
    return [];
  }
};

// Update task completion status
export const updateTaskCompletion = async (taskId) => {
  const headers = getAuthHeaders();
  await axios.put(`http://localhost:4001/task/updatecomtask/${taskId}`, {}, { headers });
};

// Update task importance status
export const updateTaskImportance = async (taskId) => {
  const headers = getAuthHeaders();
  const res =await axios.put(`http://localhost:4001/task/updateImptask/${taskId}`, {}, { headers });
  console.log(res.data)
};

// Delete a task
export const deleteTask = async (taskId) => {
  const headers = getAuthHeaders();
  await axios.delete(`http://localhost:4001/task/deleteTask/${taskId}`, { headers });
};

// Create or update a task
export const saveTask = async (taskData, taskId = null) => {
  const headers = getAuthHeaders();
  let response;
  if (taskId) {
    response = await axios.put(`http://localhost:4001/task/updateTask/${taskId}`, taskData, { headers });
  } else {
    response = await axios.post("http://localhost:4001/task/createdtask", taskData, { headers });
  }
  return response;
};
