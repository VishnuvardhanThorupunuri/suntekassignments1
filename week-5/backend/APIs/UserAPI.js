import exp from 'express'
import {register} from '../services/authService.js'
//import {authenticate} from '../services/authService.js'
import { articleTypeModel } from '../models/ArticleModel.js'
import {config} from 'dotenv'
import { verifyToken } from '../middlewares/verifyToken.js';
config();
export const userRoute=exp.Router()

//register user
userRoute.post("/users",async(req,res)=>{
    //get user obj from req bpdy
    let userObj=req.body;
    //call register service
    const newUserObj=await register({... userObj,role:"USER"});
    //send response
    res.status(201).json({message:"user created",payload:newUserObj});
})
/*authenticate user 
userRoute.post("/authenticate",async(req,res)=>{
    //get user credential from req body
    let userCred=req.body;
    //call authenticate service
    let {token,user}=await authenticate(userCred);
    //save token in cookie
    res.cookie("token",token,
        {
            httpOnly:true,
            sameSite:"lax",
            secure:false,
        });
    //send response
    res.status(200).json({message:"user login success",payload:user});
})*/
//read all the articles(protected route)
userRoute.get("/articles", verifyToken("USER"), async(req,res)=>{
    //read all active articles from db
    let articles=await articleTypeModel.find({isActive:true}).populate("author","firstName email");
    //send response
    res.status(200).json({message:"all active articles",payload:articles});

})

//add comment to an article(protected route)
userRoute.put("/articles",verifyToken("USER"),async(req,res)=>{
    //get article id from req params
    //let articleId=req.params.articleId;
    //get comment from req body
    const {user,articleId,comment}=req.body;
    //check user(req.user)
    console.log(req.user);
    if(user !== req.user.userId){
        return res.status(403).json({message:"Forbidden"});
    }
    //find article from db
    let articleWithComment=await articleTypeModel.findByIdAndUpdate(
        articleId,
        {$push:{comments:{comment,user}}},
        {new:true,runValidators:true},
     )

    //if article not found or not active
    if(!articleWithComment || !articleWithComment.isActive){
        return res.status(404).json({message:"article not found"});
    }

    //if(!articleWithComment || !articleWithComment.isActive){
       // return res.status(404).json({message:"article not found"});
    //}
    //send response
    res.status(201).json({message:"comment added to article",payload:articleWithComment});
})