import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "/spinner.gif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.access);
      localStorage.setItem("rToken", response.data.refresh);

      navigate("/dashboard", { state: { isLoggedIn: true } });
    } catch (error) {
      toast.error("Error logging in: " + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      console.error("Error occured while trying to login: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <form
          className="grid h-96 w-80 grid-rows-[0.8fr_1fr_1fr_1fr] rounded-xl bg-gray-800 p-6 shadow-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="place-self-center text-2xl font-bold text-white">
            Login Into Account
          </h1>

          <div className="flex flex-col items-start justify-center p-2">
            <label className="text-lg font-medium text-gray-300">
              Username:
            </label>
            <input
              type="text"
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-gray-200 outline-none focus:border-blue-500 focus:bg-gray-600"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start justify-center p-2">
            <label className="text-lg font-medium text-gray-300">
              Password:
            </label>
            <input
              type="password"
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-gray-200 outline-none focus:border-blue-500 focus:bg-gray-600"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col items-start justify-start p-2">
            <Link
              to="/reset_password"
              className="cursor-pointer text-sm text-blue-400 hover:text-blue-500 hover:underline"
            >
              Forget Password?
            </Link>
            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center rounded-lg bg-blue-600 p-2 text-center text-white transition duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {loading ? (
                <img src={Spinner} alt="loading..." className="h-6 w-6" />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
