(function(){

  const socket = io('http://localhost');

  socket.on('connected', function (data) {
       console.log(data);


       document.getElementById("allText").addEventListener("click", () => {
         socket.emit("please", {'room':'MainRoom'});
       });

       socket.on("please", (data) => {
         const current = document.getElementById("allText").html();
         document.getElementById("allText").html(current + data);
       });

       socket.on('disconnect', function() {
         console.log('disconnect');
       });


  });


})();
