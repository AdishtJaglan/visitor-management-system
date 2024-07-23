import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Logo from "/logo.svg";
import PropType from "prop-types";

export default function Navbar({ navColor }) {
  const [username, setUsername] = useState(null);
  const [visible, setVisible] = useState(false);
  const [hoverHeading, setHoverHeading] = useState(false);
  const navigate = useNavigate();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rToken");

    navigate("/home");
    window.location.reload();
  };

  return (
    <nav
      className={`fixed top-0 z-50 flex w-full items-center justify-between ${navColor} p-4`}
    >
      <h1
        className="ml-3 flex cursor-pointer items-center justify-between text-3xl font-black text-zinc-200"
        onMouseEnter={() => setTimeout(() => setHoverHeading(true), 100)}
        onMouseLeave={() => setTimeout(() => setHoverHeading(false), 100)}
      >
        <img src={Logo} alt="logo" className="mr-3 h-16 w-16 -translate-y-2" />
        {!hoverHeading ? (
          <>
            <span className="text-[#9C27B0] transition-all duration-500 ease-linear">
              V
            </span>
            MS
          </>
        ) : (
          <>
            <span className="mr-2 text-[#9C27B0] transition-all duration-500 ease-linear">
              Visitor
            </span>
            Management System
          </>
        )}
      </h1>
      <div className="relative flex w-64 items-center justify-evenly text-xl font-bold text-zinc-200">
        {username ? (
          <>
            <p className="text-xl tracking-wider">
              <span className="text-[#9C27B0]">Hello,</span> {username}
            </p>
            <span
              className={`ml-2 cursor-pointer text-base transition duration-300 ease-in-out hover:scale-125 ${visible ? "rotate-180" : ""}`}
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
              className="w-28 translate-x-14 rounded-lg bg-[#9C27B0] p-3 text-center transition duration-300 ease-in-out hover:bg-[#731084]"
            >
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  navColor: PropType.string.isRequired,
};
