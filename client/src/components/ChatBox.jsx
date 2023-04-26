import React, { useEffect, useState } from "react";
import { useRef } from "react";
import axios from '../utils/axios'
import "../ChatBox.css";
import InputEmoji from 'react-input-emoji'
import { format } from "timeago.js";
import * as timeago from 'timeago.js'
import ru from 'timeago.js/lib/lang/ru'

export const ChatBox = ({ respondTaskMessage, chat, currentUser, setSendMessage,  receivedMessage, chatUsers }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [secondUserId, setSecondUserId] = useState(null)
  const [secondUser, setSecondUser] = useState(null)
  const scroll = useRef();
  const imageRef = useRef();
  const [currentUserId, setCurrentUserId] = useState(currentUser._id)
  console.log('respondTaskMessage={respondTaskMessage}',respondTaskMessage)


  timeago.register('ru', ru)

  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }


  const handleSendMessage = async(e)=> {
    e.preventDefault()
    const message = {
        chatId: chat._id,
        senderId : currentUser._id,
        senderName: currentUser.firstname,
        message: newMessage,
      
  }
  const receiverId = secondUserId;
  // send message to socket server
  setSendMessage({...message, receiverId})
  // send message to database
  try {
    //const { data } = await addMessage(message);
    const { data } = await axios.post(`/messages/`, message)
    // const { data } = await axios.post(`/messages/`, {
    //     chatId,
    //     senderId,
    //     senderName,
    //     message
    // })
    setMessages([...messages, data]);
    setNewMessage("");
    //console.log('data',data);
  }
  catch
  {
    console.log("error")
  }
}




const fetchRespondMessage = () => {
  console.log('dasdsad')
 // var tmp = dataForRespond.firstname
  console.log('dasdasdasd')

  //setNewMessage(tmp)
}

useEffect(()=> {
  //console.log('dataForRespond.firstname)',dataForRespond.firstname)
  setNewMessage(respondTaskMessage)
 //console.log('respondTaskMessage',respondTaskMessage)
},[respondTaskMessage])


  // fetching data for user

  useEffect(() => {

    chat.firstUserId == currentUser._id ? setSecondUserId(chat.secondUserId): setSecondUserId(chat.firstUserId);
    chatUsers.forEach(element => {
        //console.log('element._id',element._id)
        if(element._id == secondUserId){
            setSecondUser(element);
            
        }
    }); 
    //setUserData(secondUser);
  },[secondUserId, secondUser, chat]);

  // fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await axios.get(`/messages/${chat._id}`)
        setMessages(data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    console.log('fetchMess')

    if (chat !== null) fetchMessages();
  }, [chat]);


  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])

  


  // Send Message
  

// Receive Message from parent component
useEffect(()=> {
  console.log("Message Arrived: ", receivedMessage)
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
    console.log('qqqqq');
  }

},[receivedMessage])








console.log('newMessage',newMessage)



  


  
  //console.log(chat,'chat')
  return (
    <>
      <div className="ChatBox-container">
        {/* {chat?.messages.length!=0 && ( */}
          <>
            {/* chat-header */}
            <div className="flex justify-center  border-2 rounded-3xl">
              
                
                  <div className="flex flex-wrap align-center font-bold content-center text-center text-2xl">
                    <div>
                    Чат с пользователем {secondUser?.firstname} {secondUser?.secondname}
                    </div>
                    
                      
                
                  </div>
                
              
              {/* <hr className="text-center"
                style={{
                  width: "95%",
                  border: "0.1px solid #ececec",
                  marginTop: "20px",
                }}
              /> */}
            </div>
            {/* chat-body */}
            {/* <div className="box"> */}
            <div className="chat-body border-2 rounded-3xl overflow-y-scroll overflow-x-hidden my-2" >
              { messages?.length!=0 ? (messages.map((message) => (
                <>
                  <div ref={scroll}
                    className={
                      message.senderId === currentUser._id
                        ? "message own"
                        : "message "
                    }
                  >
                    <span className="font-bold">{message.message}</span>{" "}
                    <span className="font-mono ">{format(message.createdAt, 'ru')}</span>
                  </div>
                </>
              ))):(
                <div className="text-center font-bold">Чат пока пуст. Скорее напишите что-нибудь!</div>
              )}
            </div>

           {/* </div> */}
            

            {/* chat-sender */}
            <div className="flex flex-row items-center gap-5 mt-2">
              <div className="cursor-pointer" onClick={() => imageRef.current.click()}>+</div>
              <InputEmoji
                value={newMessage}
                placeholder="Введите сообщение"
                onChange={handleChange}
              />
              <div className="flex text-m font-bold rounded-lg btn-color  p-2 text-white cursor-pointer hover:bg-blue-800 cursor-pointer" onClick = {handleSendMessage}>Отправить</div>
              <input
                type="file"
                name=""
                id=""
                style={{ display: "none" }}
                ref={imageRef}
              />
            </div>{" "}
          </>
        
        {/* )} */}
      </div>
    </>
  );
};
