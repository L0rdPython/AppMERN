/* eslint-disable react-hooks/exhaustive-deps */
import "bootstrap/dist/css/bootstrap.min.css";

import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const TaskFormPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
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
    <div className="flex justify-center align-middle bg-indigo-500">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-white my-4">
        <form onSubmit={onSubmit}>
          <h2 className="text-2xl text-center font-bold">Create a task</h2>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register("title", { required: true })}
            autoFocus
            className="w-full bg-zinc-700 text-yellow-50 rounded-md px-4 py-2 my-2 "
          />
          {errors.title && (
            <div className="text-red-500 text-sm">Title is required</div>
          )}

          <label htmlFor="description">Description</label>

          <textarea
            rows="10"
            placeholder="Description"
            {...register("description", { required: true })}
            className={`w-full bg-zinc-700 text-yellow-50 rounded-md px-4 py-2 my-2 `}
          ></textarea>
          {errors.description && (
            <div className="text-red-500 text-sm">description is required</div>
          )}

          {/* <label htmlFor="date">Date</label>

        <input
          type="date"
          {...register("date")}
          className="w-full bg-zinc-700 text-yellow-50 rounded-md px-4 py-2 my-2"
        /> */}

          <div className="flex justify-center">
            <button className="bg-indigo-500 py-2 px-4 rounded-md text-white text-lg  hover:bg-blue-700 transition duration-300 ease-in-out">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
