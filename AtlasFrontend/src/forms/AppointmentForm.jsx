import React, { useEffect, useState } from 'react'
import { TextInput } from '../utils/TextInput'
import { CustomButton } from '../utils/CustomButton'
import { useForm } from 'react-hook-form'
import { useAxios } from '../useAxios'
import { Loading } from '../utils/Loading'
import { ErrorMessage } from '../utils/ErrorMessage'
import { DateInput } from '../utils/DateInput'
import { useDispatch, useSelector } from 'react-redux'
import { SelectInput } from '../utils/CustomSelectInput'
import { TimeSelection } from '../utils/Times'
import { ScreenBlankError } from '../utils/ScreenBlankError'
import { useLocation } from 'react-router-dom'
import { CalendarDays, Clock3, CreditCard } from 'lucide-react'
const sessionTypes =
    [
        {
            label: "Check up",
            value: "checkUp"
        },
        {
            label: "Physiotherapy",
            value: "physiotherapy"
        },
        {
            label: "Cupping",
            value: "cupping"
        },
        {
            label: "Dry Needling",
            value: "dryNeedling"
        },
    ]

const statusOptions =
    [
        {
            label: "Pending",
            value: "pending"
        },
        {
            label: "Completed",
            value: "done"
        }
    ]

const paymentStatusOptions =
    [
        {
            label: "Pending",
            value: "pending"
        },
        {
            label: "Paid",
            value: "paid"
        }
    ]

const bookingScheduleOptions =
    [
        {
            label: "Select Booking Date(if not record appointment for current week)",
            value: true
        },
        {
            label: "Current Week",
            value: false
        }
    ]

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

function AppointmentForm(
    {
        providedDoctor,
        doctorsList = [],
    }
) {


    const RTKUser = useSelector(state => state.userReducer.userInfo)
    const role = RTKUser?.userData?.role
    const { handleSubmit, formState: { errors }, register } = useForm()
    const [selectedDoctor, setSelectedDoctor] = useState()
    const [msg, setMsg] = useState("")
    const [doctor, setDoctors] = useState([])
    const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"))
    const [doctorId, setDoctorId] = useState(null)
    const [times, setTimes] = useState({})
    const [bookingByDate, setBookingByDate] = useState(false)
    let { data, error, loading, request, setError } = useAxios()
    const [selectedDay, setSelectedDay] = useState(new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase())
    const { state } = useLocation()


    const givenDoctor = providedDoctor || state?.doctorId

    console.log("state: ", state);


    const removeMsg = () => {
        setTimeout(() => {
            setMsg("")
        }, 500);
    }

    const setTime = (doctor) => {

        const targettedTimes = doctorsList.filter(doc => doc?._id == doctor)



        setDoctorId(targettedTimes?.[0]?._id)
        setTimes(targettedTimes?.[0]?.doctorField?.times)

    }

    const bookTime = async (formData) => {
        const profileId = role == "patient" ? RTKUser?.userData?.userProfileId : state?.profileId

        console.log("formData: ", formData);




        if (!profileId) {
            setError("Please provide user profile id")
            return;
        }
        if (
            [
                doctorId,
                formData?.["patientName"],
                formData?.["cellNo"],
            ].some(field => !field || field?.trim() == "")
        ) {
            setError("Please provide all required fields without extra blank spaces")
            return;
        }

        if (bookingByDate) {
            if (!date) {
                setError("Please select a valid date")
                return;
            }
        }
        else {
            if (!formData?.["day"] && !formData?.["time"]) {
                setError("Please select a day and a time to book appointment")
                return;
            }
        }

        formData =
        {
            ...formData,
            doctor: doctorId,
            date: new Date(date),
            profileId: profileId,
            isForRecord: bookingByDate

        }

        console.log("formData: ", formData);



        await request("/appointments/add-appointment", "post", formData)



    }



    useEffect(() => {
        if (!(doctor.length > 0)) {
            const readyDoctors = doctorsList.map(doc => ({ value: doc?._id, label: doc?.fullName }))
            setDoctors(readyDoctors)

            setSelectedDoctor(givenDoctor || readyDoctors?.[0]?.value)

        }
        setTime(selectedDoctor)

        if (new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase() == "sunday" && !state?.day) {
            setSelectedDay("monday")
        }

    }, [doctorsList, selectedDoctor])


    useEffect(() => {

        let presentDate = new Date()

        const daysNumbers =
        {
            "monday": 1,
            "tuesday": 2,
            "wednesday": 3,
            "thursday": 4,
            "friday": 5,
            "saturday": 6,
        }

        let difference = daysNumbers[selectedDay.toLocaleLowerCase()] - presentDate.getDay()



        presentDate.setDate(presentDate.getDate() + difference)



        setDate(presentDate.toLocaleDateString("en-CA"))

    }, [selectedDay])

    useEffect(() => {

        if (data?._id?.length > 0) {
            setMsg("Successfully booked appointment")
            removeMsg()


        }


    }, [data])








    return (
        <div className='relative'>
            {
                msg.length > 0 &&
                <ScreenBlankError
                    msg={msg}
                />
            }
            <form
                className='relative'
                onSubmit={handleSubmit(bookTime)}>
                {
                    loading &&
                    (<Loading />)
                }

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
                    <TextInput
                        defaultValue={state?.fullName || (role == "patient" ? RTKUser?.userData?.fullName : "")}
                        errors={errors}
                        name={"patientName"}
                        register={register}
                        lable='Patient Name'
                        placeholder="Enter patient's name"
                    />

                    <br />

                    <TextInput
                        defaultValue={state?.email || (role == "patient" ? RTKUser?.userData?.email : "")}
                        errors={errors}
                        name={"email"}
                        isRequired={false}
                        register={register}
                        lable='Email'
                        placeholder="Enter patient's email"
                    />
                    <br />

                    <TextInput
                        defaultValue={state?.cellNo || (role == "patient" ? RTKUser?.userData?.cellNo : "")}
                        errors={errors}
                        name={"cellNo"}
                        register={register}
                        lable='Phone Number'
                        placeholder="Enter patient's phone number"
                    />
                    <br />

                    <TextInput
                        defaultValue={state?.diagnoses}
                        isRequired={false}
                        errors={errors}
                        name={"diagnoses"}
                        register={register}
                        lable='Diagnoses'
                        placeholder="Briefly describe problem or diseases of patient"
                    />
                    <br />


                    <SelectInput
                        defaultValue={state?.forSession || sessionTypes[0]?.value}
                        options={sessionTypes}
                        error={errors}
                        label={"Select Session Type"}
                        name={"forSession"}
                        register={register}
                        placeholder='Select a session type for treatement'
                    />

                    <br />

                    {
                        doctor?.length > 0 &&
                        <SelectInput
                            defaultValue={givenDoctor || doctor?.[0]?.value}
                            onChange={(doc) => (setSelectedDoctor(doc))}
                            options={doctor}
                            error={errors}
                            label={"Select Doctor"}
                            name={"doctor"}
                            register={register}
                            placeholder='Select a doctor for your treatment'
                        />
                    }

                </section>

                <br />

                {
                    RTKUser?.userData?.role !== "patient" &&
                    (
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
                            <div>
                                <TextInput
                                    type='Number'
                                    defaultValue={state?.payable || 1000}
                                    isRequired={false}
                                    errors={errors}
                                    name={"payable"}
                                    register={register}
                                    lable='Payable Amount'
                                    placeholder="Enter payable amount"
                                />
                                <br />

                                <TextInput
                                    defaultValue={state?.paid}
                                    type='Number'
                                    isRequired={false}
                                    errors={errors}
                                    name={"paid"}
                                    register={register}
                                    lable='Paid Amount'
                                    placeholder="Enter paid amount"
                                />
                                <br />


                                <SelectInput
                                    defaultValue={state?.paymentStatus || 'pending'}
                                    options={paymentStatusOptions}
                                    error={errors}
                                    label={"Payment Status"}
                                    name={"paymentStatus"}
                                    register={register}
                                    placeholder='Select if patient payment pending or paid'
                                />
                                <br />

                                <SelectInput
                                    defaultValue={state?.treatmentStatus || 'pending'}
                                    options={statusOptions}
                                    error={errors}
                                    label={"Appointment Status"}
                                    name={"status"}
                                    register={register}
                                    placeholder='Select an appointment status'
                                />
                                <br />
                            </div>
                        </section>
                    )
                }

                <br />



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
                    <div>

                        {
                            RTKUser?.userData?.role !== "patient" &&
                            (
                                <div>
                                    <SelectInput
                                        defaultValue={bookingByDate}
                                        onChange={() => (setBookingByDate(prev => !prev))}
                                        options={bookingScheduleOptions}
                                        error={errors}
                                        label={"Booking Schedule"}
                                        name={"bookingSchedule"}
                                        register={register}
                                        placeholder='Select a booking date according to your need'
                                    />
                                    <br />
                                </div>
                            )
                        }


                        {
                            RTKUser?.userData?.role !== "patinet"
                                ? !bookingByDate ?
                                    <SelectInput
                                        defaultValue={state?.day || selectedDay.toLowerCase()}
                                        onChange={(day) => (setSelectedDay(day))}
                                        options={daysOptions}
                                        error={errors}
                                        label={"Select Day"}
                                        name={"day"}
                                        register={register}
                                        placeholder='Select a day for your treatment'
                                    />
                                    :
                                    <div>
                                        <DateInput
                                            errors={errors}
                                            label={"Select Date"}
                                            defaultValue={date}
                                            onChange={(val) => setDate(val)}

                                        />
                                        <br />
                                        <div>
                                            <TextInput
                                                errors={errors}
                                                register={register}
                                                defaultValue='05:00:PM'
                                                isRequired={true}
                                                lable='Time'
                                                placeholder='Please enter time according to time format of all appointments'
                                                name={"time"}
                                            />
                                        </div>
                                    </div>
                                :
                                <SelectInput
                                    defaultValue={state?.day || selectedDay.toLowerCase()}
                                    onChange={(day) => (setSelectedDay(day))}
                                    options={daysOptions}
                                    error={errors}
                                    label={"Select Day"}
                                    name={"day"}
                                    register={register}
                                    placeholder='Select a day for your treatment'
                                />
                        }


                        <br />


                        {
                            !bookingByDate &&
                            <TimeSelection
                                defaultTime={state?.time}
                                date={new Date(date).toLocaleDateString("en-US", { dateStyle: "medium" })}
                                errors={errors}
                                name='time'
                                register={register}
                                selectedDay={selectedDay}
                                times={times}

                            />
                        }

                    </div>

                </section>

                <br />





                <div className='flex mt-5 justify-end'>
                    <div className='w-1/2'>
                        <CustomButton
                            name={'Book'}
                            type='submit'

                        />
                    </div>
                </div>

                <br />
                {
                    error?.length > 0 &&
                    <ErrorMessage message={error} />
                }

            </form>
        </div>
    )
}

export { AppointmentForm }