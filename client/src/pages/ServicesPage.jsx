import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { CategoryItem } from '../components/CategoryItem.jsx'

import { getAllPosts } from '../redux/features/post/postSlice'
import axios from '../utils/axios'
import { ServiceItem } from '../components/ServiceItem'
import { Toast } from 'bootstrap'
import { toast } from 'react-toastify'
//import { Button } from 'react-bootstrap';

export const ServicesPage = () => {
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
    const dispatch = useDispatch()
    const { posts, popularPosts, users } = useSelector((state) => state.post)
    const [cat, setCat] = useState('')
    const [search, setSearch] = useState('')
    const [sortedPosts, setSortedPosts]= useState([])
    const [checkedState, setCheckedState] = useState(
        new Array(categoriesList.length).fill(true)
    );
    const [checkedStateAll, setCheckedStateAll] = useState(true);
    const [sortCategories, setSortCategories]= useState([])
    

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


    const handleSearch = async(e) => {
        try {
            e.preventDefault()

            console.log('search',search)
           
            if(!search){
                toast('Заполните поиск')
            }
            else
            {
                console.log('cat',cat)
            const data = await axios.get(`/posts/sorted/${search}`);
            console.log('data',data)
            if(data.data.sortedPosts.length==0){
                toast('По такому запросу ничего не нашлось :( \n Попробуйте снова')
                setSearch('')

            }
            else{
                setSortedPosts(data.data.sortedPosts)
            }
           
            console.log('sortedPosts',data.data.sortedPosts)
            
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    const cancelSearch = async (e) => {
        try {
            e.preventDefault()
            setSortedPosts([])
            setSearch('')
            
            console.log('sort',sortedPosts)

            // var select = document.getElementById('catlist1');
            // var value = select.options[select.selectedIndex].value;
            // console.log(value);
            //element.dispatchEvent(new Event('change'))
            //return data
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        
    }, [search])

    if (!posts.length) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Пока что нет услуг.
            </div>
        )
    }
    
        
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


    // const intNum=[-1,2,-3,4,-5,6,-7,0,-8];
    // const sign = function(array){
    //     let result =0;
    //     for (let i =0;i<array.length; ++i){
    //         if(Math.sign(array[i])!== 1 && array[i] !==0){
    //             ++result;
    //         }
    //     }
    //     return result
    // }
    // console.log('result',sign(intNum))
    
    

    const handleOnChangeSort = (position, value) => {
        const updatedCheckedState = checkedState.map((item, index) =>
          {
            if(index===position){
                console.log('index',index)
                console.log('position',position)
                console.log('!item',item)
                
                return !item
            }
            else {
                console.log('item',item)
                
                return item
            }
            
          }
        );
        setCheckedState(updatedCheckedState);
        console.log('checkedState',checkedState)

        if(checkedState[position]) setSortCategories(sortCategories => [...sortCategories, value]);
        else console.log('delete')
        
        
        //setSortCategories([...value])
    }
    const handleOnChangeAllSort = () => {
        
        if(checkedStateAll){
            setCheckedStateAll(false)
            setCheckedState(new Array(categoriesList.length).fill(false))
        }
        else{
            setCheckedStateAll(true)
            setCheckedState(new Array(categoriesList.length).fill(true))
        }
        

    }

    
    console.log(sortCategories);
    
    return (
        
        <>
        
        
        <div className='max-w-[950px] mx-auto py-10'>
                {/* <div className='mx-auto mb-10 flex flex-col items-center justify-center'>
                    <div className='flex flex-col items-center'>
                        <p className=' text-blue-700 text-xl font-bold'>Сортировка по категориям</p>
                        <input list="categories" id="catlist" 
                        onChange={(e) => setCat(e.target.value)} 
                        name="category" className='max-w-[200px] text-black text-center rounded-lg bg-white border text-xl my-3'>
                        </input>
                        <datalist id="categories">
                            <Options options={categoriesList} />
                        </datalist>
                    </div>
                    <div>
                        <button

                            onClick={handleSort}
                            className=' bg-blue-600 text-l font-bold text-white rounded-lg py-2 px-2  hover:text-black'
                        >Применить</button>
                        <button

                            onClick={cancelSort}
                            className=' bg-red-400 text-l font-bold text-white rounded-lg py-2 px-2 ml-2 hover:text-black'
                        >Сбросить</button>
                    </div>

                </div> */}
                
            <form className='mb-10' action="#">   
                <label  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} id="search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Поиск" ></input>
                    <div>
                    <button onClick={handleSearch} className="btn-color text-white font-bold absolute right-12 bottom-2.5  hover:bg-blue-800 rounded-lg text-sm px-4 py-2 ">Найти</button>
                    <button onClick={cancelSearch} className="btn-color text-white font-bold absolute right-1 bottom-2.5  hover:bg-blue-800  rounded-lg text-sm px-4 py-2 ">x</button>
                    
                    </div>
                   
                </div>
            </form>


                
                <div className='flex justify-center gap-4'>

                    <div className='flex flex-col gap-10 basis-4/5'>
                        {sortedPosts.length === 0 ?
                            posts?.map((service, idx) => (
                                <ServiceItem key={idx} service={service} user={users} />
                            )) :

                            sortedPosts?.map((service, idx) => (
                                <ServiceItem key={idx} service={service} user={users} />
                            ))}
                        {/* {posts?.map((post, idx) => (
        <PostItem key={idx} post={post} user={users} />
    ))} */}
                    </div>
                    <div className='basis-1/5'>
                        <div className='text-xs text-center font-bold uppercase text-black'>
                        <div className="toppings-list-item">
                                        <div className="left-section">
                                        <input
                                            type="checkbox"
                                            
                                            value="Все категории"
                                            checked={checkedStateAll}
                                            onChange={() => handleOnChangeAllSort()}
                                        />
                                        <label> Все категории</label>
                                        </div>
                                        
                        </div>
                            
                            Категории:
                        </div>
                        {/* {categoriesList.map((category,idx) => <CategoryItem key={idx} category={category.value}/>)} */}
                        {/* <Options options={categoriesList} /> */}
                        <div className="flex justify-center font-bold">
      {/* <h3>Select Toppings</h3> */}
                            <ul className="toppings-list ">
                                {categoriesList.map(({ value }, index) => {
                                return (
                                    <li key={index}>
                                    <div className="toppings-list-item">
                                        <div className="left-section">
                                        <input
                                            type="checkbox"
                                            id={`custom-checkbox-${index}`}
                                            name={value}
                                            value={value}
                                            checked={checkedState[index]}
                                            onChange={() => handleOnChangeSort(index, value)}
                                        />
                                        <label htmlFor={`custom-checkbox-${index}`}> {value}</label>
                                        </div>
                                        
                                    </div>
                                    </li>
                                );
                                })}
                                
                            </ul>
                        </div>

                        
                    </div>
                </div>
            </div></>
    )
}
