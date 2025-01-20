import express from 'express';
import * as UserController from "../controllers/UserController.js"
import AuthVerification from '../middlewares/AuthVerification.js';

let router=express.Router()


router.get("/loginOtp/:email",UserController.userOtp)
router.get("/veryfyOTP/:email/:otp",UserController.UserLoginVerify)
router.get("/singleUserProfileRead",AuthVerification, UserController.singleUserProfileRead)
router.get("/singleUserProfileUpdate",AuthVerification, UserController.singleUserProfileRead)
router.get("/allUserProfileRead", UserController.AllUserProfileRead)
router.get("/deleteSingleUser/:id", UserController.DeleteSingleUser)
export default router;