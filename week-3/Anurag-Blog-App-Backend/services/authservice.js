import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { UserTypeModel } from "../models/UserModel.js";


//register fuction
export const register = async (userObj)=>
{
    //create document
    const userDoc = new UserTypeModel(userObj)
    //validate for empty password
    await userDoc.validate();
    //hash and replace plain password
    userDoc.password = await bcrypt.hash(userDoc.password,10)
    //save
    const created =await userDoc.save()
    //convert document to object to remove password 
    const newUserObj=created.toObjeect()
    //delete password
    delete newUserObj.password
    //return newobject without password
    return newUserObj
}


export const authenticate =async ({email,paasword,role})=>
{
    const user = await UserTypeModel.findOne({email,password,role})
    if(!user)
    {
        const err = new Error("invalid email or role")
        err.status=401
        throw err
    }

    const ismatch = await bcrypt.campare(password,user.password)
    if(!ismatch)
    {
        const err =new Error("the password is invalid")
        err.status(401)
        throw err
    }

    //generate token
    const token=jwt.sign({userId:user._id,
        role:user.role,email:user.email}
        ,process.env.JWT_SECRET,
        {expiresIn:"1h"});
    //return token;

    const userObj=user.toObject();
    delete userObj.password;
    return {token,user:userObj};

}