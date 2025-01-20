import mongoose from "mongoose";


let userProfile= mongoose.Schema(
    {
        userID:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required:true
        },
        firstName:{
            type:String,
        },
        lastName:{
            type:String,
        },
        NIDNumber:{
            type:String,
        },
        phoneNumber:{
            type:String,
        },
        password:{
            type:String,
        },
        bloodGroup:{
            type:String,
        },

    },
    {
        timestamps:true,
        versionKey:false
    }
)

let userProfileModel=mongoose.model("userprofile",userProfile)
export default userProfileModel;