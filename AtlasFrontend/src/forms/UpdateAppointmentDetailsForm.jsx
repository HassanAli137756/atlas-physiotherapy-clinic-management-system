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


function UpdateAppointmentDetailsForm(
    {
        appointmentDetails = {},
    }
) {


    const RTKUser = useSelector(state => state.userReducer.userInfo);
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

        if (!appointmentDetails?.appointmentId) {
            setError("Appointment id is not provided")
            return;
        }

        if (
            [
                formData?.["patientName"],
                formData?.["cellNo"],
            ].some(field => !field || field?.trim() == "")
        ) {
            setError("Please provide patient's name and cell number");
            return;
        }

        formData =
        {
            ...formData,
            appointmentId: appointmentDetails?.appointmentId

        }


        console.log("formData: ", formData);



        await request("/appointments/update-appointment-details", "patch", formData)



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
                    defaultValue={appointmentDetails?.fullName}
                    errors={errors}
                    name={"patientName"}
                    register={register}
                    lable='Patient Name'
                    placeholder="Enter patient's name"
                />

                <br />

                <TextInput
                    defaultValue={appointmentDetails?.email}
                    errors={errors}
                    name={"email"}
                    isRequired={false}
                    register={register}
                    lable='Email'
                    placeholder="Enter patient's email"
                />
                <br />

                <TextInput
                    defaultValue={appointmentDetails?.cellNo}
                    errors={errors}
                    name={"cellNo"}
                    register={register}
                    lable='Phone Number'
                    placeholder="Enter patient's phone number"
                />
                <br />

                <TextInput
                    defaultValue={appointmentDetails?.diagnoses}
                    isRequired={false}
                    errors={errors}
                    name={"diagnoses"}
                    register={register}
                    lable='Diagnoses'
                    placeholder="Briefly describe problem or diseases of patient"
                />
                <br />

                {
                    RTKUser?.userData?.role !== "patient" &&
                    (
                        <div>
                            <TextInput
                                type='Number'
                                defaultValue={appointmentDetails?.payable || 1000}
                                isRequired={false}
                                errors={errors}
                                name={"payable"}
                                register={register}
                                lable='Payable Amount'
                                placeholder="Enter payable amount"
                            />
                            <br />

                            <TextInput
                                defaultValue={appointmentDetails?.paid}
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
                                defaultValue={appointmentDetails?.paymentStatus}
                                options={paymentStatusOptions}
                                error={errors}
                                label={"Payment Status"}
                                name={"paymentStatus"}
                                register={register}
                                placeholder='Select if patient payment pending or paid'
                            />
                            <br />

                            <SelectInput
                                defaultValue={appointmentDetails?.treatmentStatus || 'pending'}
                                options={statusOptions}
                                error={errors}
                                label={"Appointment Status"}
                                name={"treatmentStatus"}
                                register={register}
                                placeholder='Select an appointment status'
                            />
                            <br />
                        </div>
                    )
                }


                <SelectInput
                    defaultValue={appointmentDetails?.forSession || sessionTypes[0]?.value}
                    options={sessionTypes}
                    error={errors}
                    label={"Select Session Type"}
                    name={"forSession"}
                    register={register}
                    placeholder='Select a session type for treatement'
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

export { UpdateAppointmentDetailsForm }