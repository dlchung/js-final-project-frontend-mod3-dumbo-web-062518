function openConnection() {
  return new WebSocket("ws://localhost:3000/cable")
}
