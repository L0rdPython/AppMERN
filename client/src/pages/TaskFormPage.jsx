/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate("/tasks");
  });

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue("title", task.title);
        setValue("description", task.description);
      }
    };
    loadTask();
  }, []);

  return (
    <div className="bg-zing-800 max-w-md w-full p-10 rounded-md ">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
          className="w-full bg-zinc-700 text-yellow-50 rounded-md px-4 py-2  my-2"
        />
        <textarea
          name=""
          id=""
          rows="10"
          placeholder="Description"
          {...register("description")}
          className="w-full bg-zinc-700 text-yellow-50 rounded-md px-4 py-2 my-2"
        ></textarea>

        <button>Save</button>
      </form>
    </div>
  );
};

export default TaskFormPage;
