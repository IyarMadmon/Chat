(function(){

  const socket = io();
  console.log(socket);
  socket.on('connected', function (data) {
       console.log("data = ", data);

       document.getElementById("allText").addEventListener("click", () => {
         socket.emit("please", {'room':'MainRoom'});
       });

       socket.on("please", (data) => {

       });

       socket.on('newMessage', (data) => {
         console.log("newMessage = ", data);
         const current = document.getElementById("allText").innerHTML;
         document.getElementById("allText").innerHTML = current + data;
       });

       socket.on('disconnect', function() {
         console.log('disconnect');
       });
  });
})();
