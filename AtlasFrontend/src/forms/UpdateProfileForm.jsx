import React, { useEffect, useState } from 'react'
import {TextInput} from '../utils/TextInput'
import {PasswordInput} from '../utils/PasswordInput'
import { ImageInput } from '../utils/ImageInput'
import {CustomButton} from '../utils/CustomButton'
import { useForm } from 'react-hook-form'
import { useAxios } from '../useAxios'
import { useDispatch, useSelector } from 'react-redux'
import { setUserInfo } from '../Redux/userSlice'
import {Loading} from '../utils/Loading'
import { ErrorMessage } from '../utils/ErrorMessage'

function UpdateProfileForm(
    {
        currentEmail = "",
        currentFullName = "",
        currentAddress = "",
        currentAvatar = "",
        currentPhoneNo = ""
    }
) {

    const { handleSubmit, formState: { errors }, register } = useForm()
    const dispatch = useDispatch()
    let { data, error, loading, request, setData, setError } = useAxios()

    const removeError = () => {
        setTimeout(() => {
            setError("")
        }, 2500);
    }

    const updateProfile = async (data) => {

        if (
            [
                data?.["fullName"],
                data?.["email"],
                data?.["address"],
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


        const formData = new FormData()

        formData.append("fullName", data["fullName"])
        formData.append("email", data["email"])
        formData.append("address", data["address"])
        formData.append("cellNo", data["cellNo"])
        formData.append("avatar", data?.["avatar"]?.[0])



        await request("/users/update-account-details", "patch", formData)


    }


    useEffect(() => {
        if (!loading && data?.user?._id) {
            dispatch(setUserInfo(
                {
                    isLoadingUser: false,
                    isAuthorized: true,
                    userData: {...data?.user, userProfileId: data?.userProfileId},
                }))
        }
    }, [data, error, loading])



    return (
        <form
            onSubmit={handleSubmit(updateProfile)}>

            {/* Important: connect these fields with react-hook-form later */}
            {
                loading &&
                (<Loading />)
            }


            <TextInput
                defaultValue={currentFullName}
                errors={errors}
                name={"fullName"}
                register={register}
                lable='Full Name'
                placeholder='Enter your full name'
            />

            <br />
            <TextInput
                defaultValue={currentEmail}
                errors={errors}
                name={"email"}
                register={register}
                lable='Email Address'
                placeholder='you@example.com'
            />

            <br />
            <TextInput
                defaultValue={currentAddress}
                errors={errors}
                name={"address"}
                register={register}
                lable='Home Address'
                placeholder='home, street, colony, city'
            />

            <br />
            <TextInput
                defaultValue={currentPhoneNo}
                errors={errors}
                name={"cellNo"}
                register={register}
                lable='Phone Number'
                placeholder='03XX XXXXXXX'
            />

            <br />
            <ImageInput
                defaultImageSrc={currentAvatar}
                errors={errors}
                name={"avatar"}
                register={register}
                label='Profile Photo'
                message='Add a photo to personalize your profile'
                refrence='Upload your profile picture'

            />


            <br />

            <div className='flex justify-end gap-10'>
                
                <CustomButton
                    name='Save Changes'
                    type='submit'

                />

                <br />
                {
                    error?.length > 0 &&
                    <ErrorMessage message={error} />
                }
            </div>

        </form>
    )
}

export { UpdateProfileForm }