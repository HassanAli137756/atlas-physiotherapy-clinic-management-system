import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'


const updateTimeStatus = asyncHandler( async (req, res) =>
{
    const user = req.user
    const 
    {
        updatingTime,
        day,
        doctorId
    } = req.body
    

    if(!updatingTime?.length > 0 || !day?.trim().length > 0 || !doctorId)
    {
        throw new APIError(403, "Please provide all required fields")
    }
    
    const DBDoctor = await User.findById(doctorId).select("-password -refreshToken -receptionistField -doctorField.onDuty -avatarPublicID")
    
    if(!DBDoctor._id)
    {
        throw new APIError(403, "Failed to find doctor from database")
    }

    if (
        [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
        ].every(field => field !== day?.toLowerCase())
    ) {
        throw new APIError(400, "Please provide correct day")
    }

    const targettedTimes = DBDoctor.doctorField.times?.[day.toLowerCase()] || []


    targettedTimes.map(DBtime =>
    {
        updatingTime.map(givenTime =>
        {
            if (DBtime.time === givenTime.time) {
                if(!(DBtime.availability === givenTime.availability))
                {
                    throw new APIError(400, "A time has recently booked by an user, please refresh your page and then try again")
                }
            }
        }
        )
    }
    )


    DBDoctor.doctorField.times[day.toLowerCase()] = updatingTime


    await DBDoctor.save({validateBeforeSave: false})


    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully update status of given time", DBDoctor)
    )


})


export {updateTimeStatus}





