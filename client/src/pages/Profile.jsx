import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { loading, currentUser } = useSelector((state) => state.user);
  // const [formData, setFormData] = useState({
  //   email: currentUser.email,
  //   username: currentUser.username
  // });
  // const handleChange = (e) => {

  // };

  return (
    <div className="flex flex-col justify-center items-center pt-8 space-y-3">
      <h1 className="text-xl sm:text-2xl font-semibold">Profile</h1>

      <form className="flex flex-col space-y-2 w-[14rem] sm:w-[20rem]">
        <img
          src={currentUser.avatar}
          alt="Profile pic"
          className="h-[7rem] w-[7rem] rounded-full cursor-pointer self-center object-cover"
        />
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
        />

        <input
          type="text"
          id="email"
          placeholder="Email"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="rounded-md px-2 py-1 border-0 text-[.8rem] focus:outline-none"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-md px-3 py-1 border-0 text-[.8rem] hover:bg-slate-500 active:translate-y-px"
        >
          {loading ? "Loading..." : "UPDATE"}
        </button>

        <button
          disabled={loading}
          className="bg-red-600 text-white rounded-md px-3 py-1 border-0 text-[.8rem] hover:bg-red-500 active:translate-y-px"
          // onClick={handleSubmit}
        >
          {loading ? "Loading..." : "CREATE LISTING"}
        </button>
      </form>

      <div className="flex justify-between w-[14rem] sm:w-[20rem] px-2">
        <span className="text-red-600 cursor-pointer text-[0.9rem]">
          Delete account
        </span>
        <span className="text-red-600 cursor-pointer text-[0.9rem]">
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default Profile;
