import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import { sendEmail } from "../utility/emailHelper.js";
import { TokenEncode } from "../utility/tokenHelper.js";
import userProfileModel from "../models/userProfileModel.js";
let objectId =  mongoose.Types.ObjectId;


export const UserOtp =async (req) => {
    try {

        let otp=Math.floor(100000 + Math.random() * 900000);
        let email=req.params.email;
        // now we send email otp code 
        let to=email;
        let subject="IC Solution BD";
        let text="Your OTP code is "+otp;
        // give me fancy html and css code 
        let html=`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .otp {
            font-size: 24px;
            color: #333333;
            text-align: center;
            margin: 20px 0;
        }
        .footer {
            font-size: 12px;
            color: #777777;
            text-align: center;
            margin-top: 30px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>OTP Verification</h2>
        <p>Please use the following OTP to complete your login:</p>
        <div class="otp">${otp}</div>
        <p>If you did not request this, please ignore this email.</p>
    </div>
    <div class="footer">
        © 2023 IC Solution BD. All rights reserved.
    </div>
</body>
        </html>`

        await sendEmail(to,subject,text,html);
        let data= await userModel.findOneAndUpdate({email:email},{otp:otp},{upsert:true,new:true});
        return {status:200,data:data,message:"Otp send successfully"}
    } catch (error) {

    }
}


export const UserLoginVerify =async (req) => {
    try {
        
        let email=req.params.email;
        let otp=req.params.otp;
        let user=await userModel.findOne({email:email,otp:otp});
        if(user)
        {
            let userID=user._id;
            let token=TokenEncode(email,userID.toString());
            await userModel.findOneAndUpdate({email:email},{otp:""})
            
            return {status:true,token:token,message:"Otp verified successfully"}
        }
        else{
            return {status:false,message:"Otp not verified"}
        }
    } catch (error) {
         return {status:false,message:error.message}    
    }
}




export const singleUserProfileReadAndUpdateServices = async(req) => {
    try {
        let userID=req.headers.user_id;
        let reqBody=req.body;
        reqBody.userID=userID;
        let data =await userProfileModel.findOneAndUpdate({userID:userID},reqBody,{upsert:true,new:true});
        return {status:200,data:data,message:"Data updated successfully"}
    } catch (error) {
        return {status:400,message:error.message}
    }
}

export const SingleUserProfileRead=async(req)=>{
    try {
        let userID=req.headers.user_id;
        let data =await userProfileModel.findOne({userID:userID});
        return {status:200,data:data,message:"Data read successfully"}
    } catch (error) {
        return {status:400,message:error.message}
    }
}

export const AllUserProfileReadServices = async(req) => {
    try {
            let data =await userProfileModel.find();
            return {status:200,data:data,message:"Data read successfully"}
    } catch (error) {
        return {status:400,message:error.message}
    }
}

export const DeleteSingleUserServices = async (req) => {
    try {
        let userID=new objectId(req.params.id);
        
        let data = await userProfileModel.findOneAndDelete({userID:userID});
        let data2 = await userModel.findOneAndDelete({_id:userID});

        return {status:200,data:{data,data2},message:"Data deleted successfully"}

    } catch (error) {
        return {status:400,message:error.message}
    }
}
