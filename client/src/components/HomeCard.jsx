import PropTypes from "prop-types";

export default function HomeCard({ flexDir, DisplayImg }) {
  return (
    <div
      className={`mt-12 flex w-full ${flexDir ? "flex-row-reverse" : ""} items-center justify-evenly gap-4`}
    >
      <section className="flex flex-col items-start justify-center text-center">
        <h3 className="mb-4 text-left text-3xl font-bold text-slate-200">
          Visitors
        </h3>
        <p className="text-left text-lg leading-relaxed tracking-wide text-slate-400">
          Streamline your <span className="text-[#9C27B0]">visitor</span>{" "}
          experience with our advanced visitor management system. Effortlessly
          register, check-in, and check-out visitors using our digital platform.
          Our solution integrates seamlessly with your existing workflows,
          enhancing security and productivity while providing a warm welcome to
          your guests.
        </p>
        <button className="h-18 mt-3 w-32 rounded-lg bg-[#9C27B0] p-2 transition duration-300 ease-in-out hover:bg-[#731084] hover:text-slate-300">
          Learn More
        </button>
      </section>
      <section className="w-full max-w-md">
        <img src={DisplayImg} className="w-full" alt="Visitors" />
      </section>
    </div>
  );
}

HomeCard.propTypes = {
  flexDir: PropTypes.bool.isRequired,
  DisplayImg: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
};
