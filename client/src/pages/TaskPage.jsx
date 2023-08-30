import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";

const TaskPage = () => {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {tasks.map((task, index) => (
        <div key={index}>
          <h4 className="h4">{task.title}</h4>
          <span>{task.description}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskPage;
