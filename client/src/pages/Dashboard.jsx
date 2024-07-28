import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { Home, Bell, Settings, User, LogOut, UserPlus } from "react-feather";

import logo from "/logo.svg";

export default function Dashboard() {
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

      setTimeout(() => {
        navigate(".", {
          state: { ...location.state, isLoggedIn: false },
          replace: true,
        });
      }, 500);
    }
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
      <div className="grid h-screen w-full grid-cols-12 grid-rows-5 gap-8 bg-gray-800 p-5">
        <div className="col-span-1 row-span-5">
          <div className="flex h-full flex-col items-start justify-between p-4">
            <div>
              <div className="mb-6">
                <img src={logo} className="h-auto w-full" />
                <p className="text-3xl font-extrabold text-white">
                  <span className="text-purple-500">V</span>
                  MS
                </p>
              </div>

              <div className="my-6 flex h-auto w-full flex-col items-center overflow-hidden rounded-full bg-purple-700 shadow-xl shadow-purple-800">
                <Home className="h-auto w-full cursor-pointer p-5 text-white hover:rounded-full hover:bg-purple-600" />
                <User className="h-auto w-full cursor-pointer p-5 text-white hover:rounded-full hover:bg-purple-600" />
                <Bell className="h-auto w-full cursor-pointer p-5 text-white hover:rounded-full hover:bg-purple-600" />
                <Settings className="h-auto w-full cursor-pointer p-5 text-white hover:rounded-full hover:bg-purple-600" />
              </div>
            </div>

            <div className="flex h-1/6 w-full flex-col items-center justify-between overflow-hidden rounded-full bg-purple-700 shadow-xl shadow-purple-800">
              <UserPlus className="h-auto w-full cursor-pointer p-4 text-white hover:rounded-full hover:bg-purple-600" />
              <LogOut className="h-auto w-full cursor-pointer p-4 text-white hover:rounded-full hover:bg-purple-600" />
            </div>
          </div>
        </div>
        <div className="col-span-11 row-span-1 bg-gray-600">Header</div>
        <div className="col-span-7 col-start-2 row-span-2 row-start-2 bg-blue-500">
          Content 1
        </div>
        <div className="col-span-4 col-start-9 row-span-2 row-start-2 bg-green-500">
          Content 2
        </div>
        <div className="col-span-4 col-start-2 row-span-1 row-start-4 bg-red-500">
          Content 3
        </div>
        <div className="col-span-4 col-start-2 row-span-1 row-start-5 bg-yellow-500">
          Content 4
        </div>
        <div className="col-span-7 col-start-6 row-span-2 row-start-4 bg-purple-500">
          Content 5
        </div>
      </div>
    </>
  );
}
