import React, { useEffect, useState } from "react";
import { Search, RotateCcw, SlidersHorizontal, CalendarDays, Clock3 } from "lucide-react";
import { SelectInput } from "../../utils/CustomSelectInput";
import { TextInput } from "../../utils/TextInput";

import { useSelector } from "react-redux";
import { useAxios } from "../../useAxios";
import { DoctorList } from "./DoctorList";
import { useForm } from "react-hook-form";
import { Loading } from "../../utils/Loading";
import { CustomButton } from "../../utils/CustomButton";
import { ErrorMessage } from "../../utils/ErrorMessage";
import { AppointmentCards } from "./AppointmetCards";
import { useNavigate } from "react-router-dom";
import {DateInput} from "../../utils/DateInput";

let startingDefault = new Date()
let endingDefault = new Date()
startingDefault.setDate((startingDefault.getDate() - startingDefault.getDay()) + 1)
endingDefault.setDate(startingDefault.getDate() + 5)
const paymentStatusOptions =
    [
      {
        value: " ",
        label: "For both paid and up-paid"
      },
      {
        value: "paid",
        label: "Paid"
      },
      {
        value: "pending",
        label: "pending"
      },
  ]
const treatmentStatusOptions =
    [
      {
        value: " ",
        label: "For both pending and done"
      },
      {
        value: "done",
        label: "Done"
      },
      {
        value: "pending",
        label: "Pending"
      },
  ]
const sessionOptions =
    [
      {
        value: " ",
        label: "For all sessions"
      },
      {
        value: "physio",
        label: "Physiotherapy"
      },
      {
        value: "cupping",
        label: "Cupping"
      },
      {
        value: "checkUp",
        label: "Check Up"
      },
      {
        value: "dryNeedling",
        label: "Dry-Needling"
      },
  ]
const dateFilterOptions =
    [
      {
        value: false,
        label: "Customized Date"
      },
      {
        value: true,
        label: "All Dates"
      },
  ]



const GeneralSearcher = (
  {

    showProfile = false,
    showPatientName = false,
    showEmail = false,
    showSelectDoctor = false,
    showCellNo = false,

    className = "",
  }) => {


  const [startingDate, setStartingDate] = useState(startingDefault.toLocaleDateString('en-CA'));
  const [endingDate, setEndingDate] = useState(endingDefault.toLocaleDateString('en-CA'));
  const navigate = useNavigate()
  const [dateFilterState, setDateFilterState] = useState(false)
  

  

  const { register, handleSubmit, formState: { errors } } = useForm()
  let { data, error, loading, request, setError } = useAxios()
  const 
  {
    userData,
  }
  = useSelector(state => state.userReducer.userInfo)

  const separateRequiredFields = (data = {}) => {
    const reqFiedls = {}

    Object.keys(data).map(key => {
      if (data[key]?.trim() !== "") {
        reqFiedls[key] = data[key]
      }
    }
    )

    return reqFiedls
  }



  const fetchAppointments = async (data) => {


    let targettedFields = separateRequiredFields(data)


    console.log("data: ", data, userData);

    if (userData?.role == "patient") {
      {
        if (!userData?.userProfileId) return setError("Please login your profile id is not founded")


        targettedFields =
        {
          ...targettedFields,
          userProfileId: userData?.userProfileId
        }
      }
    }


    if(userData?.role == "doctor")
    {
      targettedFields = 
      {
        ...targettedFields,
        doctor: userData?._id
      }
    }

    if(!dateFilterState)
    {
      targettedFields = 
      {
        ...targettedFields,
        starting: startingDate,
        ending: endingDate
      }
      
    }


    console.log("targettedFields: ", targettedFields);



    await request("/appointments/searcher", "post", targettedFields)



  }

  useEffect(() => {
    if (!userData?.userProfileId) {
      setError("There is no user provided");
    }
    fetchAppointments()
  }, [])



  console.log("data: ", data);



  return (
    <div>
    <section
      className={`w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
    >
      {
        loading &&
        <Loading />
      }
      

      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <SlidersHorizontal size={21} />
          </div>

          <div className="min-w-0">
            <h2 className="text-lg font-bold tracking-tight text-gray-900">
              Advanced Search
            </h2>
            <p className="mt-1 text-sm text-gray-500">
                Apply filters to find the records you need.
              </p>
            </div>
          </div>

          {
            showProfile &&
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
                  name="Profile Searcher"
                  onClick={() => navigate("/profile-searcher")}
                />
              </div>
            )
          }
        </div>

      <br />
      {/* Search Fields */}
      <div className=" border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
            <CalendarDays size={18} />
          </div>

          <div>
            <h2 className="font-semibold text-gray-900">
              Payment Period
            </h2>

            <p className="text-xs text-gray-500">
              Select dates to calculate payment records.
            </p>
          </div>
        </div>
        <div className="p-3">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            
            <DateInput
            max={endingDate}
            isDisabled={dateFilterState}
            label={"Starting Date"}
            defaultValue={startingDate}
            onChange={(date) => setStartingDate(date)}
            />
            
            <DateInput                  
            min={startingDate}
            isDisabled={dateFilterState}
            label={"Ending Date"}
            defaultValue={endingDate}
            onChange={(date) => setEndingDate(date)}
            />

          </div>

          <br />
          <div className="min-w-0">
            <SelectInput
            onChange={() => setDateFilterState(prev => !prev)}
            defaultValue={false}
            isRequired={false}
            label="Date Filters"
            name="dateFilter"
            options={dateFilterOptions}
            />
          </div>


        </div>
      </div>


      <form
        onSubmit={handleSubmit(fetchAppointments)}
        className="relative p-4 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

          {/* Patient Name */}
          {showPatientName && (
            <div className="min-w-0">

              <TextInput
                isRequired={false}
                errors={errors}
                name={"name"}
                register={register}
                lable="Patient Name"
                placeholder="Enter patient name"

              />

            </div>
          )}

          {/* Email */}
          {showEmail && (
            <div className="min-w-0">
              <TextInput
                isRequired={false}
                type="email"
                errors={errors}
                name={"email"}
                register={register}
                lable="Email"
                placeholder="Enter patient email"

              />
            </div>
          )}



          {/* Session Type */}
          <div className="min-w-0">
            <SelectInput
              isRequired={false}
              label="Session Type"
              name="forSession"
              register={register}
              error={errors}
              placeholder="Select session type"
              options={sessionOptions}
            />
          </div>

          {/* Cell Number */}
          {showCellNo && (
            <div className="min-w-0">
              <TextInput
                isRequired={false}
                errors={errors}
                name="cellNo"
                register={register}
                lable="Cell Number"
                placeholder="Enter patient phone number"
              />
            </div>
          )}

          {/* Doctor */}
          {showSelectDoctor && (
            <div className="min-w-0">
              <DoctorList
                errors={errors}
                register={register}

              />
            </div>
          )}



            <div className="min-w-0">
              <SelectInput
                isRequired={false}
                label="Treatment Status"
                name="status"
                register={register}
                error={errors}
                placeholder="Select treatment status"
                options={treatmentStatusOptions}
              />
            </div>

          {/* Payment Status */}
          
            <div className="min-w-0">
              <SelectInput
                isRequired={false}
                label="Payment Status"
                name="paymentStatus"
                register={register}
                error={errors}
                placeholder="Select payment status"
                options={paymentStatusOptions}
              />
            </div>
        </div>
        {
          error?.length > 0 &&
          <div >
            <div className="flex justify-center" >
              <div>
                <ErrorMessage
                  message={error}
                />
              </div>
            </div>
          </div>
        }
        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-end">

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
          >
            <Search size={17} />
            Search Records
          </button>
        </div>
      </form>
    </section>
    <br />

    {
      !loading && data &&
      <AppointmentCards
      isBookingButtonShow={userData?.role !== "patient" ? true : false}
      isDateShow={true}
      message="All appointments based on given fields."
      header="Targetted Appointmenst"
      isReceptionist={true}
      appointments={data}
      />
    }


    </div>
  );
};

export { GeneralSearcher };