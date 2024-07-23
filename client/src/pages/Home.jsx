import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeImg from "/homescreen.svg";
import MeetingImg from "/meeting.png";
import OfficeImg from "/office.png";
import { toast, ToastContainer } from "react-toastify";
import HomeCard from "../components/HomeCard";

export default function Home() {
  const [navbarColor, setNavbarColor] = useState("bg-gray-800");
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

  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.getElementById("second-section");
      if (secondSection) {
        const sectionTop = secondSection.getBoundingClientRect().top;
        const offset = window.scrollY + sectionTop;
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        if (scrollPosition >= offset) {
          setNavbarColor("bg-gray-900");
        } else {
          setNavbarColor("bg-gray-800");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <Navbar navColor={navbarColor} />
      <div className="relative flex min-h-screen flex-col">
        <div className="mt-24 flex flex-1 flex-row-reverse items-center justify-evenly gap-4 bg-gray-900 px-6 py-32 text-gray-200">
          <section className="flex flex-col items-start justify-center text-center">
            <h1 className="mb-6 text-left text-5xl font-bold">
              Enterprise <span className="text-[#9C27B0]">Visitor</span>{" "}
              Management System
            </h1>
            <p className="text-xl">
              Keep your workforce safe and manage your visitors at any scale
              with a
            </p>
            <p className="mb-8 text-xl">
              simple yet effective visitor management system
            </p>
            <Link to="/register">
              <Button
                variant="contained"
                color="secondary"
                size="large"
                className="px-6 py-3 text-lg"
              >
                Register Your Enterprise
              </Button>
            </Link>
          </section>
          <section className="w-full max-w-3xl">
            <img src={HomeImg} className="w-full" alt="Home" />
          </section>
        </div>

        <div
          id="second-section"
          className="flex flex-col items-center justify-center bg-gray-800 px-6 py-12 text-gray-200"
        >
          <div className="flex flex-col items-center justify-evenly">
            <h2 className="mb-8 text-4xl font-extrabold text-slate-200">
              Our <span className="text-[#9C27B0]">Products</span>
            </h2>
            <p className="m-0 w-[70%] text-center text-xl leading-relaxed tracking-wide text-slate-400">
              Armouring your enterprise with digital solutions that safeguard
              employees, protect company assets, and heighten productivity.
            </p>
          </div>

          <HomeCard DisplayImg={MeetingImg} flexDir={true} />
          <HomeCard DisplayImg={OfficeImg} flexDir={false} />
        </div>
      </div>
      <Footer />
    </>
  );
}
