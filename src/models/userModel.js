import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Must provide a username."],
        unique: [true, "Username must be unique."],
    },
    email: {
        type: String,
        required: [true, "Must provide an email."],
        unique: [true, "Email must be unique."],
    },
    password: {
        type: String,
        required: [true, "Must provide a password."],
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
