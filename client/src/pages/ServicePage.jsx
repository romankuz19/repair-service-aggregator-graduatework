import React from 'react'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import ratingIcon from '../images/rating-star.jpg';
import { FcRating } from "react-icons/fc";
import {
    AiFillEye,
    AiOutlineMessage,
    AiTwotoneEdit,
    AiFillDelete,
} from 'react-icons/ai'
import "../styles.css";
import { HiPhone } from 'react-icons/hi'
import { BsFillChatDotsFill} from 'react-icons/bs'
import Moment from 'react-moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import axios from '../utils/axios'
import { removePost } from '../redux/features/post/postSlice'
import {
    createComment,
    getPostComments,
} from '../redux/features/comment/commentSlice'
import { CommentItem } from '../components/CommentItem'
import { MessageItem } from '../components/MessageItem.jsx'
import { checkIsAuth, logout } from '../redux/features/auth/authSlice'
import swal from 'sweetalert';


export const ServicePage = () => {
    const isAuth = useSelector(checkIsAuth)
    const [post, setPost] = useState(null)
    const [ownerUser, setOwnerUser] = useState(null)
    const [chat, setChat] = useState(null)
    const [comment, setComment] = useState('')
    const [message, setMessage] = useState('')
    const [allMessages, setAllMessages] = useState([])
    const [currentUser, setCurrentOwner] = useState(null)
    const [cmtUser, setCmtuser] = useState([])
    const [reviews, setReview] = useState([])
    const [reviewAuthors, setReviewAuthors] = useState([])
    const [btn, setBtn] = useState(false)
    const [isLoaded, setIsloaded] = useState(false)
    const [value, setValue] = useState('1');
    const [valueRating, setValueRating] = useState(Number | null);
    const [avgServiceRating, setServiceAvgRating] = useState(0)
    const words = [ 'сука' , 'сучка' , 'шлюха' ]
    
    const mat = /(?<=^|[^а-я])(huy)(([уyu]|[нзnz3][аa]|(хитро|не)?[вvwb][зz3]?[ыьъi]|[сsc][ьъ']|(и|[рpr][аa4])[зсzs]ъ?|([оo0][тбtb6]|[пp][оo0][дd9])[ьъ']?|(.\B)+?[оаеиeo])?-?([еёe][бb6](?!о[рй])|и[пб][ае][тц]).*?|([нn][иеаaie]|([дпdp]|[вv][еe3][рpr][тt])[оo0]|[рpr][аa][зсzc3]|[з3z]?[аa]|с(ме)?|[оo0]([тt]|дно)?|апч)?-?[хxh][уuy]([яйиеёюuie]|ли(?!ган)).*?|([вvw][зы3z]|(три|два|четыре)жды|(н|[сc][уuy][кk])[аa])?-?[бb6][лl]([яy](?!(х|ш[кн]|мб)[ауеыио]).*?|[еэe][дтdt][ь']?)|([рp][аa][сзc3z]|[знzn][аa]|[соsc]|[вv][ыi]?|[пp]([еe][рpr][еe]|[рrp][оиioеe]|[оo0][дd])|и[зс]ъ?|[аоao][тt])?[пpn][иеёieu][зz3][дd9].*?|([зz3][аa])?[пp][иеieu][дd][аоеaoe]?[рrp](ну.*?|[оаoa][мm]|([аa][сcs])?([иiu]([лl][иiu])?[нщктлtlsn]ь?)?|([оo](ч[еиei])?|[аa][сcs])?[кk]([оo]й)?|[юu][гg])[ауеыauyei]?|[мm][аa][нnh][дd]([ауеыayueiи]([лl]([иi][сзc3щ])?[ауеыauyei])?|[оo][йi]|[аоao][вvwb][оo](ш|sh)[ь']?([e]?[кk][ауеayue])?|юк(ов|[ауи])?)|[мm][уuy][дd6]([яyаиоaiuo0].*?|[еe]?[нhn]([ьюия'uiya]|ей))|мля([тд]ь)?|лять|([нз]а|по)х|м[ао]л[ао]фь([яию]|[её]й))(?=($|[^а-я])(huy))/


    const blockurl2 = /^(http|https|ftp|)\/|[a-zA-Z0-9\-\.]+\.[a-zA-Z](:[a-zA-Z0-9]*)?/

    var chatId = ''
    var loading = true
 
    const { comments } = useSelector((state) => state.comment)

    
    const navigate = useNavigate()
    const params = useParams()
    //console.log('comments',comments)
    const dispatch = useDispatch()
   

    const removePostHandler = () => {
        try {
            swal({
                title: "Вы точно хотите удалить услугу?",
                text: "Эту операцию нельзя отменить",
                icon: "warning",
                buttons: ["Отмена", "Удалить"],
                dangerMode: true,
              })
              .then((willDelete) => {
                if (willDelete) {
                    dispatch(removePost(params.id))
                  swal("Услуга была удалена", {
                    icon: "success",
                    button: "Закрыть"
                  });
                  navigate('/services/my-services')
                  window.location.reload(false);
                } else {
                  toast.info("Услуга не была удалена");
                }
              });
            // console.log('params',params)
            
            // toast.info('Услуга была удалена')
            // navigate('/')
            // window.location.reload(false);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchComments = useCallback(async () => {
        //console.log('fetchingComments')
        try {
            const { data } = await axios.get(`/posts/reviews/${params.id}`)
            for (let index = 0; index < data.list.length; index++) {
                var found = data.authors.find(element => element._id === data.list[index].author);
                data.list[index].authorName = found.firstname
                //console.log("found",found)
            }
            setReview(data.list)
            //setReviewAuthors(data.authors)
            
            //console.log("list",data)
            dispatch(getPostComments(params.id))
        } catch (error) {
            console.log(error)
        }
    }, [params.id, dispatch])

    const fetchPost = useCallback(async () => {
        const { data } = await axios.get(`/posts/${params.id}`)
        setPost(data.post)
        setOwnerUser(data.user)
        if(data.rating === 'NaN'){
            //console.log(data.rating)
            setServiceAvgRating(0)
        }
        else{
            setServiceAvgRating(data.rating)
        }
        console.log(data)
    }, [params.id])

    useEffect(() => {
        fetchPost()
    }, [fetchPost])

    useEffect(() => {
        fetchComments()
    }, [fetchComments])


    useEffect(() => {
        fetchUser()
    },[])

    const fetchUser = async () => {
        const { data } = await axios.get('/auth/me')
       
       // console.log(data.user)
       setCurrentOwner(data.user)
       setCmtuser(data.user)

       //setOwnerUser(user)
    }

    const handleCreateChat = async () => {
        try {
            setBtn(true)
            // console.log('user1',currentUser._id)
            // console.log('user2',ownerUser._id)
            
            const { data } = await axios.post(`/chat/create`, {
                firstUserId: currentUser._id,
                secondUserId: ownerUser._id,
            })
            navigate(`/chats/?id=${ownerUser._id}`)
           
                setChat(data)
                
              
        } catch (error) {
            console.log(error)
        }
    }   

    const fetchMessages = async () => {
        try {
            if(!chat.length){
                //console.log(chat._id)
                //setChatId(chat._id) 
                chatId=chat._id
                
            }
            
            else{
                //console.log(chat[0]._id)
                //setChatId(chat[0]._id)
                chatId=chat[0]._id
                
            } 
            const { data } = await axios.get(`/messages/${chatId}`)
            //console.log('data',data)
            setAllMessages(data.messages)
            return data
        } catch (error) {
            console.log(error)
        }
    }
    
    const isInitialMount = useRef(true);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            // Your useEffect code here to be run on update
            fetchMessages()
            
        }
        },[message]);
        
    useEffect(() => {
        if(btn){
            //console.log('btn',btn)
            //console.log('isload',isLoaded)
            if(!isLoaded && chat){
                setIsloaded(true)
                fetchMessages()
            }
            
        }
        
      });
    

    useEffect(() => {
        if(btn && isLoaded){
            const interval = setInterval(fetchMessages, 1000);
            return () => clearInterval(interval);
        }
      });
      
   
  

    const handleSendMessage  = async () => {
        try {
            //fetchMessages()
            if(!chat.length){
                //console.log(chat._id)
                //setChatId(chat._id) 
                chatId=chat._id
                
            }
            
            else{
                //console.log(chat[0]._id)
                //setChatId(chat[0]._id)
                chatId=chat[0]._id
                
            } 
            console.log(chatId)
            const senderId = currentUser._id
            const senderName = currentUser.firstname
            console.log(currentUser.firstname)
                try {
                    const { data } = await axios.post(`/messages/`, {
                        chatId,
                        senderId,
                        senderName,
                        message
                    })
                    setMessage('')
                    return data
                } catch (error) {
                    console.log(error)
                }
            
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async () => {
        try {
            if(!valueRating){
                toast.info("Поставьте оценку")
            }
            else{
                const postId = params.id
            
                const author = currentUser
                console.log('comment', comment.toLowerCase())
                const result = comment.toLowerCase().match(mat)
                const result1 = comment.toLowerCase().match(blockurl2)
                //console.log('mat', result)
                console.log('blockurl', result1)
                var firstCheck = true, secondCheck = true
                var adcheck = true
                //if(blockurl)
    
    
    
    
                if(result!==null) firstCheck=false
                if(result1!==null) adcheck=false
                for(var i = 0;i<words.length;i++){
                    if(comment.toLowerCase()===words[i]){
    
                        secondCheck=false
    
                    }
                
                }
                if(firstCheck && secondCheck && adcheck){
                    console.log('cmt',comment)
                    setComment('')
    
    
                    var text = comment;
                    var rating = valueRating;
                    var reviewId = postId;
                    try {
                        const { data } = await axios.post(`/reviews/${postId}`, {
                            reviewId,
                            text,
                            rating,
                            author
                        })
                        //console.log("data",data)
                        fetchComments();
                        return data
                    } catch (error) {
                        console.log(error)
                    }
    
                    //dispatch(createComment({ postId, comment, author }))
                }
                else if(!firstCheck || !secondCheck){
                    //alert("Данный контент нельзя вставить!")
                    toast.info("Данный контент нельзя добавить!")
                        setComment('')
                }
                else if(!adcheck){
                    //alert("Данный контент нельзя вставить!")
                    toast.info("Данный контент нельзя добавить!")
                        setComment('')
                }
            }
            

        
            
            
        } catch (error) {
            console.log(error)
        }
    }
   
    const toLogin = () => {
        navigate('/login')
    }

    if (!post) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Загрузка...
            </div>
        )
    }
    //console.log('commentes',comments)
    //console.log('allmsg',allMessages)
    //console.log('curuser',currentUser._id)
    //console.log('chat',chat[0]._id)
    //console.log(currentUser._id)
    //console.log('post author',post.author)
    //console.log('allmsg',allMessages)
    // console.log("reviews",reviews)
    // console.log("authors",reviewAuthors)
    const handleChange = (e) => {

        setValue(e.target.value);
     
      };

      console.log("valueRating",valueRating)
    return (
        <div className='max-w-[1200px] mx-auto py-10'>
            {/* <button className='btn-color hover:bg-blue-800 text-xs font-bold text-white rounded-lg py-2 px-4 shadow-lg shadow-blue-500/50'>
                <Link className='flex' to={'/'}>
                    Назад
                </Link>
            </button> */}

            <div className='flex  justify-center mx-auto  py-8'>
                
                <div className='py-5 sm:min-w-[550px] md:min-w-[550px] lg:min-w-[700px] mr-5 border-2 shadow-lg rounded-lg p-2 '>
                    <div className='flex flex-col gap-2 items-center mb-3 '>
                        <div
                            className='object-cover h-42 w-42 rounded-lg border-2 border-gray-600'>
                            {post?.imgUrl && (
                                <img
                                    src={`http://localhost:3002/${post.imgUrl}`}
                                    alt='img'
                                    className='object-cover h-40 w-40 rounded-lg'
                                />
                            )}
                            
                        </div>
                        <div className='flex flex-col items-center'>

                            <div className='text-m font-bold opacity-100'>
                                {ownerUser.firstname} {ownerUser.secondname}
                            </div>
                            <div className='flex flex-col justify-center items-center'>
                                <Typography component="legend">Средняя оценка {avgServiceRating}</Typography>
                                <Rating name="half-rating-read" value={avgServiceRating} precision={0.1} readOnly />
                            </div>
                                

                        </div>
                        
                                <div className='text-s'>Обо мне: {post.title}</div>

                    </div>
                    <div className='flex justify-around items-center pb-3'>
                <div className='text-small-color font-bold opacity-90 text-2xl   line-clamp-4'>{post.text}</div>
                
                <div className='text-small-color font-bold opacity-90 text-2xl  line-clamp-4'>{post.price} ₽</div>
                     
                </div>
                
                <div className='flex justify-around'>
                <div className='flex gap-5 text-black text-m pb-2 pt-3 '>
                        <div className=' flex flex-wrap justify-center content-center text-m text-white font-bold min-w-[150px] rounded-lg btn-color hover:bg-blue-800 p-1 cursor-pointer'
                >
                   <HiPhone className='my-1 mr-1'/>
                {ownerUser.phonenumber}
              </div>
              { 
                isAuth && (currentUser?._id !== ownerUser?._id) ? (<div className='flex text-m font-bold text-white rounded-lg btn-color p-1 cursor-pointer hover:bg-blue-800'
                onClick={handleCreateChat}>
                <BsFillChatDotsFill className='my-1 mr-1' />
                  Чат
                </div>) 
                : !isAuth ? (<div className=' flex text-m font-bold text-white rounded-lg btn-color p-1 cursor-pointer hover:bg-blue-800'
                onClick={()=> {navigate('/login');toast.info('Сперва войдите в аккаунт')}}>
                <BsFillChatDotsFill className='my-1 mr-1' />
                  Чат
                </div>)
                : isAuth && (currentUser._id === ownerUser._id) ? (<div></div>):(<div></div>)}
     
               </div>


               {((currentUser?._id === post.author) || (currentUser?.admin===true)) ?  (

<div className='flex flex-col gap-2 items-center mt-2 '>
         <div className='flex gap-3'>
             <div className='flex items-center justify-center gap-1 text-xs text-black opacity-80'>
                 <AiFillEye /> <span>{post.views}</span>
             </div>
             <div className='flex items-center justify-center gap-1 text-xs text-black opacity-80'>
                 <AiOutlineMessage />{' '}
                 <span>{post.reviews?.length || 0} </span>
             </div>
         </div>

         <div className='flex gap-3'>
                 <button className='flex items-center justify-center gap-2 text-black opacity-80'>
                     <Link to={`/services/${params.id}/edit`}>
                         <AiTwotoneEdit />
                     </Link>
                 </button>
                 <button
                     onClick={removePostHandler}
                     className='flex items-center justify-center gap-2  text-black opacity-80'
                 >
                     <AiFillDelete />
                 </button>
             </div>

         
             
        
        
     </div>
     ):
     <div className='flex gap-5 ml-5'>
             <div className='flex items-center justify-center gap-1 text-xs text-black opacity-80'>
                 <AiFillEye /> <span>{post.views}</span>
             </div>
             <div className='flex items-center justify-center gap-1 text-xs text-black opacity-80'>
                 <AiOutlineMessage />{' '}
                 <span>{post.reviews?.length || 0} </span>
             </div>
         </div>
     }



                </div>
                    <div className='flex justify-around gap-4 '>
                
                
                <div className='left-card flex flex-col gap-2 justify-center'>

            
                </div>

                <div className='rightcard flex flex-col gap-2 justify-center'>
                
                

               

    
                </div>
                
            </div>
                    

                    
                </div>


                {chat && (
                            <div className='w-1/3 ml-5'>
                            <div className='max-h-[400px] text-white overflow-auto p-2 bg-blue-700 flex flex-col gap-2 rounded-lg '>
                                {allMessages?.length!==0?
                                allMessages?.map((msg) => (
                             <MessageItem key={msg._id} msg={msg} />
                        
                        
                    )):
                    <div>История сообщений пуста</div>
                    }
                            </div>
                            <form
                                    className='flex gap-2 p-2'
                                    onSubmit={(e) => e.preventDefault()}
                                >
                                    <textarea
                                        type='text'
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder='Отправьте сообщение'
                                        className='text-black w-full rounded-lg bg-blue-400 border p-2 text-xs outline-none placeholder:text-white'
                                    />
                                    <button
                                        type='submit'
                                        onClick={handleSendMessage}
                                        className='flex justify-center items-center bg-blue-400 text-xs text-white rounded-lg py-2 px-4 hover:text-black'
                                    >
                                        Отправить
                                    </button>
                                </form>
                            </div>
                        )}
        
                
               
            </div>
            <div className='text-center font-bold'>Отзывы</div>
             <div className='w-1/3 mx-auto max-h-[400px] overflow-auto p-8  flex flex-col gap-2 border-2 shadow-2xl rounded-lg '>
                {isAuth && !(currentUser?._id === post.author) && ( 
                <form
                        className=''
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <textarea
                            type='text'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder='Оставьте отзыв'
                            className='text-white w-full rounded-lg bg-blue-400 border p-2 text-xs outline-none placeholder:text-white min-h-[80px]'
                        />
                        <div className='flex justify-between items-center mt-5'>
                            <div>
                            {/* <label htmlFor="rating">Оцените исполнителя:</label>
                                <select id="rating" name="rating" value={value} onChange={handleChange}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select> */}
                                <div className='flex flex-col items-center'>
                                <Typography component="legend">Оцените исполнителя</Typography>
                                    <Rating
                                        name="simple-controlled"
                                        value={valueRating}
                                        onChange={(event, newValue) => {
                                        setValueRating(newValue);
                                        }}
                                    />
                                </div>
                               
                                
                            </div>

                        
                                <div>
                                <button
                            type='submit'
                            onClick={handleSubmit}
                            className='flex justify-center items-center bg-blue-400 text-xs text-white rounded-lg py-2 px-4 hover:text-black hover:font-bold max-w-[85px]'
                        >
                            Отправить
                        </button>
                                </div>
                        
                        </div>
                        
                    </form>)}
                    {isAuth &&  (currentUser?._id === post.author) 
                    }

                    {!isAuth && (<form
                    className='flex gap-2'
                    onSubmit={(e) => e.preventDefault()}
                >
                    <input
                        type='text'
                        readOnly
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder='Авторизуйтесь, чтобы оставить отзыв'
                        className='text-black w-full rounded-lg bg-blue-400 border p-2 text-xs outline-none placeholder:text-white'
                    />
                    
                </form>)}
                    
                    
                    
                    {/* <div className='flex items-center gap-2'>
                        

                    <Typography component="legend">Средняя оценка</Typography>
                <Rating name="read-only" value={avgServiceRating} readOnly />
                    </div> */}
                    
                    {reviews.length!==0 && isAuth && (
                    reviews?.map((review, idx) => (
                        <CommentItem key={idx} review={review} currentUser={currentUser} />
                    )))}
                    {reviews.length!==0 && !isAuth && (
                    reviews?.map((review, idx) => (
                        <CommentItem key={idx} review={review} currentUser={null} />
                    )))}
                    {reviews.length===0 && (
                    <div>Отзывов нет</div>
                    )}
                </div> 
        </div>
    )
}
