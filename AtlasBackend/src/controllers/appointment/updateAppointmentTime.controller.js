import { Appointment } from "../../models/Appointment.model.js";
import { APIError } from '../../utils/apiError.js'
import { APIResponse } from '../../utils/apiResponse.js'
import { asyncHandler } from '../../utils/asyncHander.js'



const updateAppointmentTime = asyncHandler(async (req, res) => {
    const time = req?.body?.time
    const date = req?.body?.date
    const appointmentId = req?.body?.appointmentId


    const requester = req.user

    console.log("Body: ", req.body);


    if (!appointmentId) {
        throw new APIError(400, "Appointment refrence is not provided")
    }


    if (!requester?._id) {
        throw new APIError(401, "User is not authorized to perform this action")
    }




    if (!time || !date) {
        throw new APIError(401, "Please provide both time and date field to update")
    }




    const appointment = await Appointment.findById(appointmentId).populate("userProfileId")



    if (!appointment?._id) {
        throw new APIError(404, "Appointment is not exist")
    }


    if (requester?.role == "patient") {
        throw new APIError(401, `You are not allowed to update this appointment`)
    }





    appointment.times.time = time
    appointment.times.date = date



    await appointment.save({ validateBeforSave: false })



    return res
        .status(200)
        .json(
            new APIResponse(200, "Successfully updated appointment", appointment)
        )




})

export { updateAppointmentTime }