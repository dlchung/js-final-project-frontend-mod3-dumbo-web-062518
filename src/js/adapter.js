function openConnection() {
  // return new WebSocket("ws://localhost:3000/cable")
  return new WebSocket("ws://10.39.110.128:3000/cable")
  // return new WebSocket("wss://flatironchatterbox-api.herokuapp.com/cable")
}
