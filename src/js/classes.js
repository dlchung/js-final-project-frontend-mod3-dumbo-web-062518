class User {
  constructor() {

  }
}

class Channel {
  constructor() {

  }
}

class Message {
  constructor() {

  }
}

class Lol {
  constructor(message) {
    this.message = message
  }

  randomEffect() {
    const effects = [
      this.reverseMessage(),
      this.upsideDown(),
      this.removeVowels(),
      this.leetSpeak(),
      this.binary(),
      this.pirateSpeak()
    ]
    return effects[Math.floor(Math.random() * effects.length)]
  }

  reverseMessage() {
    const newMsg = this.message.split("")
    return newMsg.reverse().join("")
  }

  upsideDown() {
    const dictionary = {
      "a": "ɐ", "b": "q", "c": "ɔ", "d": "p", "e": "ǝ", "f": "ɟ", "g": "ƃ",
      "h": "ɥ", "i": "ı", "j": "ɾ", "k": "ʞ", "l": "ן", "m": "ɯ", "n": "u",
      "o": "o", "p": "d", "q": "b", "r": "ɹ", "s": "s", "t": "ʇ", "u": "n",
      "v": "ʌ", "w": "ʍ", "x": "x", "y": "ʎ", "z": "z",
      "A": "∀", "B": "𐐒", "C": "Ɔ", "D": "◖", "E": "Ǝ", "F": "Ⅎ", "G": "⅁",
      "H": "H", "I": "I", "J": "ſ", "K": "⋊", "L": "˥", "M": "W", "N": "N",
      "O": "O", "P": "Ԁ", "Q": "Ό", "R": "ᴚ", "S": "S", "T": "⊥", "U": "∩",
      "V": "Λ", "W": "M", "X": "X", "Y": "⅄", "Z": "Z",
      "&": "⅋", ".": "˙", ",": "'", "[": "]", "]": "[", "(": ")", ")": "(",
      "{": "}", "}": "{", "?": "¿", "!": "¡", "'": ",", '"': "„", ";": "؛",
      "`": ",", "‿": "⁀", "⁅": "⁆", "∴": "∵", "0": "0", "1": "Ɩ", "2": "ᄅ",
      "3": "Ɛ", "4": "ㄣ", "5": "ϛ", "6": "ϛ", "7": "ㄥ", "8": "8", "9": "6"
    }

    const newMsg = []
    const splitMsg = this.message.split("")
    splitMsg.forEach(letter => {
      dictionary[letter] ? newMsg.push(dictionary[letter]) : newMsg.push(letter)
    })
    return newMsg.join("")
  }

  removeVowels() {
    const regex = /[aeiou]/gi
    return this.message.replace(regex, "")
  }

  leetSpeak() {
    const dictionary = {
      "e": "3", "l": "1", "t": "7", "s": "5", "a": "4", "o": "0",
      "E": "3", "L": "1", "T": "7", "S": "5", "A": "4", "O": "0",
    }

    const newMsg = []
    const splitMsg = this.message.split("")
    splitMsg.forEach(letter => {
      dictionary[letter] ? newMsg.push(dictionary[letter]) : newMsg.push(letter)
    })
    return newMsg.join("")
  }

  binary() {
    const newMsg = []
    const splitMsg = this.message.split("")

    splitMsg.forEach(letter => {
      newMsg.push(letter.charCodeAt(0).toString(2))
    })

    const joinedMsg = newMsg.join("").toString().match(/.{10}/g)

    return joinedMsg
  }

  pirateSpeak() {
    const newMsg = []
    const splitMsg = this.message.split("")
    const randNum = Math.floor(Math.random() * 10)
    let prepend = "Arrrrrrrgh! "
    let append = " arggghh!"

    splitMsg.forEach(letter => {
      if(letter === "r" || letter === "R") {
        if(letter === "r") {
          newMsg.push("arrgh")
        } else {
          newMsg.push("Arrgh")
        }
      } else {
        newMsg.push(letter)
      }
    })

    let string = newMsg.join("")

    if(randNum > 4) {
      return prepend += string
    } else {
      return string += append
    }
  }
}
