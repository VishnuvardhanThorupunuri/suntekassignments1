/*import {UserTypeModel} from "../models/UserModel.js";


export const checkAuthor=(req,res,next)=>{
    //get author id
    let aid=req.body.Author  || req.params.authorId;
    //verify author
    let author = await UserTypeModel.findById(aid);
    
}*/
import { UserTypeModel } from "../models/UserModel.js";

export const checkAuthor = async (req, res, next) => {
  try {
    //Get author id (from body or params)
    const aid = req.body.Author || req.params.authorId;

    if (!aid) {
      return res.status(400).json({
        success: false,
        message: "Author ID is required",
      });
    }

    // Find author in DB
    const author = await UserTypeModel.findById(aid);

    if (!author) {
      return res.status(404).json({
        success: false,
        message: "Author not found",
      });
    }

    // Optional: Check role (if your schema has roles)
    if (author.role !== "author") {
      return res.status(403).json({
        success: false,
        message: "Access denied. User is not an author",
      });
    }

    // Attach author to request (for later use)
    req.author = author;

    //  Move to next middleware/controller
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error while verifying author",
      error: error.message,
    });
  }
};
