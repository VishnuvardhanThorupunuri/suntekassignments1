import exp from 'express'
import {register} from '../services/authService.js'
import {config} from 'dotenv'
//import { UserTypeModel } from '../models/UserModel.js';
import { articleTypeModel } from '../models/ArticleModel.js';
import { checkAuthor } from '../middlewares/checkAuthor.js';
import { verifyToken } from '../middlewares/verifyToken.js';
config();
export const authorRoute=exp.Router()

//register author(public)
authorRoute.post("/users",async(req,res,next)=>{
    try{
        //get user obj from req body
        let userObj=req.body;
        //call register service
        const newUserObj=await register({... userObj,role:"AUTHOR"});
        //send response
        res.status(201).json({message:"author created",payload:newUserObj});
    }catch(err){
        next(err);
    }
})
/*authenticate author(public)

authorRoute.post("/authenticate",async(req,res)=>{
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
    res.status(200).json({message:"alogin success",payload:user});
})*/
//create article (author)(protected route)
authorRoute.post("/articles",verifyToken("AUTHOR"),async(req,res,next)=>{
    try{
        //get article obj from req body
        let {title,category,content}=req.body;
        
        //create article with logged-in author's ID from token
        let newArticleDoc=new articleTypeModel({
            author:req.user.userId,
            title,
            category,
            content
        });
        //save article document
        let createdArticleDoc=await newArticleDoc.save();
        //populate author details
        await createdArticleDoc.populate("author","firstName lastName email");
        //send response
        res.status(201).json({message:"article created",payload:createdArticleDoc});
    }catch(err){
        next(err);
    }
})
//read articles of author (protected route)
authorRoute.get("/articles/:authorId",verifyToken("AUTHOR"),async(req,res,next)=>{
    try{
        //get author id 
        let authorId=req.params.authorId;
        
        //verify that the author is accessing their own articles
        if(authorId !== req.user.userId){
            return res.status(403).json({message:"Forbidden. You can only access your own articles"});
        }
        
        //read articles of the author
        let articles=await articleTypeModel.find({author:authorId,isActive:true}).populate("author", "firstName lastName email");
        //send res
        res.status(200).json({message:"author articles",payload:articles});
    }catch(err){
        next(err);
    }
})

/*read ALL articles of author (protected route)
authorRoute.get("/articles/:authorId",verifyToken,checkAuthor,async(req,res)=>{
    let authorId=req.params.authorId;
    let articles=await articleTypeModel.find({author:authorId});
    res.status(200).json({message:"all author articles",payload:articles});
})*/

//edit article(protected route)
authorRoute.put("/articles",verifyToken("AUTHOR"),async(req,res,next)=>{
    try{
        //get modified article from req body
        let {articleId,title,category,content}=req.body;
        
        //find article from db
        let articleOfDb=await articleTypeModel.findById(articleId);
        
        //if article not found
        if(!articleOfDb){
            return res.status(404).json({message:"article not found"});
        }
        
        //check if the article belongs to the logged-in author
        if(articleOfDb.author.toString() !== req.user.userId){
            return res.status(403).json({message:"Forbidden. You can only update your own articles"});
        }
        
        //update the article
        let updatedArticle=await articleTypeModel.findByIdAndUpdate(articleId,
            {
                $set:{title,category,content},
            },{new:true,
                runValidators:true
            }).populate("author","firstName lastName email");
        
        //send response
        res.status(200).json({message:"article updated",payload:updatedArticle});
    }catch(err){
        next(err);
    }
})

//delete(soft delete) article(protected route)
authorRoute.patch("/articles/:id/status",verifyToken("AUTHOR"),async(req,res,next)=>{
    try{
        const {id}=req.params;
        const {isActive}=req.body;
        //find article from db
        let articleOfDb=await articleTypeModel.findById(id);
        //if article not found
        if(!articleOfDb){
            return res.status(404).json({message:"article not found"});
        }
        //check the article is published by author is received from client
        if(articleOfDb.author.toString()!==req.user.userId){
            return res.status(403).json({message:"access denied"});
        }
        //already in requested status
        if(articleOfDb.isActive===isActive){
            return res.status(400).json({message:`article is already ${isActive ? "Active" : "Deleted"}`});
        }

        //update status of the article
        articleOfDb.isActive=isActive;
        await articleOfDb.save();

        //soft delete/toggle status of the article
        {/*let updatedArticle=await articleTypeModel.findByIdAndUpdate(id,
            {
                $set:{isActive: typeof isActive === "boolean" ? isActive : false},
            },
            {new:true,runValidators:true}
        );*/}
        //send response
            res.status(200).json({
            message: `Article ${isActive ? "restored" : "deleted"} successfully`,
            payload: articleOfDb,
        });
    }catch(err){
        next(err);
    }
})