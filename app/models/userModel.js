import mongoose from 'mongoose';

let userModelSchema= mongoose.Schema(
    {
        email:{type:String,unique:true, required:true, lowercase:true},
        otp:{type:String, required:true},
    },
    {
        timestamps:true,
        versionKey:false
    }
)
let userModel=mongoose.model('users',userModelSchema);
export default userModel;