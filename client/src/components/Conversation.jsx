import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export const Conversation = ({ chat, currentUser, chatUsers }) => {

  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  var online = null;
  const [secondUserId, setSecondUserId] = useState(null)
  const [secondUser, setSecondUser] = useState(null)
  //console.log('secondUser',secondUser);
  
  useEffect(()=> {
    chat.firstUserId == currentUser ? setSecondUserId(chat.secondUserId): setSecondUserId(chat.firstUserId);

    //  console.log('chat',chat);
    // console.log('chatUsers',chatUsers);
    // console.log('currentUser',currentUser);
    // console.log('secondUserId',secondUserId);
    chatUsers.forEach(element => {
        if(element._id == secondUserId)setSecondUser(element);
    }); 


   // console.log('secondUser',secondUser);

    // const userId = data.find((id)=>id!==currentUser)
    // console.log('userId',userId)

    // const getUserData = async ()=> {
    //   try
    //   {
    //       const {data} =await getUser(userId)
    //      setUserData(data)
    //      dispatch({type:"SAVE_USER", data:data})
    //   }
    //   catch(error)
    //   {
    //     console.log(error)
    //   }
    // }

    // getUserData();
  }, [secondUser, secondUserId])



  return (
    <>
      <div className="follower conversation">
        <div>
        
          {secondUser?.admin == true && (<div className="text-center text-cat-color text-xs font-bold">Поддержка</div>)}
          {/* {online && <div className="online-dot"></div>} */}
          {/* <img
            src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"}
            alt="Profile"
            className="followerImage"
            style={{ width: "50px", height: "50px" }}
          /> */}
          <div className="name text-center font-bold text-xl'">
            {secondUser?.firstname} {secondUser?.secondname}
            {/* <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span> */}
          </div>
        </div>
      </div>
      <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
    </>
  );
};
