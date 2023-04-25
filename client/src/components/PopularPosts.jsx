import React from 'react'
import { Link } from 'react-router-dom'

export const PopularPosts = ({ post }) => {
    return (
        <div className='btn-color my-1 text-center'>
            <Link
                to={`/service/${post._id}`}
<<<<<<< HEAD
                className=' text-black-400 text-center text-xs p-2 font-bold hover:text-white'
=======
                className=' text-white text-center text-xs  p-2 font-bold hover:text-gray-400'
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
            >
                {post.text}
            </Link>
        </div>
    )
}
