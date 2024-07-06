import mongoose from "mongoose";

//Variable declaration
const schema = mongoose.Schema;

//Organization schema declaration
const organizationSchema = new schema({
    name:{
        type: String,
        required: true,
        unique: true
    }
})
const Organization = mongoose.model('Organization', organizationSchema);
export default Organization;