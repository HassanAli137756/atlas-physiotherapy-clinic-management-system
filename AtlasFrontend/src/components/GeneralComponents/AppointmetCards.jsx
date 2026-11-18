import { Clock3, Plus, UserRoundCheck, MoreVertical, CreditCard, Pencil } from "lucide-react"
import React, {useState, useEffect, useRef} from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AppointmentActions } from "./AppointmentActions";
import { CustomButton } from "../../utils/CustomButton";



export function AppointmentCards(
  {
    header = "",
    message = "",
    appointments = [],
    isReceptionist = false,
    isDateShow = false,
    isBookingButtonShow = false
  }) {

  const navigate = useNavigate();

  const
    {
      userData,
    }
      = useSelector(state => state.userReducer.userInfo)

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm xl:col-span-2">




      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            {header}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {message}
          </p>
          <br />
          <div className="flex justify-start">
            <span className="
                  inline-flex items-center gap-1.5
                  px-2.5 py-1.5
                  rounded-full
                  bg-emerald-50
                  text-emerald-700
                  text-xs font-semibold
                ">
              {appointments.length} Appointments
            </span>
          </div>
        </div>
        {
          userData?.role !== "patient" &&
          (
            <div>
              <CustomButton
                  isAllowedDefaultClasses={false}
                  classes="inline-flex items-center justify-center gap-2
                  rounded-xl bg-emerald-700 px-4 py-2.5
                  text-sm font-semibold text-white
                  shadow-sm transition-all duration-200
                  hover:bg-emerald-800 hover:shadow-md
                  active:scale-[0.97]
                  focus:outline-none focus:ring-2
                  focus:ring-emerald-500 focus:ring-offset-2
                  w-full sm:w-auto"
                  name="Create Profile"
                  onClick={() => navigate("/create-profile")}
                />
              </div>
            )
          }

      </div>
      <div className="divide-y divide-gray-100">
        {appointments.length > 0 ? appointments.map((appointment) => {
          const appointmentDetails =
          {
            appointmentId: appointment._id,
            fullName: appointment.generalPatientInfo?.patientName,
            email: appointment.generalPatientInfo?.email,
            cellNo: appointment.generalPatientInfo?.cellNo,
            diagnoses: appointment.diagnoses,
            paymentStatus: appointment.paymentStatus,
            treatmentStatus: appointment.status,
            paid: appointment.paymentSection?.paid,
            payable: appointment.paymentSection?.payable,
            forSession: appointment.forSession,
            day: new Date(appointment.times.date).toLocaleDateString("en-US", {"weekday": "long"}).toLowerCase(),
            time: appointment.times.time,
            doctor: appointment.doctor,
            role: userData?.role,
            date: appointment?.times?.date
          }
          return (
            <div
              key={appointment?._id}
              className="flex flex-col gap-4 p-5 transition hover:bg-gray-50/60 sm:flex-row sm:items-center sm:justify-between"
            >
              
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  {
                    appointment?.userProfileId?.patientAccount?.avatar ?
                      
                        <img 
                        className="rounded-full w-15 h-15"
                        src={appointment?.userProfileId?.patientAccount?.avatar} alt="Err" />
                      :
                      <UserRoundCheck className="h-5 w-5" />
                  }


                </div>

                <div>
                  <div className="flex justify-start">

                    <h3 className="font-semibold text-gray-900">
                      {appointment?.generalPatientInfo?.patientName}
                    </h3>
                  </div>

                  {
                    isReceptionist &&
                    <div className="flex justify-start">
                      <p className="mt-0.5 text-sm text-gray-500">
                        Dr. {appointment?.doctor?.fullName}
                      </p>
                    </div>
                  }

                  <div className="flex justify-start">
                    <p className="mt-0.5 text-sm text-gray-500">
                      {appointment.forSession?.slice(0, 1)?.toUpperCase() + appointment?.forSession?.slice(1, appointment?.forSession?.length)}
                    </p>
                  </div>

                  <div className="flex justify-start">
                    <p className="mt-1 text-xs text-gray-400">
                      Payment : {appointment?.paymentSection?.paid || 0}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div className="flex justify-end p-2.5">
                  <div className="relative">
                  {isBookingButtonShow && (
                    <div className="">
                      <AppointmentActions
                        appointmentDetails={appointmentDetails}
                      />
                    </div>
                  )}
                </div>
                </div>

                <div className="grid grid-cols-1">

                  <div>
                    <div className="flex items-center justify-between gap-4 sm:justify-end">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
                        <Clock3 className="h-4 w-4 text-emerald-600" />
                        {isDateShow ? new Date(appointment.times?.date?.replace("Z", "")).toLocaleDateString("en-US", { dateStyle: "medium" }) : appointment.times?.time}
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === "done"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-amber-50 text-amber-700"
                          }`}
                      >
                        {appointment.status}
                      </span>

                    </div>
                  </div>



                  {
                    isBookingButtonShow &&
                    (
                      <div>
                        <br />
                        <div className="flex justify-end">
                          <div className="flex justify-between gap-5">
                            <button
                              onClick={() => navigate("/book-appointment", {
                                state: {
                                  
                                    profileId: appointment?._id,
                                    doctorId: appointment?.doctor?._id,
                                    fullName: appointment?.generalPatientInfo?.patientName,
                                    email: appointment?.generalPatientInfo?.email,
                                    cellNo: appointment?.generalPatientInfo?.cellNo,
                                    forSession: appointment?.forSession,
                                    time: appointment?.time,
                                  
                                }
                              })}
                              type="button"
                              className="
                            inline-flex items-center justify-center gap-2
                            px-4 py-2.5
                            rounded-xl
                            bg-emerald-700
                            text-white
                            text-sm font-semibold
                            shadow-sm
                            hover:bg-emerald-800
                            active:bg-emerald-900
                            active:scale-[0.98]
                            focus:outline-none
                            focus:ring-2
                            focus:ring-emerald-200
                            transition
                          "
                            >
                              <Plus size={18} />
                              Re-Book
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  }

                </div>
              </div>
            </div>
          )
        }) :
          <p className="font-semibold p-2">
            There is no appointment.
          </p>
        }
      </div>
    </section>

  )
}