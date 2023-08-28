/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4">
        <h1 className="h3 text-center mb-3">Sign in to your account</h1>

        {signinErrors.map((er, i) => (
          <div className="alert alert-danger" key={i}>
            {er}
          </div>
        ))}

        <form onSubmit={onSubmit}>
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
            <div className="d-flex justify-content-between align-items-center">
              <input
                {...register("password", { required: true })}
                type="password"
                autoComplete="current-password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <a href="#">Forgot password?</a>
            </div>
            {errors.password && (
              <div className="invalid-feedback">Password is required</div>
            )}
          </div>

          <button className="btn btn-primary w-100">Sign in</button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account?{" "}
          <span
            className="text-primary cursor-pointer"
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
