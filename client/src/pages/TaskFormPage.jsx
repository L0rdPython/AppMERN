import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";

const TaskFormPage = () => {
  const { register, handleSubmit } = useForm();
  const { createTask } = useTasks();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
  });

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
