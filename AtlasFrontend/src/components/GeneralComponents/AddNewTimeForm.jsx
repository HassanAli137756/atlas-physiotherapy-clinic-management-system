
import React, { useEffect, useState } from "react";
import { Clock3, ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "../../useAxios";
import { useSelector } from "react-redux";
import { Loading } from "../../utils/Loading";
import { ErrorMessage } from "../../utils/ErrorMessage";
import { CustomButton } from "../../utils/CustomButton";
import { TimeSelection } from "../../utils/Times";
import { ScreenBlankError } from "../../utils/ScreenBlankError";

const AddNewTimeForm =
    (
        {
            day="",
            doctorId = "",
            providedTimes = []
        }) => {


        const [givenTimes, setGivenTimes] = useState(providedTimes)
        const [msg, setMsg] = useState("");
        const [hours, setHours] = useState("");
        const [minutes, setMinutes] = useState("");
        const [period, setPeriod] = useState("PM");


        const removeMsg = () =>
        {
            setTimeout(() => {
                setMsg("")
                setHours("")
                setMinutes("")
            }, 1000);
        }


        const addTime = (e) => {
            e.preventDefault();


            if(hours && minutes && period)
            {
                const newTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${period.toUpperCase()}`

                    if(!doctorId || !day)
                    {
                        setError("Doctor id or day is not provided")
                        return;
                    }

                    request("/doctors/add-time", "patch",
                    {
                        doctorId,
                        newTime,
                        day,
                    }
                    )
                }

            


        };

        let { data, error, loading, request, setError, setData, setLoading } = useAxios()

        
        useEffect(() =>
        {
           setGivenTimes(providedTimes)
        }, [providedTimes])




        useEffect(() =>
        {

            if(hours && period && minutes)
            {
                const newTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${period.toUpperCase()}`

                const times = givenTimes.filter(item => item.time == newTime)


                if(times.length > 0)
                {
                    setError("This time is already existed")
                }
                else
                {
                    setError("")
                }


                


            }
        }, [hours, period, minutes])


        useEffect(() =>
        {
            if(!loading && data)
            {
                setMsg("Successfully added Time")
                setGivenTimes(prev => 
                    [
                        ...prev, 
                        {
                            availability: true, 
                            status: true, 
                            time: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${period.toUpperCase()}`
                        }
                    ])
                removeMsg()
            }
        }, [data])


        

        return (
            <div>

                {
                    loading &&
                    <Loading />
                }
                

                {
                    msg.length > 0 &&
                    <ScreenBlankError msg={msg} />
                }
                

                <div className="max-w-3xl mx-auto">

                    {/* Form */}
                    <div className="p-5 sm:p-7">

                        <div className="flex items-center gap-3 mb-7">

                            <div className="w-10 h-10 rounded-xl bg-emerald-50
            flex items-center justify-center">
                                <Clock3 size={21} className="text-emerald-700" />
                            </div>

                            <h2 className="text-lg font-semibold text-gray-800">
                                Time Details
                            </h2>

                        </div>

                        <form onSubmit={addTime}>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                                {/* Hours */}
                                <div>
                                    <label className="block text-sm font-medium
                text-gray-700 mb-2">
                                        Hours
                                    </label>

                                    <select
                                        required
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                        className="w-full h-12 px-3 rounded-xl border
                  border-gray-200 bg-white text-gray-700 text-sm
                  outline-none focus:border-emerald-600
                  focus:ring-2 focus:ring-emerald-100"
                                    >
                                        <option value="">Select Hour</option>

                                        {Array.from({ length: 12 }, (_, i) => i + 1).map(
                                            (hour) => (
                                                <option key={hour} value={hour}>
                                                    {String(hour).padStart(2, "0")}
                                                </option>
                                            )
                                        )}

                                    </select>
                                </div>

                                {/* Minutes */}
                                <div>
                                    <label className="block text-sm font-medium
                text-gray-700 mb-2">
                                        Minutes
                                    </label>

                                    <select
                                        required
                                        value={minutes}
                                        onChange={(e) => setMinutes(e.target.value)}
                                        className="w-full h-12 px-3 rounded-xl border
                  border-gray-200 bg-white text-gray-700 text-sm
                  outline-none focus:border-emerald-600
                  focus:ring-2 focus:ring-emerald-100"
                                    >
                                        <option value="">Select Minutes</option>

                                        {Array.from({ length: 60 }, (_, i) => i).map(
                                            (minute) => (
                                                <option
                                                    key={minute}
                                                    value={String(minute).padStart(2, "0")}
                                                >
                                                    {String(minute).padStart(2, "0")}
                                                </option>
                                            )
                                        )}

                                    </select>
                                </div>

                                {/* AM / PM */}
                                <div>
                                    <label className="block text-sm font-medium
                text-gray-700 mb-2">
                                        AM / PM
                                    </label>

                                    <select
                                        value={period}
                                        onChange={(e) => setPeriod(e.target.value)}
                                        className="w-full h-12 px-3 rounded-xl border
                  border-gray-200 bg-white text-gray-700 text-sm
                  outline-none focus:border-emerald-600
                  focus:ring-2 focus:ring-emerald-100"
                                    >
                                        <option value="AM">AM</option>
                                        <option value="PM">PM</option>
                                    </select>
                                </div>

                            </div>

                            {/* Selected Time */}
                            <div className="mt-6 p-4 rounded-xl bg-emerald-50/70
            border border-emerald-100 flex items-center justify-between">

                                <span className="text-sm font-medium text-gray-600">
                                    Selected Time
                                </span>

                                <span className="text-lg font-semibold text-emerald-800">
                                    {hours && minutes
                                        ? `${String(hours).padStart(2, "0")}:${minutes} ${period}`
                                        : "--:--"}
                                </span>

                            </div>

                            {
                                error?.length > 0 &&
                                (
                                    <div className="flex justify-center">
                                        <div>
                                            <ErrorMessage message={error} />
                                        </div>
                                    </div>
                                )
                            }

                            {/* Submit */}
                            <div className="mt-7 flex justify-end">

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto flex items-center
                justify-center gap-2 px-6 py-3 rounded-xl
                bg-emerald-700 hover:bg-emerald-800
                text-white text-sm font-medium transition-colors"
                                >
                                    <Plus size={18} />
                                    Add Time
                                </button>

                            </div>
                            <br />

                    {givenTimes.length > 0 && (
                        <div>
                            <div className="flex justify-start">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-emerald-600">
                                Already Existed Times
                            </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                                {givenTimes.map((item) => (
                                    <label
                                        key={`${item.time}`}
                                        className="group relative cursor-pointer"
                                    >
                                        <input
                                        disabled
                                        type="radio"
                                        className="peer sr-only"
                                        />

                                        <div 
                                        className="flex min-w-0 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-3 text-gray-700 transition group-hover:border-emerald-300 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500/20">
                                            <span className="truncate text-sm font-medium">
                                                {item.time}
                                            </span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    )}



                        </form>

                    </div>

                </div>

            </div>
        );
    };

export { AddNewTimeForm };