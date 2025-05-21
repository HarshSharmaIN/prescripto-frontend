import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AppContext } from "../context/AppContext";

const MyAppointment = () => {
  const navigate = useNavigate();
  const {
    appointments,
    joinMeeting,
    token,
    getUserAppointments,
    Loader,
    cancelAppointment,
    paymentRazorpay,
    isLoading,
    slotDateFormat
  } = useContext(AppContext);

  const timeNow = new Date();

  const parseAppointmentDateTime = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split("_");
    const formattedDate = `${month}/${day}/${year}`;
    return new Date(`${formattedDate} ${slotTime}`);
  };
  
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  useEffect(() => {
    appointments.forEach((item) => {
      const appointmentDate = parseAppointmentDateTime(item.slotDate, item.slotTime);
      
      if (timeNow > appointmentDate && !item.payment && !item.cancelled) {
        cancelAppointment(item._id);
      }
    });
  }, [appointments]);

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b border-b-gray-400">
        My Appointment
      </p>
      <div>
        {appointments.length === 0 ? (
          <p className="h-full w-full text-4xl text-zinc-400">
            No Appointments Available
          </p>
        ) : (
          appointments.map((item, index) => {
            const appointmentDate = parseAppointmentDateTime(item.slotDate, item.slotTime);
            const isPastAppointment = timeNow > appointmentDate;

            return (
              <div
                className="grid grid-cols-[1fr_3fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-b-gray-400"
                key={index}
              >
                <div>
                  <img
                    className="w-32 bg-indigo-50"
                    src={item.docData.image}
                    alt=""
                  />
                </div>
                <div className="flex-1 text-sm text-zinc-600">
                  <p className="text-neutral-800 font-semibold">
                    {item.docData.name}
                  </p>
                  <p>{item.docData.speciality}</p>
                  <p className="text-zinc-700 font-medium mt-1">Address:</p>
                  <p className="text-xs">{item.docData.address.line1}</p>
                  <p className="text-xs">{item.docData.address.line2}</p>
                  <p className="text-xs mt-1">
                    <span className="text-xs text-neutral-700 font-medium">
                      Date & Time:
                    </span>
                    {slotDateFormat(item.slotDate)} | {item.slotTime}
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/my-appointments/${item._id}`)}
                    className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-yellow-500 hover:text-black transition-all duration-300"
                  >
                    View Details
                  </button>
                  {!item.cancelled &&
                    item.payment && (
                      <button className="sm:min-w-48 py-1 border rounded text-stone-500 bg-indigo-50">
                        Paid
                      </button>
                    )}
                  {!isPastAppointment &&
                    !item.cancelled &&
                    !item.payment && (
                      <button
                        onClick={() => paymentRazorpay(item._id)}
                        className="text-sm text-stone-500 text-center sm:min-w-40 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                      >
                        Pay Online
                      </button>
                    )}
                  {!isPastAppointment &&
                    !item.cancelled &&
                   (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="text-sm text-stone-500 text-center sm:min-w-40 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
                      >
                        Cancel Appointment
                      </button>
                    )}
                  {item.cancelled && !item.isCompleted && (
                    <button className="sm:min-w-48 py-2 border-red-500 rounded text-red-500">
                      Appointment cancelled
                    </button>
                  )}
                  {item.isCompleted && (
                    <button className="sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                      Completed
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyAppointment;
