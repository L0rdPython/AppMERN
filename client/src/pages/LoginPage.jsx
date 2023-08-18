import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const { errors: registerErrors } = useAuth();
  const navigate = useNavigate();
  const onSubmit = () => {};

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-10 lg:px-1 h-screen">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          {registerErrors.map((e, i) => (
            <div className="bg-red-500 p-2 text-red-200 w-full" key={i}>
              {e}
            </div>
          ))}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                {...register("email", { required: true })}
                type="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
              {errors.email && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-orange-600 hover:text-orange-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                {...register("password", { required: true })}
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6"
              />
            </div>
            {errors.password && (
              <p className="text-red-500">Password is required</p>
            )}
          </div>

          <button className="block w-full rounded-md bg-orange-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600">
            Register
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          You do not have an account?{" "}
          <span
            className="font-semibold leading-6 text-orange-600 hover:text-orange-500 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
