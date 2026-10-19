
import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, CreditCard, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

function AppointmentActions({ appointmentId }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  //const navigate = useNavigate();
  console.log("menuRef: ", menuRef.current);
  
  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleNavigation = (path) => {
    setIsOpen(false);
    //navigate(path);
  };

  return (
    <div ref={menuRef} className="relative inline-block">

      {/* Three Dots Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg text-gray-500 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
        aria-label="Appointment actions"
        aria-expanded={isOpen}
      >
        <MoreVertical size={21} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden">

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                `/appointments/${appointmentId}/payment`
              )
            }
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            <CreditCard size={17} />
            Update Payment
          </button>

          <div className="h-px bg-gray-100" />

          <button
            type="button"
            onClick={() =>
              handleNavigation(
                `/appointments/${appointmentId}/update`
              )
            }
            className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
          >
            <Pencil size={17} />
            Update Details
          </button>

        </div>
      )}
    </div>
  );
}

export {AppointmentActions};
