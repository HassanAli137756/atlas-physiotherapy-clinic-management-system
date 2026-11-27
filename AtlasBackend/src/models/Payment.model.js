
import mongoose, {Schema} from 'mongoose'

const paymentSchema = new Schema(
{
    appointmentId:
    {
        type: mongoose.Types.ObjectId,
        ref: "Appointment",
        required: true,
    },
    packageId:
    {
        type: mongoose.Types.ObjectId,
        ref: "Package",
    },
    isPackagePayment:
    {
        type: Boolean,
        default: false,
        required: true
    },
    forSession:
    {
        type: String,
        enum: ["cupping", "physiotherapy", "dryNeedling", "checkUp"],
    },
    doctor:
    {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    paymentStatus:
    {
        type: String,
        enum: ["pending", "paid"],
        default: "pending",
        required: true
    },
    payable:
    {
        type: Number,
        default: 1000,
    },
    paid:
    {
        type: Number,
        default: 0,
    },
    paymentDate:
    {
        type: Date,
        required: true
    },
    demandingDate:
    {
        type: Date,
        default: new Date(),
        required: true,
    }
},
{
    timestamps: true
}
)


export const Payment = mongoose.model("Payment", paymentSchema)