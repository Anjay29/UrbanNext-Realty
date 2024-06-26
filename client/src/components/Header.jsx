// import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-400">
      <div className="flex justify-between items-center max-w-6xl p-3 mx-auto">
        <Link to={"/"}>
          <h1>
            <span className="text-xl sm:text-3xl text-slate-600">ark</span>
            <span className="text-xl sm:text-3xl text-slate-600">Estate</span>
          </h1>
        </Link>

        <form className="bg-slate-300 flex justify-between rounded-xl md:w-72 p-2">
          <input
            type="text"
            placeholder="Search..."
            className=" focus:outline-none sm:w-64 bg-transparent mr-2"
          />
          <button>
            <FaSearch className="text-slate-600 text-1xl sm:text-2xl" />
          </button>
        </form>

        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="font-semibold text-slate-600 text-1xl hidden sm:inline">
              Home
            </li>
          </Link>

          <Link to={"/about"}>
            <li className="font-semibold text-slate-600 text-1xl hidden sm:inline">
              About
            </li>
          </Link>

          <Link to={"/signin"}>
            <li className="font-semibold text-slate-600 text-1xl">Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
