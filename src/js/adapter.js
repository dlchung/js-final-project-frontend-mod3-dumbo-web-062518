function openConnection() {
  // return new WebSocket("ws://localhost:3000/cable")
  return new WebSocket("wss://flatironchatterbox-api.herokuapp.com/cable")
}
