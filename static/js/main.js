(function(){

  const socket = io();
  console.log(socket);
  socket.on('connected', function (data) {
       console.log("data = ", data);

       document.getElementById("sendMessage").addEventListener("click", () => {
         const username = document.getElementById("username").value;
         const messageContent = document.getElementById("message").value;
         document.getElementById("message").value = '';
         socket.emit("newMessage", {'username': username, 'messageContent': messageContent});
       });

       socket.on('newMessage', (data) => {
         console.log("newMessage = ", data);
         document.getElementById("chat").innerHTML += "<strong>" + data.username + "</strong>: " + data.messageContent + "<br>" ;
       });

       socket.on('disconnect', function() {
         console.log('disconnect');
       });
  });
})();
