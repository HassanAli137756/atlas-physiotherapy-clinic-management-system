
import mongoose, {Schema} from 'mongoose'

const packageSchema = new Schema(
{
    userProfile:
    {
        type: mongoose.Types.ObjectId,
        ref: "Profile",
        required: true
    },
    doctor:
    {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    payable:
    {
        type: Number,
        default: 5500,
        required: true,
    },
    payments:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: "Payment",
        }
    ],
    paymentStatus:
    {
        type: String,
        enum: ["pending", "paid", "partial"],
        default: "pending",
        required: true
    },
    appointments:
    [
        {
            type: mongoose.Types.ObjectId,
            ref: "Appointment",
        }
    ],
    packageStatus:
    {
        type: String,
        enum: ["pending", "completed"],
        default: "pending",
        required: true
    },
    totalSessions:
    {
        type: Number,
        default: 6,
        required: true
    },
    doneSessions:
    {
        type: Number,
        default: 0,
        required: true
    },
    startingDate:
    {
        type: Date,
        default: new Date(),
        required: true
    },
    endingDate:
    {
        type: Date,
    },
    forSession:
    {
        type: String,
        enum: ["physiotherapy", "cupping", "dryNeedling"],
        default: "physiotherapy",
        required: true
    },
},
{
    timestamps: true
}
)


export const Package = mongoose.model("Package", packageSchema)