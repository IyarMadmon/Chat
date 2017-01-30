(function(){

  const socket = io();
  console.log(socket);
  socket.on('connected', function (data) {
       console.log("data = ", data);

       document.getElementById("roomSelector").addEventListener("change",  () => {
         const e = document.getElementById("roomSelector");
         const roomId = e.options[e.selectedIndex].value;
         socket.emit("roomChange", roomId);
       });

       document.getElementById("sendMessage").addEventListener("click", () => {
         const username = document.getElementById("username").value;
         const messageContent = document.getElementById("message").value;
         document.getElementById("message").value = '';
         const e = document.getElementById("roomSelector");
         const roomId = e.options[e.selectedIndex].value;
         socket.emit("newMessage", {'username': username, 'messageContent': messageContent, 'room':roomId});
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
