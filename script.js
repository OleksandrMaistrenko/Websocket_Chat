const chatEl = document.getElementById("chat");
const ws = new WebSocket("ws://127.0.0.1:8000");
ws.onmessage = (message) => {
  const messages = JSON.parse(message.data);
  messages.forEach((val) => {
    const messageEl = document.createElement("div");
    messageEl.classList.add("dinamicDiv");

    const currentTime = new Date(Date.now());

    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();

    const formattedHours = hours < 10 ? `0${hours}` : hours;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    messageEl.appendChild(
      document.createTextNode(`${val.name}: ${val.message} ${formattedTime}`)
    );
    chatEl.appendChild(messageEl);
  });
};
const send = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;
  ws.send(
    JSON.stringify({
      name,
      message,
    })
  );
  return false;
};
const formEl = document.getElementById("messageForm");
formEl.addEventListener("submit", send);
