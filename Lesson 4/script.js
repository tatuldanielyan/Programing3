
function main() {
   var socket = io();
   var chatDiv = document.getElementById('chat');
   var input = document.getElementById('message');
   var button = document.getElementById('submit');

   function handleSubmit(evt) {
       var val = input.value;
       if (val != "") {
           socket.emit("send message", val);
       }
   }
   button.onclick = handleSubmit;
}
