
import React from "react";
import {
  CalendarDays,
  CreditCard,
  Clock3,
} from "lucide-react";

const App = ({ children }) => {

  const sections = [
    {
      title: "Appointment Details",
      description: "Patient and treatment information",
      icon: CalendarDays,
    },
    {
      title: "Payment Details",
      description: "Appointment charges and payment information",
      icon: CreditCard,
    },
    {
      title: "Appointment Timings",
      description: "Select your preferred appointment schedule",
      icon: Clock3,
    },
  ];

  return (
    <form className="w-full space-y-6">

      {/* Appointment Details */}
      <section className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <CalendarDays size={21} />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Appointment Details
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Patient and treatment information
            </p>
          </div>
        </div>

        {/* <div className="space-y-5">
          {children[0]}
        </div>
 */}
      </section>


      {/* Payment Details */}
      <section className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <CreditCard size={21} />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Payment Details
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Appointment charges and payment information
            </p>
          </div>
        </div>
{/* 
        <div className="space-y-5">
          {children[1]}
        </div>
 */}
      </section>


      {/* Appointment Timings */}
      <section className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Clock3 size={21} />
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-semibold text-gray-800">
              Appointment Timings
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Select your preferred appointment schedule
            </p>
          </div>
        </div>
{/* 
        <div className="space-y-5">
          {children[2]}
        </div> */}

      </section>

    </form>
  );
};

export default App;
