import * as UserServices from "../services/userServices.js"

export const userOtp=async(req,res)=>{
   let result=await UserServices.UserOtp(req)
   res.status(result.status).json(result)
}

export const UserLoginVerify=async(req,res)=>{
    let result=await UserServices.UserLoginVerify(req)
    if(result.status)
    {       
        let token=result.token;
        let cookieOptions={
            expires:new Date(Date.now()+24*60*60*1000),
            httpOnly:false
        }
        res.cookie("token",token,cookieOptions)
        return  res.status(200).json(result)
    }
    else{
      return  res.status(400).json(result)
    }
}


export const singleUserProfileRead=async(req,res)=>{
    let result=await UserServices.singleUserProfileReadAndUpdateServices(req)
    res.status(result.status).json(result)
}


export const AllUserProfileRead=async(req,res)=>{
    let result=await UserServices.AllUserProfileReadServices(req)
    res.status(result.status).json(result)
}


export const DeleteSingleUser=async(req,res)=>{
    let result=await UserServices.DeleteSingleUserServices(req)
    res.status(result.status).json(result)
}

