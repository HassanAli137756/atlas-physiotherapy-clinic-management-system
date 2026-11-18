
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Clock3,
  CalendarPlus,
  CalendarClock,
  ArrowUpRight,
  Timer,
} from "lucide-react";

const TimeManagement = () => {
  const navigate = useNavigate();

  // Apne routes yahan insert kar dena
  const handleNavigation = (path) => {
    navigate(path);
  };


  return (
    <div className="w-full min-h-screen bg-[#f7faf9] px-4 py-6 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">

          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center">
              <Clock3 size={19} className="text-emerald-700" />
            </div>

            <span className="text-sm font-medium text-emerald-700">
              Doctor Dashboard
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
            Time Management
          </h1>

          <div className="flex justify-center">
            <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl leading-relaxed">
            Manage your availability by adding new time slots
            or updating your existing schedule.
          </p>
          </div>

        </div>

        {/* Main Content */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-8 shadow-sm">

          <div className="mb-8 flex justify-center">

            <div>
                <h2 className="text-lg font-semibold text-gray-800">
                    Manage Your Schedule
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Select an action to manage your available appointment times.
                </p>
            </div>

          </div>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* Add New Time */}
            <div className="group border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-emerald-300 hover:shadow-md transition-all duration-200">

              <div className="flex items-start justify-between">

                <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
                  <CalendarPlus
                    size={23}
                    className="text-emerald-700"
                  />
                </div>

                <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full">
                  New Schedule
                </span>

              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">
                Add New Time
              </h3>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed min-h-12">
                Add new available days and time slots to your
                appointment schedule.
              </p>

              <button
                onClick={() => handleNavigation("/add-new-time")}
                className="w-full mt-6 flex items-center justify-center gap-2
                bg-emerald-700 hover:bg-emerald-800 text-white
                font-medium text-sm py-3 px-4 rounded-xl
                transition-colors duration-200"
              >
                Add New Time
                <ArrowUpRight size={17} />
              </button>

            </div>

            {/* Update Existing Time */}
            <div className="group border border-gray-200 rounded-2xl p-5 sm:p-6 hover:border-teal-300 hover:shadow-md transition-all duration-200">

              <div className="flex items-start justify-between">

                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                  <CalendarClock
                    size={23}
                    className="text-teal-700"
                  />
                </div>

                <span className="text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full">
                  Existing Schedule
                </span>

              </div>

              <h3 className="text-lg font-semibold text-gray-800 mt-6">
                Update Existing Time
              </h3>

              <p className="text-sm text-gray-500 mt-2 leading-relaxed min-h-12">
                Modify your existing availability and make changes
                to your current time slots.
              </p>

              <button
                onClick={() => handleNavigation("/update-existing-time")}
                className="w-full mt-6 flex items-center justify-center gap-2
                bg-teal-700 hover:bg-teal-800 text-white
                font-medium text-sm py-3 px-4 rounded-xl
                transition-colors duration-200"
              >
                Update Existing Time
                <ArrowUpRight size={17} />
              </button>

            </div>

          </div>

          {/* Bottom Note */}
          <div className="mt-7 pt-5 border-t border-gray-100 flex items-start gap-3">

            <Timer
              size={19}
              className="text-gray-400 mt-0.5 shrink-0"
            />

            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              Keep your availability updated to help patients
              book appointments according to your schedule.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export {TimeManagement};
