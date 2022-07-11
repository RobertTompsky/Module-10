const wsUri = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
  const infoOutput = document.querySelector(".info_output");
  const chatOutput = document.querySelector(".chat_output");
  const input = document.querySelector("input");
  const sendBtn = document.querySelector(".btn_send");
  const locBtn = document.querySelector(".btn_location");
  const clearBtn = document.querySelector(".btn_clear");
  
  let socket = new WebSocket(wsUri);
  
  socket.onopen = () => {
    infoOutput.innerText = "Соединение установлено";
  }
  
  socket.onmessage = (event) => {
    writeToChat(event.data, true);
  }
  
  socket.onerror = () => {
    infoOtput.innerHTML = "Ошибка";
  }
  
  sendBtn.addEventListener("click", sendMessage);
  
  function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    writeToChat(input.value, false);
    input.value === "";
  }
  
  function writeToChat(message, isRecieved) {
    let messageHTML = `<div class="${isRecieved? "recieved" : "sent"}">${message}</div>`;
    chatOutput.innerHTML += messageHTML;
  }
    clearBtn.addEventListener("click", () => {
    chatOutput.innerHTML = ""
  }); 

  locBtn.addEventListener("click", getLocation);

  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(locationSucces, locationError);
    } else {
      writeToChat("Ваш браузер не поддерживает функцию определения местоположения", true);
    }
  }

  function locationSucces(data) {
    let link = `https://yandex.ru/maps/?pt=${data.coords.longitude},${data.coords.latitude}&z=18&l=map`;
    writeToChat(`<a href="${link}" target="_blank" style="background-color: green, color: white">Вы находитесь здесь</a>`, true);
    console.log(data);
  }

  function locationError() {
    writeToChat("При получении местоположения произошла ошибка", true);
  }
  
}

document.addEventListener("DOMContentLoaded", pageLoaded);