(function(){

  const socket = io();
  let currentRoom;

  socket.on('connected', function (data) {
       console.log("data = ", data);

       $("#roomSelector").change(function ()  {
         roomVal = $(this).val();
         if(!currentRoom) {
           socket.emit("subscribeToRoom", roomVal);
         } else if(currentRoom !== roomVal) {
           socket.emit("unSubscribeFromRoom", currentRoom);
           socket.emit("subscribeToRoom", roomVal);
           $("#chat").html("");
         }
         currentRoom = roomVal;
       });

       $("#sendMessage").click(function () {
         const username = $("#username").val();
         const message = $("#message").val();
         const roomVal = $("#roomSelector").val();
         socket.emit("newMessage", {'username': username, 'messageContent': message, 'room':roomVal});
         $("#message").val("");
       });

       socket.on('newMessage', (data) => {
         console.log("newMessage = ", data);
         $("#chat").html($("#chat").html() + "<strong>" + data.username + "</strong>: " + data.messageContent + "<br>");
       });

       socket.on('disconnect', function() {
         socket.emit("unSubscribeFromRoom", currentRoom);
         console.log('disconnect');
       });
  });
})();
