import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar";
import { toast, ToastContainer } from "react-toastify";

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.isLoggedIn) {
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    navigate(".", {
      state: { ...location.state, isLoggedIn: false },
      replace: true,
    });
  }, [location.state, navigate]);

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
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-gray-200">
        <h1 className="mb-6 text-5xl font-bold">
          Welcome to Visitor Management Portal
        </h1>
        <p className="mb-8 text-center text-xl">
          Manage your visitors efficiently and securely. You can invite
          visitors, and the Admin will give you status updates.
        </p>
        <div className="flex space-x-4">
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="contained" color="secondary">
              Register
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
