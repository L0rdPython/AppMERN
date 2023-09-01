import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  // alert(menuIsOpen);

  const closeMenuOnResize = () => {
    if (window.innerWidth <= 768) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", closeMenuOnResize);

    return window.removeEventListener("resize", closeMenuOnResize);
  });

  return (
    <nav
      className={`flex justify-around py-5 px-2 bg-black text-white ${
        menuIsOpen && "flex justify-center align-middle"
      }`}
    >
      {/* //Titulo */}
      <Link
        to={isAuthenticated ? "/tasks" : "/"}
        className="hover:no-underline text-white"
      >
        <h1 className="text-2xl font-bold ">
          <span className="text-red-600">+</span>Notes
        </h1>
      </Link>

      {/* Hamburger Menu */}
      <div className="md:hidden">
        <button
          className="text-white"
          onClick={() => setMenuIsOpen(!menuIsOpen)}
        >
          {menuIsOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* --------------------------------------------------------------------------------------------*/}
      <ul
        className={`md:flex gap-x-4  ${
          menuIsOpen ? "flex flex-col gap-y-7" : "hidden"
        }`}
      >
        {!isAuthenticated && (
          <>
            <li>
              <Link
                to={"/login"}
                className="bg-blue-500  text-white font-semibold py-2 px-4 rounded-md hover:no-underline  hover:bg-blue-700 transition duration-300 ease-in-out"
                onClick={() => setMenuIsOpen(false)}
              >
                Login
              </Link>
            </li>

            <li>
              <Link
                to={"/register"}
                className="bg-blue-500  text-white font-semibold py-2 px-4 rounded-md hover:no-underline  hover:bg-blue-700 transition duration-300 ease-in-out"
                onClick={() => setMenuIsOpen(false)}
              >
                Register
              </Link>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>Welcome {user.username}</li>

            <li>
              <Link
                to={"/tasks"}
                onClick={() => setMenuIsOpen(false)}
                className=" hover:no-underline hover:text-blue-700"
              >
                Tasks
              </Link>
            </li>

            <li>
              <Link
                to={"/add-task"}
                onClick={() => setMenuIsOpen(false)}
                className=" hover:no-underline hover:text-blue-700"
              >
                Add a task
              </Link>
            </li>

            <li>
              <Link
                onClick={() => {
                  setMenuIsOpen(false);
                  logout();
                }}
                to={"/"}
                className="bg-blue-500  text-white font-bold py-2 px-4 rounded-md  hover:bg-blue-700 transition duration-300 ease-in-out"
              >
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
