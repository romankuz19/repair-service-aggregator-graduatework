import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'

export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts, users } = useSelector((state) => state.post)

    //console.log(popularPosts)
    //console.log(users)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Пока что нет услуг.
            </div>
        )
    }

    return (
        <div className='max-w-[900px] mx-auto py-10'>
            <div className='flex justify-center gap-4'>
                <div className='flex flex-col gap-10 basis-4/5'>
                    {posts?.map((post, idx) => (
                        <PostItem key={idx} post={post} user={users} />
                    ))}
                </div>
                <div className='basis-1/5'>
                    <div className='text-xs text-center font-bold uppercase text-black'>
                        Популярное:
                    </div>

                    {popularPosts?.map((post, idx) => (
                        <PopularPosts key={idx} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}
