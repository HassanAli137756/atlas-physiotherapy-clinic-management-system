import React from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { TextInput } from "../utils/TextInput";

import { useAxios } from "../useAxios";
import { useForm } from "react-hook-form";
import { Loading } from "../utils/Loading";
import { ErrorMessage } from "../utils/ErrorMessage";
import { ProfileCards } from "./GeneralComponents/ProfileCards";
import { useNavigate } from "react-router-dom";


const ProfileSearcher = () => {


    const navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm()
    let { data, error, loading, request, setError } = useAxios()
    

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



    const fetchProfiles = async (data) => {


        let targettedFields = separateRequiredFields(data)


        console.log("data: ", data);

        console.log("targettedFields: ", targettedFields);

        if(Object.keys(targettedFields).length > 0)
        {
            await request("/users/profile-searcher", "post", targettedFields)
        }



    }


    console.log("data: ", data);



return (
<div>
    <section
        className={`w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm`}
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
                        Profile Searching
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Apply filters to find the profile you need.
                    </p>
                </div>
            </div>

        </div>

        <br />


        <form
            onSubmit={handleSubmit(fetchProfiles)}
            className="relative p-4 sm:p-6"
        >
            <div className="grid grid-cols-1 gap-4 ">

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

            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:items-center sm:justify-end">

          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 sm:w-auto"
          >
            <Search size={17} />
            Search Profile
          </button>
        </div>


        </form>
    </section>
    <br />

    {
        !loading && data &&
        <ProfileCards
        header="Founded Profiles"
        message="All matched profiles with your given filters"
        profiles={data}
        />
    }


</div>
);
};

export { ProfileSearcher };