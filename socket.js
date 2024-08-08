const socket = io();

const input_room = document.getElementById("input-room");
const input_msg = document.getElementById("input-msg");

const join = document.getElementById("join");
const leave = document.getElementById("leave");
const send = document.getElementById("send-msg");
leave.style.display = "none";
join.addEventListener("click", () => {
  const room = input_room.value;
  console.log(room);
  socket.emit("join", room);
  join.style.display = "none";
  leave.style.display = "";
});
leave.addEventListener("click", () => {
  console.log("leave");
  alert("leaving");
  socket.emit("leave");
  join.style.display = "";
  leave.style.display = "none";
});
send.addEventListener("click", () => {
  console.log("send");
  const msg = input_msg.value;
  const room = input_room.value;
  socket.emit("msg", { room: room, msg: msg });
  document.getElementById("write-msg").innerHTML += `<br>` + msg;
});

socket.on("room_msg", (msg) => {
  console.log(msg);
  const print = input_msg.value;
  console.log(print);
  if (print != msg) {
    document.getElementById("main-msg").innerHTML += `<br>` + msg;
  }
  input_msg.value = "";
});
