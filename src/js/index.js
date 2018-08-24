document.addEventListener("DOMContentLoaded", () => {
  const chatWebSocket = openConnection()
  chatWebSocket.onopen = (event) => {
    const subscribeMsg = {"command":"subscribe","identifier":"{\"channel\":\"ChatMessagesChannel\"}"}
    chatWebSocket.send(JSON.stringify(subscribeMsg))
    renderChatMessage("You have joined the channel.")
  }

  const userWebSocket = openConnection()
  userWebSocket.onopen = (event) => {
    const subscribeUser = {"command":"subscribe","identifier":"{\"channel\":\"UsersOnlineChannel\"}"}
    userWebSocket.send(JSON.stringify(subscribeUser))
  }

  // const onlineList = document.getElementById('online-list')
  // const chatContent = document.querySelector("#chat-content")

  liveChatSocket(chatWebSocket)
  liveUserSocket(userWebSocket)

  const chatField = document.querySelector("#chat-field")
  const sendBtn = document.querySelector("#sendBtn")
  sendBtn.onclick = () => {
    event.preventDefault()
    // const msg = JSON.stringify(chatField.value)
    // const msg = {"command":"message","identifier":"{\"channel\":\"ChatMessagesChannel\"}","data":"{\"message\":\"hello\",\"action\":\"chat\"}"}
    const msg = {
      "command":"message",
      "identifier":"{\"channel\":\"ChatMessagesChannel\"}",
      "data":`{
        \"action\": \"chat\",
        \"content\": \"${chatField.value}\",
        \"username\": \"${sessionStorage.getItem('username')}\"
      }`
    }

    chatWebSocket.send(JSON.stringify(msg))
    chatField.value = ""
    // console.log(msg)
  }

  const currentU = document.getElementById('currentU')
  const userName = document.getElementById('user-field')

  const userBtn = document.getElementById('submitUser')
  userBtn.onclick = () => {
    event.preventDefault()

    createUserSession()
    document.getElementById('userForm').innerHTML = ''
    document.getElementById('welcome').innerHTML = `Welcome ${userName.value}!`


    const msg = {
      "command":"message",
      "identifier":"{\"channel\":\"UsersOnlineChannel\"}",
      "data":`{
        \"action\": \"user_join\",
        \"username\": \"${sessionStorage.getItem('username')}\",
        \"identifier\": \"${sessionStorage.getItem('identifier')}\"
        }`
      }
    userWebSocket.send(JSON.stringify(msg))

    const logoutBtn = document.createElement('button')
    logoutBtn.innerText = "Logout"
    logoutBtn.className = "btn btn-danger btn-sm"
    logoutBtn.onclick = () => {
      // const onlineUser = document.getElementById(`${sessionStorage.getItem('username')}`)
      const msg = {
        "command":"message",
        "identifier":"{\"channel\":\"UsersOnlineChannel\"}",
        "data":`{
          \"action\": \"user_leave\",
          \"identifier\": \"${sessionStorage.getItem('identifier')}\"
        }`
      }

      destroyCurrentUser(userWebSocket, msg)


      onlineUser.innerHTML = ''
      currentU.innerHTML = ''
      // onlineList.innerHTML = "You are not logged in!"
      const h = document.createElement('h4')
      document.getElementById('welcome').innerHTML = "Goodbye!"
      currentU.append(h)


    }
    currentU.append(logoutBtn)
  }
})

function isLoggedIn() {
  if(sessionStorage.getItem('username')) {
    return sessionStorage.getItem('username')
  } else {
    return "Anonymous"
  }
}

function liveChatSocket(chatWebSocket) {
  chatWebSocket.onmessage = event => {
    const result = JSON.parse(event.data)
    console.log("chatsocket", result)
    let username = ""
    if(result["message"]["content"]) {

      if(result["message"]["username"] === "null") {
        username = "Anonymous"
      }
      else {
        username = result["message"]["username"]
      }

      const newText = new Lol(result["message"]["content"])
      renderChatMessage(`${username}: ${newText.randomEffect()}`)
    }

    scrollDown()
  }
}

function liveUserSocket(userWebSocket) {
  userWebSocket.onmessage = event => {
    const result = JSON.parse(event.data)
    console.log("usersocket", result)
    if (result["message"]["username"]) {
      const userArray = [...result["message"]["username"]]
      renderOnlineUsers(userArray)
    }
  }
}

function renderChatMessage(msg) {
  const chatContent = document.querySelector("#chat-content")
  const newMessage = document.createElement("p")
  newMessage.innerText = msg
  chatContent.append(newMessage)
}

function renderOnlineUsers(userArray) {
  const onlineList = document.getElementById('online-list')
  onlineList.innerHTML = ""
  userArray.forEach(user => {
    const onlineNow = document.createElement('li')
    onlineNow.innerText = user.username
    onlineList.append(onlineNow)
  })
}

function createUserSession() {
  const userInput = document.querySelector("#user-field")
  sessionStorage.setItem('username', userInput.value)
  sessionStorage.setItem('identifier', makeId())
}

function destroyCurrentUser(webSocket, msg) {
  webSocket.send(JSON.stringify(msg))
  sessionStorage.clear();
}

function makeId() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

function scrollDown() {
  const chatContent = document.querySelector("#chat-content")
  chatContent.scrollTop = chatContent.scrollHeight
}
