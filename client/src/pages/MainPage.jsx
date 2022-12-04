import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { CategoryItem } from '../components/CategoryItem.jsx'
import { PostItem } from '../components/PostItem'

import { getAllPosts } from '../redux/features/post/postSlice'
import axios from '../utils/axios'
//import { Button } from 'react-bootstrap';

export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPosts, users } = useSelector((state) => state.post)
    const [cat, setCat] = useState('')
    const [sortedPosts, setSortedPosts]= useState([])
    

    //console.log(popularPosts)
    //console.log(users)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    const handleSort = async () => {
        try {
            //var select = document.getElementById('catlist');
            //var value = select.options[select.selectedIndex].value;
            //console.log(value);
            if(!cat){
                alert('Выберите значение сортировки')
            }
            else{
                console.log('cat',cat)
            const data = await axios.get(`/posts/sorted/${cat}`);
            console.log('data',data)
            if(data.data.sortedPosts.length==0){
                alert('Неверное значение сортировки, выберите из списка')
                setCat('')
                let element = document.getElementById('catlist');
                element.value = '';
                
            }
            else{
                setSortedPosts(data.data.sortedPosts)
            }
           // const { data } = await axios.get('/posts')
            console.log('sortedPosts',data.data.sortedPosts)
            
            }
            //return data
        } catch (error) {
            console.log(error)
        }
    }

    const cancelSort = async () => {
        try {
            setSortedPosts([])
            setCat('')
            let element = document.getElementById('catlist');
            element.value = '';

            // var select = document.getElementById('catlist1');
            // var value = select.options[select.selectedIndex].value;
            // console.log(value);
            //element.dispatchEvent(new Event('change'))
            //return data
        } catch (error) {
            console.log(error)
        }
    }

    if (!posts.length) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Пока что нет услуг.
            </div>
        )
    }
    const categoriesList = [
       
        {
            id: 1,
            value: 'Бытовые услуги'
        }, {
            id: 2,
            value: 'Электроника'
        }, {
            id: 3,
            value: 'Машины'
        }
        ];
        
        function Options({ options }) {
            return (
                options.map(option => 
                            <option key={option.id} value={option.value}>                                   
                            {option.value}
                            </option>)
                           );
        }
    //console.log('qqq',cat)
    //console.log('length',sortedPosts.length)


    
    return (
        
        <>
        
        <div className='max-w-[900px] mx-auto py-10'>
                <div className='mx-auto mb-10 flex flex-col items-center justify-center'>
                    <div><p className='m-0 pb-2  text-blue-700 text-xl'>Сортировка по категориям</p>
                        <input list="categories" id="catlist" 
                        onChange={(e) => setCat(e.target.value)} 
                        name="category" className='ml-6 mb-2 pl-5 max-w-[200px] text-black text-center rounded-lg bg-white border text-xl '>
                        </input>
                        <datalist id="categories">
                            <Options options={categoriesList} />
                        </datalist>
                    </div>
                    <div>
                        <button

                            onClick={handleSort}
                            className=' bg-blue-600 text-xs text-white rounded-lg py-2 px-2  hover:text-black'
                        >Применить</button>
                        <button

                            onClick={cancelSort}
                            className=' bg-red-400 text-xs text-white rounded-lg py-2 px-2 ml-2 hover:text-black'
                        >Сбросить</button>
                    </div>

                </div>

                
                <div className='flex justify-center gap-4'>

                    <div className='flex flex-col gap-10 basis-4/5'>
                        {sortedPosts.length === 0 ?
                            posts?.map((post, idx) => (
                                <PostItem key={idx} post={post} user={users} />
                            )) :

                            sortedPosts?.map((post, idx) => (
                                <PostItem key={idx} post={post} user={users} />
                            ))}
                        {/* {posts?.map((post, idx) => (
        <PostItem key={idx} post={post} user={users} />
    ))} */}
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
            </div></>
    )
}
