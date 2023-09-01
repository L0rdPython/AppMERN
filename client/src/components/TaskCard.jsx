import { format, register } from "timeago.js";
import es from "timeago.js/lib/lang/es"; // Importa el archivo de locales en español
import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

register("es", es); // Registra el locale en español

const TaskCard = ({ task }) => {
  const { deleteTask } = useTasks();
  return (
    <div className="bg-zinc-300 rounded-sm py-2 px-2">
      <header className="flex justify-between">
        <h1 className="h4">{task.title}</h1>
        <div className="flex gap-x-1 items-center px-2">
          <button
            className="bg-red-500 px-1 py-1 rounded-md text-white"
            onClick={() => deleteTask(task._id)}
          >
            delete
          </button>
          <Link
            to={`/tasks/${task._id}`}
            className="bg-blue-500 px-1 py-1 rounded-md text-white hover:no-underline"
          >
            edit
          </Link>
        </div>
      </header>
      <p>{task.description}</p>
      <p>{format(new Date(task.date), "es")}</p>
      {/* Utiliza el locale en español */}
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
};

export default TaskCard;
