import { Appointment } from "../../models/Appointment.model.js";
import { Profile } from "../../models/Profile.model.js";
import { User } from "../../models/User.model.js";
import {APIError} from '../../utils/apiError.js'
import {APIResponse} from '../../utils/apiResponse.js'
import {asyncHandler} from '../../utils/asyncHander.js'

const profileSearcher = asyncHandler( async (req, res) =>
{
    const name = req?.body?.name
    const cellNo= req?.body?.cellNo

    
    if (!name && !cellNo) {
        throw new APIError(400, "Please provide one of field from name and email")
    }



    const options = {}

    if(name?.length > 0)
    {
        options.name = {$regex: name, $options: "i"}
    }

    if(cellNo?.length > 0)
    {
        options.cellNo = cellNo
    }


    const targettedProfiles = await Profile
    .find(options)
    .populate("patientAccount", "avatar fullName email")
    
    return res
    .status(200)
    .json(
        new APIResponse(200, "Successfully fetched targetted appointments", targettedProfiles)
    )

})

export {profileSearcher}