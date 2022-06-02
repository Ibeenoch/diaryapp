import express from 'express'
import { getPost, createPost, updatePost, deletePost, likePost  } from '../controllers.js/post.js'
import protect from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', protect, getPost)
router.post('/', protect, createPost)
router.patch('/:id', protect, updatePost)
router.delete('/:id', protect, deletePost)
router.patch('/:id/likepost', protect,  likePost)

export default router