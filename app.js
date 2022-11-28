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
    q++;
    io.sockets.emit('players_q',(q))

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

    io.sockets.emit('create_players',(player))
    // console.log(player)
    const players = [{
        name: "Cloud",
        position: 0,
        color: "red"
    }, {
        name: "Sephiroth",
        position: 0,
        color: "blue"
    }];
    // console.log(players)

    // socket.on('currentPlayer', data => {
    //     console.log(data)
    // })

    socket.on('currentPlayer', data => {
        let currentPlayer = player[Q];
        console.log(Q)
        console.log(data)
        console.log(player.length)
        // console.log(currentPlayer)
        console.log(currentPlayer.q)
        if (currentPlayer.q = data) {
            rollDice();
            Q++;
            if (Q >= player.length) {
                Q = 0;
            }
        }
        else{
            pass
        }
    })

    socket.on('test',data => {
        // console.log(data)
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

    io.emit('create_players',(player))

    let position = 89;
    if (currentPlayer.position >= position) {
        console.log("Player has won!");
        alert(currentPlayer, "Player has won!")
        hasWon = true;
    }

    Q++;
    console.log(Q)
    if (Q >= player.length) {
        Q = 0;
    }
    // console.log(currentPlayer.position)
}