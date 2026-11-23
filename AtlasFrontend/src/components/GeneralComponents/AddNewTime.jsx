
import React, { useEffect, useState } from "react";
import { SelectInput } from "../../utils/CustomSelectInput";
import { useAxios } from "../../useAxios";
import { useSelector } from "react-redux";
import { Loading } from "../../utils/Loading";
import { CustomButton } from "../../utils/CustomButton";
import { ErrorMessage } from "../../utils/ErrorMessage";
import { AddNewTimeForm } from "./AddNewTimeForm";


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


const AddNewTime = () => {

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


    useEffect(() => {
        if (data) {

            Object.keys(data).map(key => {

                if (key == selectedDay.toLocaleLowerCase()) {
                    setTargettedTimes(data?.[selectedDay.toLocaleLowerCase()])
                }
            }
            )




        }


    }, [data, selectedDay])





    return (
        <div  className="min-h-screen bg-[#f4f8f7] p-4 sm:p-6 lg:p-8">

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
            <div className="mb-6">


                <h1 className="text-2xl font-bold text-gray-900">
                    Add New Time
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Add a new available appointment time to your schedule.
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
            <br />

            {/* Time Slots */}
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">


                <div className="p-5">

                        <div>
                            <AddNewTimeForm
                            day={selectedDay.toLocaleLowerCase()}
                            doctorId={userData?._id}
                            providedTimes={targettedTimes}
                            />
                        </div>
                </div>

            </div>
            

        </div>
    );
};

export { AddNewTime };

