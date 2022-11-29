const express = require('express');
const socketio = require('socket.io');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));

var q = 0;
app.get("/", (req, res) => {
    res.render("index");
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is running...");
});

//Initializaz socket for the server
const io = socketio(server);

let player = [];
var Q = 0;

io.on("connection", (socket) => {
    console.log("New user connected");
    io.sockets.emit('create_players', (player))

    socket.on('playing', data => {
        q++;
        io.sockets.emit('players_q', (q))

        function randomColor() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var count = 0; count < 6; count++) {
                color = color + letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
        color = randomColor();

        randomColor();

        function Player(position, color, q) {

            const players = {
                position: position,
                color: color,
                q: q
            }
            return players
        }


        player.push(Player(0, color, q));

        console.log(player);

        io.sockets.emit('create_players', (player))

    })

    socket.on('currentPlayer', data => {
        let currentPlayer = player[Q];
        console.log("Q:" + Q)
        console.log("data:" + data)
        console.log("num" + player.length)
        // console.log(currentPlayer)
        console.log(currentPlayer.q)
        console.log("-------------------------")
        if (currentPlayer.q == data) {
            rollDice();
            Q++;
            console.log(Q)
            if (Q >= player.length) {
                Q = 0;
            }
        }
        else {
            io.emit('currentPlayerQ',(currentPlayer.q))
        }
    })

    socket.on('stopplaying', data => {
        player.forEach(playerdata);
        function playerdata(qplayer) {
            if (qplayer.q == data) {
                player.splice(player.indexOf(qplayer), 1);
                io.sockets.emit('create_players', (player))
            }
            console.log(player)
            console.log("--------------------------------------")
        }
    })

});

var hasWon = false;
rollDice = () => {
    if (hasWon) {
        return;
    }
    const max = 6;
    const roll = Math.ceil(Math.random() * max);
    // console.log("You rolled", roll);
    // alert(roll)
    let currentPlayer = player[Q];
    // console.log(currentPlayer)
    currentPlayer.position += roll;

    io.emit('create_players', (player))

    let position = 89;
    if (currentPlayer.position >= position) {
        console.log("Player has won!");
        alert(currentPlayer, "Player has won!")
        hasWon = true;
    }

}