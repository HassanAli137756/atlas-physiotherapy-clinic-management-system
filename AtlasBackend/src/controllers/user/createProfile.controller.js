import { Profile } from '../../models/Profile.model.js'
import { User } from '../../models/User.model.js'
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'



const createProfile = asyncHandler(async (req, res) => {
    const patientName = req.body?.patientName
    const cellNo = req.body?.cellNo

    if (!patientName?.trim() || !cellNo?.trim()) {
        throw new APIError(400, "Please provide patient name and cell number")
    }


    const DBProfile = await Profile.findOne(
        {
            $or: [{cellNo: cellNo?.replace("-", "")}]
        }
    )

    if (DBProfile?._id) {
        throw new APIError(404, "Profile with given number is already existed")
    }

    const newProfile = await Profile.create(
    {
        name: patientName,
        cellNo: cellNo?.replace("-", "")
    }
    )



    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully created profile", newProfile)
        )



})

export { createProfile }