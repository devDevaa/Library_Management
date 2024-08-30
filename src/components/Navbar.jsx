import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTheme from "../hooks/useTheme";
import PicTheme from "../assets/react.svg";

export default function Navbar() {
  let [search, setSearch] = useState("");
  let navigate = useNavigate();

  let handleSearch = (e) => {
    navigate('/?search='+search);
  }

  let {theme, changeTheme, isDark} = useTheme();
  console.log(theme);

  // let {error, loading, logout} = useSignout();

  // let signoutUser = async () => {
  //    await logout();
  //   navigate('/')
  // }

  return (
    <nav className={`border border-b-1 border-indigo-100 ${isDark ? 'bg-dbg border-primary' : 'bg-white'}`}>
      <ul className="flex justify-between items-center p-3 max-w-6xl mx-auto">
        <li className="flex items-center gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none px-3 py-1 rounded-md"
            type="text"
            placeholder="Search books..."
          />
          <button
            onClick={handleSearch}
            type="button"
            className="text-white bg-primary px-3 py-2 rounded-md flex items-center gap-1"
          >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

            {/* <span className="hidden md:block">Create Book</span> */}
          </button>
        </li>

        <li>
          <Link
            to="/"
            className="flex items-center gap-2 md:-ml-40 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"
              />
            </svg>
            <span className="text-2xl font-bold text-primary font-['Open_Sans'] md:block hidden">
              Central Library
            </span>
          </Link>
        </li>

        <li className="flex items-center gap-3">
          <Link
            to="/create"
            className="text-white bg-primary px-3 py-2 rounded-md flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>

            <span className="hidden md:block">Create Book</span>
          </Link>
          <div className="w-11">
            <img
              className="w-full rounded-full"
              src="https://cdn.imgchest.com/files/345xck3w597.png"
              alt=""
            />
          </div>
          <div className="cursor-pointer ">
            {!isDark && <img src={PicTheme} className="w-8" alt="" onClick={() => changeTheme('dark') }/>}
            {isDark && <img src={PicTheme} className="w-8 bg-slate-500 rounded-lg" alt="" onClick={() => changeTheme('light') }/>}
          </div>
          <div className="">
          {/* onClick={signoutUser} */}
            <button className="bg-red-500 text-white  px-3 py-2 rounded-md flex items-center gap-1">Log out</button>
          </div>
        </li>
      </ul>
    </nav>
  );
}
