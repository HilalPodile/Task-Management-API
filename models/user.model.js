import mongoose from "mongoose";

//Variable declaration
const schema = mongoose.Schema;

//Creating user schema
const userSchema = new schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ["Admin", "Manager", "User"],
        default: "User"
    },
    organizationId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }
})

const User = mongoose.model('User', userSchema);
export default User;