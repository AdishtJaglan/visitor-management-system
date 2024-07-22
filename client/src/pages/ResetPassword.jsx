import { useState } from "react";
import axios from "axios";
import Spinner from "/spinner.gif";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/password_reset/",
        { email },
      );

      toast.success(`${response.data.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setSuccess(true);
    } catch (error) {
      console.error("Error resetting email: " + error);

      toast.error("Error resetting password:" + error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
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
      <div className="flex h-screen w-full items-center justify-evenly bg-gray-900">
        <form
          className="grid h-80 w-80 grid-rows-[0.8fr_1fr_1fr] rounded-xl bg-gray-800 p-6 shadow-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="place-self-center text-2xl font-bold text-white">
            Reset Password
          </h1>

          <div className="flex flex-col items-start justify-center p-2">
            <label
              htmlFor="email"
              className="text-lg font-medium text-gray-300"
            >
              Enter your email:
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 w-full rounded-lg border border-gray-600 bg-gray-700 p-2 text-gray-200 outline-none focus:border-blue-500 focus:bg-gray-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              aria-required="true"
              aria-invalid={email ? "false" : "true"}
            />
          </div>

          <div className="flex flex-col items-start justify-start p-2">
            <button
              type="submit"
              className={`mt-2 flex w-full items-center justify-center rounded-lg p-2 text-center text-white transition duration-300 ${
                loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
              disabled={loading}
            >
              {loading ? (
                <img src={Spinner} alt="loading..." className="h-6 w-6" />
              ) : (
                "Reset"
              )}
            </button>
          </div>

          {success && (
            <div className="mt-4 flex justify-center">
              <button
                className="mt-1 rounded-lg bg-green-600 p-2 text-sm text-white transition duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                onClick={() => navigate("/login")}
              >
                Login Again?
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
}
