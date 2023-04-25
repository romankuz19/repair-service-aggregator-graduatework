import React from 'react'
<<<<<<< HEAD
import { useEffect, useState } from 'react'
=======
import { useEffect, useState, useRef } from 'react'
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { CategoryItem } from '../components/CategoryItem.jsx'
import { TaskItem } from '../components/TaskItem'
import { checkIsAuth, getMe } from '../redux/features/auth/authSlice'
import { Chat } from '../components/Chat.jsx'
<<<<<<< HEAD

import { getAllTasks } from '../redux/features/task/taskSlice'
import axios from '../utils/axios'
=======
import { Conversation } from '../components/Conversation.jsx'
import "../Chat.css";
import {io} from 'socket.io-client'
import { getAllTasks } from '../redux/features/task/taskSlice'
import axios from '../utils/axios'
import { ChatBox } from '../components/ChatBox'
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
//import { Button } from 'react-bootstrap';

export const ChatsPage = () => {

    const [chats, setChats] = useState([])
    const [chatUsers, setChatUsers] = useState([])
    const isAuth = useSelector(checkIsAuth)
<<<<<<< HEAD
    const { user } = useSelector((state) => state.auth)
=======
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const { user } = useSelector((state) => state.auth)
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);
    const socket = useRef()
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
    // const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(getMe())
    // }, [dispatch])


    //console.log('user',user);

    const getChats = async () =>{
        try {
            const { data } = await axios.get('/chat/getchats')    
<<<<<<< HEAD
            // const { data } = await axios.get(`/chat/getchats`,{
                
            // //     {
            // //     firstUserId: currentUser._id,
            // //     secondUserId: user[0]._id,
            //  }
            // )
       // console.log('user',user[0]._id)
       // console.log('curuser',currentUser._id)
        
        //setChat(checkchat)        
        //return checkchat[0]
        //console.log('messages',data[0].messages)
        //console.log('dada',data)
        setChats(data.filteredChats)
        setChatUsers(data.filteredUsers)
       // console.log('dada',chats)
        //setTimeout(getMessages, 2000);
        //getMessages()
=======
          
        setChats(data.filteredChats)
        setChatUsers(data.filteredUsers)
     
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getChats()
    }, [])

<<<<<<< HEAD
    console.log('chats',chats);
    console.log('chatUsers',chatUsers);
    
    return (
        
        <>
        
        <div className='max-w-[900px] mx-auto py-10'>
               

        <div className='grid grid-cols-2 grid-flow-row gap-4'>
              {isAuth && chats.length!==0 && ( 
                
                chats?.map((chat , idx) => (
                    
                <Chat chat={chat} curuser={user} chatUsers={chatUsers} key={idx} />
            )))
            
            }   
            </div>
        </div>
        </>
    )
=======
    // Connect to Socket.io
   useEffect(()=>{
        socket.current = io('http://localhost:8800');
        socket.current.emit("new-user-add",user?._id)
        socket.current.on("get-users", (users)=>{
            //console.log('users',users)
            
            setOnlineUsers(users);
            //console.log('onlineUsers',onlineUsers)
        })
    }, [user, isAuth])

    useEffect(() => {
      if (sendMessage!==null) {
        socket.current.emit("send-message", sendMessage);}
    }, [sendMessage]);

    useEffect(() => {
      socket.current.on("recieve-message", (data) => {
        console.log('data',data)
        setReceivedMessage(data);
        console.log('receiveMessage',receivedMessage)
      });
    },[]);
    
    
    //  console.log('receiveMessage',receivedMessage)
    //  console.log('sendMessage',sendMessage)
    //  console.log('chats',chats)
    //  console.log('chats.length',chats.length)
    return (
        <div className="Chat mx-auto py-10">
          {/* Left Side */}
          <div className="Left-side-chat">
            
            <div className="Chat-container overflow-hidden">
              <h2 className='text-2xl font-bold text-color text-center'>Ваши чаты</h2>
              <div className="Chat-list ">
              { !(chats.length==0) ? (
                chats.map((chat, idx) => (
                  <div
                    onClick={() => {
                      setCurrentChat(chat);
                    }}
                  >
                    <Conversation
                      chat={chat}
                      currentUser={user?._id}
                      chatUsers={chatUsers}
                      key={idx}
                      // online={checkOnlineStatus(chat)}
                    />
                  </div>
                ))): (
                  <span className="chatbox-empty-message">
                    У вас пока нет чатов
                  </span>
                )}
  
              </div>
            </div>
          </div>
    
          {/* Right Side */}
    
          <div className="Right-side-chat">
            <div style={{ width: "20rem", alignSelf: "flex-end" }}>
              {/* <NavIcons /> */}
            </div>
            {user && currentChat && chatUsers && (
                  <ChatBox chat={currentChat} currentUser={user} setSendMessage={setSendMessage}
                  receivedMessage={receivedMessage} chatUsers={chatUsers} />
               )}
           
            {/* <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            /> */}
           
          </div>
        </div>
      );
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
}
