import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HomeImg from "/homescreen.svg";
import MeetingImg from "/meeting.png";
import OfficeImg from "/office.png";
import PeopleImg from "/people.png";

import HomeCard from "../components/HomeCard";

export default function Home() {
  const [navbarColor, setNavbarColor] = useState("bg-gray-800");

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

  const homeCardsData = [
    {
      heading: "Visitors",
      content: (
        <>
          Streamline your <span className="text-[#9C27B0]">visitor</span>{" "}
          experience with our advanced visitor management system. Effortlessly
          register, check-in, and check-out visitors using our digital platform.
          Our solution integrates seamlessly with your existing workflows,
          enhancing security and productivity while providing a warm welcome to
          your guests.
        </>
      ),
      DisplayImg: MeetingImg,
      flexDir: true,
    },
    {
      heading: "Meetings",
      content: (
        <>
          Optimize your meeting{" "}
          <span className="text-[#9C27B0]">management</span> with our intuitive
          platform. Easily view team availability, book meeting rooms, and
          eliminate scheduling conflicts. Our solution fosters efficient
          collaboration and ensures everyone stays informed and on track.
        </>
      ),
      DisplayImg: OfficeImg,
      flexDir: false,
    },
    {
      heading: "ID Cards & QR Scanners",
      content: (
        <>
          Enhance your <span className="text-[#9C27B0]">visitor</span>{" "}
          management process with our secure ID cards and QR scanners. Issue
          personalized ID cards with QR codes to visitors, enabling quick and
          easy check-ins and check-outs. Our system ensures efficient tracking
          and management of all visitors, providing an added layer of security
          to your premises.
        </>
      ),
      DisplayImg: PeopleImg,
      flexDir: true,
    },
  ];

  return (
    <>
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

          {homeCardsData.map((card, index) => (
            <HomeCard
              key={index}
              heading={card.heading}
              content={card.content}
              DisplayImg={card.DisplayImg}
              flexDir={card.flexDir}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
