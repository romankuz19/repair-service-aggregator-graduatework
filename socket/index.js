const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
<<<<<<< HEAD
=======
        //activeUsers = activeUsers.filter((user) => user.userId !== null)
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });
  


    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
<<<<<<< HEAD
=======
     // activeUsers = activeUsers.filter((user) => user.userId === null)
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
    socket.on("send-message", (data) => {
      const { message, receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
<<<<<<< HEAD
      console.log("Sending from socket to :", receiverId)
      console.log("message: ", message)
      //console.log("user: ", user)
      if (user) {
        io.to(user.socketId).emit("recieve-message", message);
=======
      //activeUsers = activeUsers.filter((user) => user.userId === null)
      //console.log("Active Users", activeUsers);

      
      //console.log("user: ", user)
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      //   console.log("user.socketId", user.socketId)
      // console.log("Sending from socket to :", receiverId)
      // console.log("data: ", data)
>>>>>>> fef589c922658da1cc3428d786d41331edaa590b
      }
    });
  });