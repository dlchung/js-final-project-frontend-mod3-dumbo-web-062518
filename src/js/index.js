document.addEventListener("DOMContentLoaded", () => {
  const chatWebSocket = openConnection()

  chatWebSocket.onopen = (event) => {
    const subscribeMsg = {"command":"subscribe","identifier":"{\"channel\":\"ChatMessagesChannel\"}"}

    chatWebSocket.send(JSON.stringify(subscribeMsg))
  }
  // const currentUser = document.getElementById('user-name')
  // const liUser = document.getElementById('')
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
  }


  // ONLINE NOW LIST


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
    // const msg = {"command":"message","identifier":"{\"channel\":\"ChatMessagesChannel\"}","data":`{\"action\": \"user\", \"username\": \"${userName.value}\" }`}
    // chatWebSocket.send(JSON.stringify(msg))

    document.getElementById('userForm').innerHTML = ''
    document.getElementById('user-name').innerHTML = `Logged in as: ${userName.value}`

    const welcomeMessage = document.createElement("p")
    const onlineNow = document.createElement('li')
    onlineNow.id = sessionStorage.getItem('username')
    onlineList.innerHTML = ''
    onlineNow.innerHTML = userName.value
    welcomeMessage.innerText = `${userName.value} has logged in!`
    onlineList.append(onlineNow)
    chatContent.append(welcomeMessage)

    const currentUser = sessionStorage.setItem('username', userName.value)
    const logoutBtn = document.createElement('button')
    logoutBtn.innerText = "Logout"
    logoutBtn.onclick = () => {
      sessionStorage.clear();
      onlineNow.innerHTML = ''
      currentU.innerHTML = ''
      onlineList.innerHTML = ''
      const h = document.createElement('h4')
      h.innerText = 'Logged Out!'
      currentU.append(h)

    }
    currentU.append(logoutBtn)

  }

})
