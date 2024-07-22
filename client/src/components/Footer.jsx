import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-gray-200">
      <div className="container mx-auto flex flex-col items-center justify-between md:flex-row md:items-start">
        <div className="mb-6 md:mb-0 md:w-1/4">
          <h3 className="mb-4 text-xl font-bold">
            Get Started for <span className="text-[#9C27B0]">Free</span>
          </h3>
          <Link to="/book-demo">
            <button className="rounded-lg bg-[#9C27B0] px-6 py-2 text-lg font-bold text-white transition duration-300 ease-in-out hover:bg-[#731084] hover:text-slate-300">
              Book a Demo
            </button>
          </Link>
        </div>

        <div className="flex flex-col space-y-4 md:w-3/4 md:flex-row md:space-x-12 md:space-y-0">
          <div className="flex flex-col">
            <h4 className="mb-4 font-bold">SOLUTIONS</h4>
            <Link
              to="/enhance-security"
              className="text-slate-400 hover:underline"
            >
              Enhance Security
            </Link>
            <Link to="/compliances" className="text-slate-400 hover:underline">
              Compliances
            </Link>
            <Link
              to="/enhance-visitor"
              className="text-slate-400 hover:underline"
            >
              Enhance Visitor
            </Link>
            <Link
              to="/operational-efficiency"
              className="text-slate-400 hover:underline"
            >
              Operational Efficiency
            </Link>
            <Link
              to="/hybrid-workplace"
              className="text-slate-400 hover:underline"
            >
              Hybrid Workplace
            </Link>
            <Link
              to="/space-management"
              className="text-slate-400 hover:underline"
            >
              Space Management
            </Link>
          </div>

          <div className="flex flex-col">
            <h4 className="mb-4 font-bold">PRODUCT</h4>
            <Link to="/pricing" className="text-slate-400 hover:underline">
              Pricing
            </Link>
            <Link to="/visitors" className="text-slate-400 hover:underline">
              Visitors
            </Link>
            <Link to="/desks" className="text-slate-400 hover:underline">
              Desks
            </Link>
          </div>

          <div className="flex flex-col">
            <h4 className="mb-4 font-bold">RESOURCES</h4>
            <Link to="/help-centre" className="text-slate-400 hover:underline">
              Help Centre
            </Link>
            <Link to="/blog" className="text-slate-400 hover:underline">
              Blog
            </Link>
            <Link to="/developers" className="text-slate-400 hover:underline">
              Developers
            </Link>
          </div>

          <div className="flex flex-col">
            <h4 className="mb-4 font-bold">ABOUT US</h4>
            <Link to="/company" className="text-slate-400 hover:underline">
              Company
            </Link>
            <Link to="/contact-us" className="text-slate-400 hover:underline">
              Contact Us
            </Link>
            <Link to="/team" className="text-slate-400 hover:underline">
              Team
            </Link>
          </div>

          <div className="flex flex-col">
            <h4 className="mb-4 font-bold">LEGALS</h4>
            <Link
              to="/terms-conditions"
              className="text-slate-400 hover:underline"
            >
              Terms & Conditions
            </Link>
            <Link
              to="/privacy-policy"
              className="text-slate-400 hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              to="/manage-cookies"
              className="text-slate-400 hover:underline"
            >
              Manage Cookies
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:underline"
          >
            Twitter
          </a>
        </div>

        <p className="mt-6 text-sm">
          &copy; 2024 Adisht Jaglan. All rights reserved.
        </p>
        <p className="text-sm">A Product of Hahah Pvt. Ltd.</p>
      </div>
    </footer>
  );
}
