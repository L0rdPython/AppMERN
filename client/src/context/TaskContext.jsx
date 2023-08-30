/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../api/task.js";

export const TaskContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error(
      "TaskContext requires a context object to be provided in the constructor function "
    );
  }

  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{ createTask, getTasks, tasks }}>
      {children}
    </TaskContext.Provider>
  );
}
