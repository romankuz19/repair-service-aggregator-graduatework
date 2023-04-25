import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import { toast } from 'react-toastify'

export const Navbar = () => {
    const isAuth = useSelector(checkIsAuth)
    const dispatch = useDispatch()

    const activeStyles = {
        color: 'white',
    }

    const logoutHandler = () => {
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast.info('Вы вышли из системы')
    }

    return (
        <div className='flex pt-10 pl-20 pr-20 justify-between items-center'>
            <div className='flex gap-8 '>
<<<<<<< HEAD
            <div className='flex justify-center items-center font-bold bg-pink-200 rounded-lg px-4 py-2'>
=======
            <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                {
                    <><NavLink
                        to={'/'}
                        href='/'
<<<<<<< HEAD
                        className='da text-l font-bold text-black-400 hover:text-white'
=======
                        className=' text-l font-bold text-white '
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                        
                    >
                        Услуги
                    </NavLink>
                    </>
                }
            </div>

<<<<<<< HEAD
            <div className='flex justify-center items-center font-bold bg-pink-200 rounded-lg px-4 py-2'>
=======
            <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                {
                    <><NavLink
                        to={'/tasks'}
                        href='/tasks'
<<<<<<< HEAD
                        className='da text-l font-bold text-black-400 hover:text-white'
                        
                    >
                        Задания
=======
                        className=' text-l font-bold text-white '
                        
                    >
                        Заказы
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                    </NavLink>
                    </>
                }
            </div>

            </div>
             
            {/* <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-l text-white rounded-sm'>
                Мой профиль
            </span> */}

            {/* {isAuth && (
                <ul className='flex pl-8 gap-8'>
                    
                    <li>
                        <NavLink
                            to={'/posts'}
                            href='/'
<<<<<<< HEAD
                            className='text-l font-bold text-black-400 hover:text-white'
=======
                            className='text-l font-bold text-white '
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Мои услуги
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={'/new'}
                            href='/'
<<<<<<< HEAD
                            className='text-l font-bold text-black-400 hover:text-white'
=======
                            className='text-l font-bold text-white '
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                            style={({ isActive }) =>
                                isActive ? activeStyles : undefined
                            }
                        >
                            Добавить услугу
                        </NavLink>
                    </li>
                </ul>
            )} */}

            <div className='flex gap-8 '>
                {isAuth ? 
                    <>
<<<<<<< HEAD
                    <NavLink
                        to={'/chats'}
                        href='/'
                        className='font-bold bg-pink-200 text-l text-black rounded-lg px-4 py-2 text-l font-bold text-black-400 hover:text-white'
                        
                    >
                        Чаты
                    </NavLink>
                    <>
                    <NavLink
                        to={'/myprofile'}
                        href='/'
                        className='font-bold bg-pink-200 text-l text-black rounded-lg px-4 py-2 text-l font-bold text-black-400 hover:text-white'
=======
                    <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                    <NavLink
                        to={'/chats'}
                        href='/'
                        className='text-l font-bold text-white '
                        
                    >
                        Чаты
                    </NavLink>
                    </div>
                    
                    <>
                    <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                    <NavLink
                        to={'/profile'}
                        href='/'
                        className='text-l font-bold text-white '
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                        
                    >
                        Мой профиль
                    </NavLink>

                    </div>
                    
                    </>
                    <>
                    <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                    <NavLink
                        to={'/'}
                        href='/'
                        onClick={logoutHandler}
<<<<<<< HEAD
                        className='font-bold bg-pink-200 text-l text-black rounded-lg px-4 py-2 text-l font-bold text-black-400 hover:text-white'
=======
                        className='text-l font-bold text-white  '
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
                        
                    >
                        Выйти
                    </NavLink>

                    </div>
                    
                    </>
                   
                    </>
                : 
<<<<<<< HEAD
                <><NavLink
                to={'/login'}
                href='/'
    
                className='font-bold bg-pink-200 text-l text-black rounded-lg px-4 py-2 text-l font-bold text-black-400 hover:text-white'
                // style={({ isActive }) => isActive ? activeStyles : undefined}
            >
                Войти
            </NavLink>
=======
                <>
                <div className='flex justify-center items-center font-bold btn-color rounded-lg px-4 py-2 hover:bg-blue-800 shadow-lg shadow-blue-500/50'>
                    <NavLink
                    to={'/login'}
                    href='/'
        
                    className='text-l font-bold text-white '
                    // style={({ isActive }) => isActive ? activeStyles : undefined}
                >
                    Войти
                </NavLink>
                </div>
                    
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
            </>
                }
            </div>
            
        </div>
    )
}
