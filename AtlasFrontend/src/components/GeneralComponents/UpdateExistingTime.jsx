
import React, {useEffect, useState} from "react";
import { Clock3, CalendarDays, ChevronDown } from "lucide-react";
import { SelectInput } from "../../utils/CustomSelectInput";
import { useAxios } from "../../useAxios";
import { useSelector } from "react-redux";
import { Loading } from "../../utils/Loading";
import { CustomButton } from "../../utils/CustomButton";
import { ErrorMessage } from "../../utils/ErrorMessage";
import { DoctorTimeSlots } from "../GeneralComponents/DoctorTimes";


const daysOptions = [
    {
        value: "monday",
        label: "Monday"
    },
    {
        value: "tuesday",
        label: "Tuesday"
    },
    {
        value: "wednesday",
        label: "Wednesday"
    },
    {
        value: "thursday",
        label: "Thursday"
    },
    {
        value: "friday",
        label: "Friday"
    },
    {
        value: "saturday",
        label: "Saturday"
    }
]


const UpdateExistingTimes = () => {
    
    const presentDay = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
    const [selectedDay, setSelectedDay] = 
    useState(
        presentDay === "sunday" ? "monday" : presentDay
    )
    const [targettedTimes, setTargettedTimes] = useState([])

    let { data, error, loading, request, setError, setData, setLoading } = useAxios()
    const 
    {
        userData
    }
    = useSelector(state => state.userReducer.userInfo)


    const fetchDoctorTimes = async () => {

        await request(`/doctors/get-doctor-times/${userData?._id}`, "get")
    }

    useEffect(() => {
        fetchDoctorTimes()
    }, [])


    useEffect(() => 
    {
        if(data)
        {

            Object.keys(data).map(key =>
            {
                
                if(key == selectedDay.toLocaleLowerCase())
                {
                    setTargettedTimes(data?.[selectedDay.toLocaleLowerCase()])
                }
            }
            )



            
        }

        
    }, [data, selectedDay])

    
    console.log(data);

    console.log("targetted times: ", targettedTimes);
    

    return (
        <div className="w-full space-y-5">

            {
                loading &&
                <Loading />
            }
            {
                error?.length > 0 &&
                (
                    <div className="flex justify-center">
                        <div>
                            <ErrorMessage message={error} />
                            <CustomButton
                                name="Reload"
                                onClick={() => fetchDoctorTimes()}
                            />
                        </div>
                    </div>
                )
            }

            {/* Header */}
            <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                    Time Management
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Manage your availability and working hours.
                </p>
            </div>

            {/* Day Selection */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm">

                    <SelectInput
                    defaultValue={selectedDay.toLowerCase()}
                    onChange={(day) => (setSelectedDay(day))}
                    options={daysOptions}
                    label={"Select Day"}
                    placeholder='Select a day for to see time slots'
                    />


            </div>

            {/* Time Slots */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

                <div className="p-4 sm:p-5 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-800">
                        Time Slots
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                        Manage availability for the selected day.
                    </p>
                </div>

                <div className="p-5">

                {
                    targettedTimes.length > 0 &&
                    <div>
                        <DoctorTimeSlots
                        day={selectedDay}
                        doctorId={userData?._id}
                        times={targettedTimes}
                        />
                    </div>
                }
                    
                </div>

            </div>

        </div>
    );
};

export  {UpdateExistingTimes};
