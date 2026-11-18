
/* ****************** OKAY ****************** */

import React from "react";
import { ProfileForm } from "../forms/ProfileForm";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../utils/ErrorMessage";



const CreateProfile = () => {

  const { userData } = useSelector(state => state.userReducer.userInfo)


  if(userData?.role == "patient")
  {
    return(
      <div>
        <ErrorMessage
        message="You are not allowed to access this page"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f3f8f6] flex items-center justify-center px-4 py-10 rounded-2xl">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">

        {/* Right - Register Form */}
        <div className="p-7 sm:p-10 lg:p-12">

          {/* Mobile Branding */}
          <div className=" flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <span className="text-xl">✚</span>
            </div>

            <div>
              <h1 className="text-xl font-bold text-emerald-900">
                Atlas Physiotherapy
              </h1>
              <p className="text-xs text-gray-500">
                Clinic Management System
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Create Profile
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Create profile for new patient before booking appointment.
            </p>
          </div>


          <ProfileForm />
        </div>
      </div>
    </div>
  );
};

export { CreateProfile };