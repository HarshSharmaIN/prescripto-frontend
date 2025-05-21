import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-bottom border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="cursor-pointer w-44"
        src={assets.logo}
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to={"/"}>
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/doctors"}>
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/about"}>
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/contact"}>
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to={"/blogs"}>
          <li className="py-1">BLOGS</li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 h-8 rounded-full" src={userData.image} />
            <img className="w-2.5 hidden lg:block" src={assets.dropdown_icon} />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-appointments")}
                >
                  My Appointments
                </p>
                <p className="hover:text-black cursor-pointer" onClick={logout}>
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
            onClick={() => navigate("/login")}
          >
            Create Account
          </button>
        )}
        <img
          src={assets.menu_icon}
          alt=""
          className="w-6 md:hidden"
          onClick={() => setShowMenu(true)}
        />
        {
          <div
            className={`${
              showMenu ? "fixed w-full" : "h-0 w-0"
            } md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all}`}
          >
            <div className="flex items-center justify-between px-5 py-6">
              <img className="w-36" src={assets.logo} alt="" />
              <img
                className="w-7"
                src={assets.cross_icon}
                alt=""
                onClick={() => setShowMenu(false)}
              />
            </div>

            {token && userData ? (
              <div
                className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4"
                onClick={() => setShowMenu(false)}
              >
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  My Profile
                </p>
                <p
                  className="hover:text-black cursor-pointer"
                  onClick={() => navigate("/my-appointments")}
                >
                  My Appointments
                </p>
                <p className="hover:text-black cursor-pointer" onClick={logout}>
                  Logout
                </p>
              </div>
            ) : (
              <button
                className="bg-primary text-white px-8 py-3 rounded-full font-light max-sm:block mx-auto"
                onClick={() => {navigate("/login"); setShowMenu(false)}}
              >
                Create Account
              </button>
            )}

            <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
              <NavLink to="/" onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">Home</p>
              </NavLink>
              <NavLink to="/doctors" onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">All Doctors</p>
              </NavLink>
              <NavLink to="/about" onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">About</p>
              </NavLink>
              <NavLink to="/contact" onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">Contact</p>
              </NavLink>
              <NavLink to="/blogs" onClick={() => setShowMenu(false)}>
                <p className="px-4 py-2 rounded inline-block">Blogs</p>
              </NavLink>
            </ul>
          </div>
        }
      </div>
    </div>
  );
};

export default Navbar;
