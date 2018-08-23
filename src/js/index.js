document.addEventListener("DOMContentLoaded", () => {
  const chatWebSocket = openConnection()
  const userWebSocket = openConnection()

  userWebSocket.onopen = (event) => {
    const subscribeUser = {"command":"subscribe","identifier":"{\"channel\":\"UsersOnlineChannel\"}"}
    userWebSocket.send(JSON.stringify(subscribeUser))
  }

  chatWebSocket.onopen = (event) => {
    const subscribeMsg = {"command":"subscribe","identifier":"{\"channel\":\"ChatMessagesChannel\"}"}

    chatWebSocket.send(JSON.stringify(subscribeMsg))
  }

  const onlineList = document.getElementById('online-list')
  const chatContent = document.querySelector("#chat-content")
  chatWebSocket.onmessage = event => {
    const result = JSON.parse(event.data)
    if(result["message"]["content"]) {
      if(result["message"]["username"] === "null"){
        const newText = new Lol(result["message"]["content"])
        const newMessage = document.createElement("p")
        newMessage.innerText = `Anon: ${newText.randomEffect()}`
        chatContent.append(newMessage)
      } else {
        const user = result["message"]["username"]
        const newText = new Lol(result["message"]["content"])
        const newMessage = document.createElement("p")
        newMessage.innerText = `${user}: ${newText.randomEffect()}`
        chatContent.append(newMessage)
      }
    }
    scrollDown()
  }

  userWebSocket.onmessage = event => {
    const result = JSON.parse(event.data)
    if (result["message"]["username"]) {
      const user = result["message"]["username"]
      const onlineNow = document.createElement('li')
      onlineNow.id = user
      onlineNow.innerHTML = user
      onlineList.append(onlineNow)
    }
    // else if (result["message"]["logout"]) {
    //   sessionStorage.clear()
    //   onlineUser.innerHTML = ''
    //   currentU.innerHTML = ''
    //   onlineList.innerHTML = "You are not logged in!"
    //   h.innerText = 'Logged Out!'
    //   currentU.append(h)
    // }
  }



  const chatField = document.querySelector("#chat-field")
  const sendBtn = document.querySelector("#sendBtn")
  sendBtn.onclick = () => {
    event.preventDefault()
    // const msg = JSON.stringify(chatField.value)
    // const msg = {"command":"message","identifier":"{\"channel\":\"ChatMessagesChannel\"}","data":"{\"message\":\"hello\",\"action\":\"chat\"}"}
    const msg = {"command":"message","identifier":"{\"channel\":\"ChatMessagesChannel\"}","data":`{\"action\": \"chat\", \"content\": \"${chatField.value}\", \"username\": \"${sessionStorage.getItem('username')}\" }`}
    chatWebSocket.send(JSON.stringify(msg))
    chatField.value = ""
    // console.log(msg)
  }

  const currentU = document.getElementById('currentU')
  const userName = document.getElementById('user-field')
  const userBtn = document.getElementById('submitUser')
  userBtn.onclick = () => {
    // event.preventDefault()

    document.getElementById('userForm').innerHTML = ''
    document.getElementById('user-name').innerHTML = `Logged in as: ${userName.value}`

    // const welcomeMessage = document.createElement("p")
    // const onlineNow = document.createElement('li')
    // onlineNow.id = sessionStorage.getItem('username')
    // onlineList.innerHTML = ''
    // onlineNow.innerHTML = userName.value
    // welcomeMessage.innerText = `${userName.value} has logged in!`
    // onlineList.append(onlineNow)
    // chatContent.append(welcomeMessage)

    const currentUser = sessionStorage.setItem('username', userName.value)

    const msg = {"command":"message","identifier":"{\"channel\":\"UsersOnlineChannel\"}","data":`{\"action\": \"user\", \"username\": \"${sessionStorage.getItem('username')}\"}`}
    userWebSocket.send(JSON.stringify(msg))

    const logoutBtn = document.createElement('button')
    logoutBtn.innerText = "Logout"
    logoutBtn.className = "btn btn-danger"
    logoutBtn.onclick = () => {
      const onlineUser = document.getElementById(`${sessionStorage.getItem('username')}`)
      const msg = {"command":"message","identifier":"{\"channel\":\"UsersOnlineChannel\"}","data":`{\"action\": \"user\", \"username\": \"${sessionStorage.getItem('username')}\", \"logout\": \"${sessionStorage.getItem('username')}}`}
      userWebSocket.send(JSON.stringify(msg))
      sessionStorage.clear();
      onlineUser.innerHTML = ''
      currentU.innerHTML = ''
      onlineList.innerHTML = "You are not logged in!"
      const h = document.createElement('h4')
      h.innerText = 'Logged Out!'
      currentU.append(h)


    }
    currentU.append(logoutBtn)
  }
})

function scrollDown() {
  const chatContent = document.querySelector("#chat-content")
  chatContent.scrollTop = chatContent.scrollHeight
}
