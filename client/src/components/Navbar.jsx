/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export default function Navbar() {
  const [username, setUsername] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const { user_id } = jwtDecode(token);
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/users/?pk=${user_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setUsername(response.data.username);
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {};

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-gray-800 p-7">
      <h1 className="text-4xl font-black text-zinc-200">Visitor Management</h1>
      <div className="relative flex w-64 items-center justify-center text-xl font-bold text-zinc-200">
        {username ? (
          <>
            <p className="tracking-wider">Hello, {username}</p>
            <span
              className={`text-s ml-2 cursor-pointer transition duration-300 ease-in-out hover:scale-125 ${visible ? "rotate-180" : ""}`}
              onClick={() => setVisible(!visible)}
            >
              {"\u25BF"}
            </span>
            {visible && (
              <div
                className={`absolute right-0 top-full mt-2 w-48 origin-top-right rounded-md bg-gray-700 py-1 shadow-lg transition-all duration-300 ease-in-out ${visible ? "animate-slideDown scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
              >
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-zinc-200 transition duration-150 ease-in-out hover:bg-gray-600"
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-zinc-200 transition duration-150 ease-in-out hover:bg-gray-600"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="mr-4 transition duration-150 ease-in-out hover:text-gray-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="transition duration-150 ease-in-out hover:text-gray-300"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
