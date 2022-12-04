import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

export const createComment = async (req, res) => {
    try {
        const { postId, comment, author } = req.body

        if (!comment)
            return res.json({ message: 'Комментарий не может быть пустым' })

        
        //console.log('comment',comment)
        const authorName = author.firstname
        console.log('author',authorName)
        const newComment = new Comment({ comment, authorName, author })
        await newComment.save()
        console.log(newComment)
        //const find = await Comment.find().populate('author')
       // console.log('find.author.firstname',find.author.firstname)
        //const some = Comment.find().populate({ author: author });

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            })
            //Comment.populated('author')

           // const some = Comment.findOne({ author: author }).populate('author')
                        
            //console.log('some',some)

        } catch (error) {
            console.log(error)
        }
        
        
        res.json(newComment)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}


// Remove post
export const removeComment = async (req, res) => {
    try {
        const {commentId, postId} = req.body
        //const commentId = req.body.commentId
        //const  postId = req.body.postId
        //const com = req.params.id
      
        console.log("commentId",commentId)

        console.log("postId",postId)
        const comment = await Comment.findByIdAndDelete(commentId)
        if (!comment) return res.json({ message: 'Такого комментария не существует' })

        await Post.findByIdAndUpdate(postId, {
            $pull: { comments: commentId },
        })
        

        //console.log("com",com)
        res.json({ message: 'Комментарий был удален.' })
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}