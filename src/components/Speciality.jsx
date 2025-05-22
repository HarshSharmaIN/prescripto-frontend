import React from "react";
import { Link } from "react-router-dom";

import { specialityData } from "../assets/assets";

const Speciality = () => {
  return (
    <div
      id="speciality"
      className="flex flex-col max-w-screen-lg mx-auto items-center gap-4 py-16 text-gray-800"
    >
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free.
      </p>
      <div className="md:flex grid grid-cols-3 gap-6">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center text-center justify-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
            onClick={() => scrollTo(0, 0)}
          >
            <img src={item.image} alt="" className="w-16 sm:w-24 mb-2" />
            <p>{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Speciality;
