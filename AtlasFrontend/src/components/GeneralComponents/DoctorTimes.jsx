
import React, { useEffect, useState } from "react";
import { Clock3, CheckCircle2, XCircle, Flag } from "lucide-react";
import { useAxios } from "../../useAxios";
import { Loading } from "../../utils/Loading";
import { ErrorMessage } from "../../utils/ErrorMessage";
import { ScreenBlankError } from "../../utils/ScreenBlankError";
import { CustomButton } from "../../utils/CustomButton";
import {useNavigate} from 'react-router-dom'
import { DeleteDoctorTime } from "./DeleteDoctorTime";

const DoctorTimeSlots = 
(
    { 
        times = [],
        doctorId="",
        day="",
    }
) => {

    const [timeSlots, setTimeSlots] = useState(times);
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    let { data, error, loading, request, setError, setData, setLoading } = useAxios()

    const removeMsg = (isNavigate=false) =>
    {
        setTimeout(() => {
            setMsg("")

            if(isNavigate)
            {
                navigate('/settings')
            }

        }, 1500);
    }   

    const saveChanges = async () => {
    
            await request(`/doctors/update-time-status`, "patch",
            {
                day,
                doctorId,
                updatingTime: timeSlots
            }
            )
        }
    
    const handleStatusChange = (index, value) => {
        setTimeSlots(prev =>
            prev.map((slot, i) =>
                i === index
                    ? { ...slot, status: !Boolean(slot.status)/* value === "true" */ }
                    : slot
            )
        );
    };
    
    const handleAvailabilityStatusChange = (index, value) => {
        setTimeSlots(prev =>
            prev.map((slot, i) =>
                i === index
                    ? { ...slot, availability: !Boolean(slot.availability) }
                    : slot
            )
        );
    };

    const availableSlots = timeSlots
        .map((slot, index) => ({ ...slot, originalIndex: index }))
        .filter(slot => slot.availability === true && slot.status === true);

    const unavailableSlots = timeSlots
        .map((slot, index) => ({ ...slot, originalIndex: index }))
        .filter(slot => slot.availability === false || slot.status === false);

        
    useEffect(() => {

        if(!doctorId && !day)
        {
            setError("Doctor id or day is't provided")
        }
        else
        {
            setTimeSlots(times);
        }
        


    }, [times]);


    useEffect(() => {

        if(!loading && data)
        {
            setMsg("Successfully updated times")
            removeMsg(true)
        }


    }, [data]);



    const TimeCard = ({ slot, showDeleteButton=false }) => (
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:border-emerald-200 transition">

            {/* Time */}
            <div className="flex justify-between">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                        <Clock3 size={18} className="text-emerald-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <h4 className="text-sm font-semibold text-gray-800">
                            {slot.time}
                        </h4>
                    </div>
                </div>
                <div>
                    {
                        showDeleteButton &&
                        <DeleteDoctorTime
                        time={slot.time}
                        day={day}
                        doctorId={doctorId}
                        />
                    }
                </div>
            </div>

            {/* Status Dropdown */}
            <div className="mb-3">
                <div className="flex justify-start">
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Status
                    </label>
                </div>

                <select
                    value={Boolean(slot.status)}
                    onChange={(e) =>
                        handleStatusChange(
                            slot.originalIndex,
                            e.target.value
                        )
                    }
                    className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
            </div>

            {/* Status Dropdown */}
            <div className="mb-3">
                <div className="flex justify-start">
                    <label className="block text-xs font-medium text-gray-500 mb-1.5">
                    Booking Status
                    </label>
                </div>

                <select
                    value={Boolean(slot.availability)}
                    onChange={(e) =>
                        handleAvailabilityStatusChange(
                            slot.originalIndex,
                            e.target.value
                        )
                    }
                    className="w-full text-sm px-3 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
            </div>

            {/* Availability */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">

                <span className="text-xs font-medium text-gray-500">
                    Availability
                </span>

                {slot.availability ? (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                        <CheckCircle2 size={15} />
                        Available
                    </span>
                ) : (
                    <span className="flex items-center gap-1.5 text-xs font-medium text-red-500">
                        <XCircle size={15} />
                        Not Available
                    </span>
                )}

            </div>

        </div>
    );

    const TimeCategory = ({ title, slots, type }) => (
        <div className="space-y-3">

            <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-800">
                    {title}
                </h3>

                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    type === "available"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                }`}>
                    {slots.length} Slots
                </span>
            </div>

            {slots.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                    {slots.map(slot => (
                        <TimeCard
                            showDeleteButton={slot?.availability}
                            key={slot.originalIndex}
                            slot={slot}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl py-7 text-center">
                    <p className="text-sm text-gray-400">
                        No time slots available
                    </p>
                </div>
            )}

        </div>
    );


    
  

    return (
        <div className="w-full">


            {
                loading &&
                (
                    <Loading />
                )
            }

            {
                error?.length > 0 &&
                (
                    <div>
                        <ErrorMessage message={error} />
                    </div>
                )
            }

            {
                msg?.length > 0 &&
                (
                    <div>
                        <ScreenBlankError
                         msg={msg}
                        />
                    </div>
                )
            }

            {/* Available Slots */}
            <TimeCategory
                title="Available Time Slots"
                slots={availableSlots}
                type="available"
            />

            <br />
            {/* Unavailable Slots */}
            <TimeCategory
                title="Unavailable Time Slots"
                slots={unavailableSlots}
                type="unavailable"
            />

            <br />

            <div className="flex justify-end">
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
                        name="Save Changes"
                        onClick={() => saveChanges()}
                    />
                </div>
            </div>

        </div>
    );


};

export {DoctorTimeSlots};
