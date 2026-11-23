import React, {useEffect} from 'react'
import { CustomButton } from '../../utils/CustomButton'
import { Loading } from '../../utils/Loading'
import { useAxios } from '../../useAxios'
import { ScreenBlankError } from '../../utils/ScreenBlankError'
import { useNavigate } from 'react-router-dom'

function DeleteDoctorTime(
{
    time="",
    day="",
    doctorId="",
}
) 
{

    

    let { data, error, loading, request, setError, setData, setLoading } = useAxios()
    const navigate = useNavigate()

    const removeMsg = (updateState=false) =>
    {
        setTimeout(() => {

            if (updateState) {
                navigate("/doctor-time-management")
                return;
            }
            
            setError("")

        }, 1500);
    }   


    const deleteTime = () =>
    {
        if(!(doctorId || time || day))
        {
            setError("Please provide all required fields")
            return;
        }

        request("/doctors/delete-time", "patch",
            {
                deletingTime: time,
                day,
                doctorId
            }
        )

    }


    
    useEffect(() => 
    {

        if(!loading && data)
        {
            setError("Time deleted Successfully")
            removeMsg(true)
        }
        else if(!loading)
        {
            removeMsg()
        }


    }, [data, loading]);



    return (
        <div>
            {
                loading &&
                (
                    <Loading />
                )
            }

            {
                error?.length > 0 &&
                (
                    
                        <div>
                            <ScreenBlankError
                                msg={error}
                            />
                            
                        </div>
                   
                )
            }
            <CustomButton
            onClick={() => deleteTime()}
            classes="
            flex-1
            rounded-lg
            border
            border-red-200
            w-full
            bg-red-50
            px-4
            py-2
            text-sm
            font-semibold
            text-red-600
            transition
            hover:border-red-300
            hover:bg-red-100"
            isAllowedDefaultClasses={false}
            name="Delete"
        />
    </div>
    )
}

export { DeleteDoctorTime }