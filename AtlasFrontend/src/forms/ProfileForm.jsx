import React, { useEffect, useState } from 'react'
import { TextInput } from '../utils/TextInput'
import { CustomButton } from '../utils/CustomButton'
import { useForm } from 'react-hook-form'
import { Loading } from '../utils/Loading'
import { useAxios } from '../useAxios'
import { ErrorMessage } from '../utils/ErrorMessage'
import { useNavigate } from 'react-router-dom'
import { ScreenBlankError } from '../utils/ScreenBlankError'

function ProfileForm() {

    const { handleSubmit, formState: { errors }, register } = useForm()
    let { data, error, loading, request, setData, setError } = useAxios()
    const navigate = useNavigate()
    const [msg, setMsg] = useState("")


    const removeMsg = (isNavigate=false) => {
        setTimeout(() => {
            setMsg("")


            if (isNavigate) {
                navigate("/book-appointment",
                    {
                        state:
                        {
                                profileId: data?._id,
                                fullName: data?.name,
                                cellNo: data?.cellNo
                        }
                    })

            }

        }, 1200);
    }


    
    const createProfile = async (data) => {
        console.log("data: ", data?.["patientName"]);

        if (
            [
                data?.["patientName"],
                data?.["cellNo"],
            ].some(field => !field || field?.trim() == "")
        ) {
            setError("Please provide all fields without extra blank spaces")
            return;
        }

        if (data?.["cellNo"].replace("-", "")?.length <= 10) {
            setError("Phone enter a corret Pakistani phone number")
            return;
        }

        await request("/users/create-user-profile", "post", data)


    }


    useEffect(() => {
        if (!loading && data?._id) {
            setMsg("Profile has created, navigating to appointment form")
            removeMsg(true)
        }
    }, [data, error, loading])


    return (
        <form
            onSubmit={handleSubmit(createProfile)}
        >

            {
                loading &&
                (<Loading />)
            }

            {
                msg &&
                (<ScreenBlankError msg={msg} />)
            }


            <TextInput
                errors={errors}
                name={"patientName"}
                register={register}
                lable='Patient Name'
                placeholder='Enter patient name'
            />

            <TextInput
                errors={errors}
                name={"cellNo"}
                register={register}
                lable='Phone Number'
                placeholder='03XX XXXXXXX'
            />

            <br />

            <CustomButton
                name='Create Profile'
                type='submit'

            />

            <br />
            {
                error?.length > 0 &&
                <ErrorMessage message={error} />
            }

        </form>
    )
}

export { ProfileForm }