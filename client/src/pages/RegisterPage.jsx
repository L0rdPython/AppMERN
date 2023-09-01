/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex justify-around py-5 px-2 ">
      <div className="card p-4">
        <h2 className="h3 text-center mb-4">Create your account</h2>

        {registerErrors.map((er, i) => (
          <div className="alert alert-danger" key={i}>
            {er}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              autoComplete="username"
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            {errors.username && (
              <div className="invalid-feedback">Username is required</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              autoComplete="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">Email is required</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              autoComplete="new-password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>

          <button className="btn btn-primary w-100">Register</button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
