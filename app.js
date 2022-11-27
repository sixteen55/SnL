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
        console.log(this); 
    }

    const client = new Player(0, color, q);

    

});