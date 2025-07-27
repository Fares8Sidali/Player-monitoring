import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const userschema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
    },
    fullname: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'player'],
        default: 'player',
    },
    profilepic: {
        type: String,
        required: false,
    },
    goals: {
        type: Number,
        default: 0,
    },
    assists: {
        type: Number,
        default: 0,
    },
    apperance: {
        type: Number,
        default: 0,
    },
    contre: {
        type: Number,
        default: 0,
    },
    avrg: {
        type: Number,
        default: 0,
    },
},
    { timestamps: true }
)
const User = mongoose.models.Users || mongoose.model("Users", userschema)

export default User