function openConnection() {
  // return new WebSocket("ws://localhost:3000/cable")
  return new WebSocket("ws://flatironchatterbox.herokuapp.com/cable")
}
