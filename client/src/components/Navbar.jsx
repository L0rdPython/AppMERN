import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <nav className="flex justify-between py-5 px-10 rounded-lg bg-black text-white">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className=" text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {!isAuthenticated && (
          <>
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>Welcome {user.data.username}</li>
            <li>
              <Link to={"/tasks"}>Tasks</Link>
            </li>
            <li>
              <Link to={"/add-task"}>Add a task</Link>
            </li>
            <li>
              <Link to={"/"} onClick={logout}>
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
