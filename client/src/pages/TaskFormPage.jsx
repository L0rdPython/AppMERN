/* eslint-disable react-hooks/exhaustive-deps */
import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();
  const { createTask, getTask, updateTask } = useTasks();

  const navigate = useNavigate();
  const params = useParams();

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, { ...data, date: dayjs.utc(data.date).format() });
    } else {
      createTask({ ...data, date: dayjs.utc(data.date).format() });
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
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-white">
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
          className="w-full bg-zinc-700 text-yellow-50 rounded-md px-4 py-2  my-2"
        />

        <label htmlFor="description">Description</label>

        <textarea
          name=""
          id=""
          rows="10"
          placeholder="Description"
          {...register("description")}
          className="w-full bg-zinc-700 text-yellow-50 rounded-md px-4 py-2 my-2"
        ></textarea>

        {/* <label htmlFor="date">Date</label>

        <input
          type="date"
          {...register("date")}
          className="w-full bg-zinc-700 text-yellow-50 rounded-md px-4 py-2 my-2"
        /> */}

        <button className="bg-indigo-500 py-2 px-2 rounded-md text-white">
          Save
        </button>
      </form>
    </div>
  );
};

export default TaskFormPage;
