import express from "express"
import {verifyUser} from "../utils/verifyUser.js"
import { createComment, getComment, updateComment, likeComment } from "../controllers/comment.controller.js";
import { createCommentValidation, updateCommentValidation } from "../utils/validationRules.js"

const router = express.Router();

router.post('/create-comment/:blogId/:userId', verifyUser, createCommentValidation, createComment)
router.get('/get-comments/:blogId', getComment)
// edit document
router.put('/update/:commentId/:userId', verifyUser, updateCommentValidation, updateComment )
// like comment
router.put('/likeComment/:commentId/:userId', verifyUser, likeComment)

export default router;