document.addEventListener("DOMContentLoaded", () => {
  const chatWebSocket = openConnection()

  chatWebSocket.onopen = (event) => {
    const subscribeMsg = {"command":"subscribe","identifier":"{\"channel\":\"ChatMessagesChannel\"}"}

    chatWebSocket.send(JSON.stringify(subscribeMsg))
  }

  const chatContent = document.querySelector("#chat-content")
  chatWebSocket.onmessage = event => {
    chatContent.innerText = JSON.parse(event.data)
    console.log(event.data)
  }

  const chatField = document.querySelector("#chat-field")
  const sendBtn = document.querySelector("#sendBtn")
  sendBtn.onclick = () => {
    // const msg = JSON.stringify(chatField.value)
    // const msg = {"command":"message","identifier":"{\"channel\":\"ChatMessagesChannel\"}","data":"{\"message\":\"hello\",\"action\":\"chat\"}"}
    const msg = {"command":"message","identifier":"{\"channel\":\"ChatMessagesChannel\"}","data":"{\"action\": \"chat\"}"}
    chatWebSocket.send(JSON.stringify(msg))
    // console.log(msg)
  }
})
