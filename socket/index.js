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
      //console.log(typeof(newUserId));
      if (!activeUsers.some((user) => user.userId === newUserId) && newUserId !== null) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        //activeUsers = activeUsers.filter((user) => user.userId !== null)
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });
  


    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
     // activeUsers = activeUsers.filter((user) => user.userId === null)
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
  
    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      console.log("data1: ", data)
      const user = activeUsers.find((user) => user.userId === receiverId);
      //activeUsers = activeUsers.filter((user) => user.userId === null)
      //console.log("Active Users", activeUsers);

      
      //console.log("user: ", user)
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      //   console.log("user.socketId", user.socketId)
      // console.log("Sending from socket to :", receiverId)
      console.log("typeOf: ", typeof data)
        console.log("data: ", data)
      }
    });
  });