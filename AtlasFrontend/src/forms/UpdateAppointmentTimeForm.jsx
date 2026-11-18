import React, { useEffect, useState } from 'react'
import { TextInput } from '../utils/TextInput'
import { CustomButton } from '../utils/CustomButton'
import { useForm } from 'react-hook-form'
import { useAxios } from '../useAxios'
import { Loading } from '../utils/Loading'
import { ErrorMessage } from '../utils/ErrorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { SelectInput } from '../utils/CustomSelectInput'
import { ScreenBlankError } from '../utils/ScreenBlankError'
import { useNavigate } from 'react-router-dom'
import { Clock3 } from 'lucide-react'


function UpdateAppointmentTimeForm(
    {
        appointmentDetails = {},
        doctorList = [],
    }
) {

    console.log("doctorList", doctorList, appointmentDetails);
    

    const { handleSubmit, formState: { errors }, register } = useForm();
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();
    let { data, error, loading, request, setError, setData, setLoading } = useAxios();

    const removeMsg = (isNavigate) => {
        setTimeout(() => {
            setMsg("");
            isNavigate ? navigate("/searcher") : null;
        }, 500);
    }

    const updateAppointment = async (formData) => {

        console.log("appointmentDetails: ", appointmentDetails);

        console.log("formData: ", formData);


        if (!appointmentDetails?.appointmentId) {
            setError("Appointment id is not provided")
            return;
        }

        if (!formData?.["time"] || !formData?.["date"]) {
            setError("Please provide a valid time and date for appointment");
            return;
        }

        formData =
        {
            ...formData,
            appointmentId: appointmentDetails?.appointmentId

        }


        console.log("formData: ", formData);



        await request("/appointments/update-appointment-times", "patch", formData)



    }



    useEffect(() => {

        if (data?._id?.length > 0) {
            setMsg("Appointment has updated successfully")
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
                onSubmit={handleSubmit(updateAppointment)}>
                {
                    loading &&
                    (<Loading />)
                }

                <TextInput
                    defaultValue={appointmentDetails?.time}
                    errors={errors}
                    name={"time"}
                    register={register}
                    lable='Time'
                    placeholder="Enter time in format XX:XX:PM"
                />

                <br />

                 <div>
              <label className="p-2 block text-sm font-medium text-gray-700">
                <div className='flex justify-start'>
                    <div>
                        Select Date
                    </div>
                </div>

                <div className="relative">
                  <Clock3
                    size={17}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="date"
                    defaultValue={new Date(appointmentDetails?.date).toLocaleDateString("en-CA")}
                    {...register("date", {required: true})}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm text-gray-700 outline-none transition hover:border-emerald-400 hover:bg-white hover:ring-2 hover:ring-emerald-100"
                  />
                </div>
              </label>
            </div>

                <br />


                <SelectInput
                    defaultValue={appointmentDetails?.doctor}
                    options={doctorList}
                    error={errors}
                    label={"Select Doctor"}
                    name={"doctor"}
                    register={register}
                    placeholder='Select a doctor for treatement'
                />


                <br />



                <div className='flex mt-5 justify-end'>
                    <div className='w-1/2'>
                        <CustomButton
                            name={"Save Changes"}
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

export { UpdateAppointmentTimeForm }