import PropTypes from "prop-types";

export default function HomeCard({ heading, content, flexDir, DisplayImg }) {
  return (
    <div
      className={`mt-12 flex w-full ${flexDir ? "flex-row-reverse" : ""} items-center justify-evenly gap-4`}
    >
      <section className="flex flex-col items-start justify-center text-center">
        <h3 className="mb-4 text-left text-3xl font-bold text-slate-200">
          {heading}
        </h3>
        <p className="text-left text-lg leading-relaxed tracking-wide text-slate-400">
          {content}
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
  heading: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  flexDir: PropTypes.bool.isRequired,
  DisplayImg: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType])
    .isRequired,
};
