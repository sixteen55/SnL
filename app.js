const express = require('express');
const socketio = require('socket.io');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...");
});

//Initializaz socket for the server
const io = socketio(server);

var q = 0;
let player = [];

io.on("connection", (socket) => {
    console.log("New user connected");

    q++;

    function randomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
    for (var count = 0; count < 6; count++) {
             color = color+  letters[Math.floor(Math.random() * 16)];
          }
          return color;
    }
    color = randomColor();
    randomColor();

    function Player(position, color, q){
        this.position = position;
        this.color = color;
        this.q = q;
        // console.log(this); 
    }
    const client = new Player(0, color, q); 

    player.push(client);

    // console.log(player);
    
    io.sockets.emit('create_players',{player: player})
});

var hasWon = false;
window.rollDice = ()=>{
  if (hasWon) {
    return;
  }
  const max = 6;
  const roll = Math.ceil(Math.random() * max);
  console.log("You rolled", roll);
  alert(roll)
  let currentPlayer = players[currentPlayerTurn];
  currentPlayer.position += roll;

  let position = 89;
  if (currentPlayer.position >= position) {
    console.log("Player has won!");
    alert(currentPlayer,"Player has won!")
    hasWon = true;
  }
  
  currentPlayerTurn ++;
  if (currentPlayerTurn >= players.length) {
    currentPlayerTurn = 0;
  }
    console.log(currentPlayer.position)
  renderBoard();
}