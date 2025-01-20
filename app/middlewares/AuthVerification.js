import { TokenDecode } from "../utility/tokenHelper.js";

export default (req, res, next) => {
    let token=req.headers['token'];
    if(!token){
        token=req.cookies['token']
    }
    let decode=TokenDecode(token)
    if(decode===null){
     res.status(401).json({message:"Unauthorized"})
    }
    else{
        // retrive from token
       let email=decode['email']
       let user_id=decode['user_id']

        //  Add with request header
        req.headers.email=email;
        req.headers.user_id=user_id;
        next();

    }
}