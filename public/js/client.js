(function connect() {
  let socket = io.connect("http://localhost:3000")

  var players = [];
  var playerq = [];

  socket.on('create_players', data => {
    // console.log(data)
    players = data;
    console.log(players)
    renderBoard();
    socket.emit('test',(players))
  })

  socket.on('players_q', data => {
    playerq.push(data);
    // console.log(playerq[0])
    // console.log(data)
  })

  rollDice = () => {
    socket.emit('currentPlayer',(playerq[0]))
  }

  const width = 9;
  const height = 9;
  const board = [];
  let position = 0;
  let blackSquare = false;


  for (var y = height; y >= 0; y--) {
    let row = [];

    board.push(row);
    for (var x = 0; x < width; x++) {
      row.push({ x, y, occupied: null, position })
      position++;

    }
  }

  const boardSizeConst = 50;
  const renderBoard = () => {
    let boardHTML = ``;
    board.forEach(row => {
      row.forEach(square => {
        boardHTML += `<div class=square style="top:${square.y * boardSizeConst}px; left:${square.x * boardSizeConst}px; background-color:${square.color}"></div>`
      });
    });
    players.forEach(player => {
      let square = null;
      board.forEach(row => {
        row.forEach(square => {
          if (square.position === player.position) {
            boardHTML += `<div class=player style="top:${square.y * boardSizeConst + 5}px; left:${square.x * boardSizeConst + 5}px;background-color:${player.color}"></div>`;
          }
        });
      });
    });


    document.getElementById("board").innerHTML = boardHTML;
  }

})();

// const players = [{
//   name:"Cloud",
//   position: 0,
//   color: "red"
// },{
//   name:"Sephiroth",
//   position: 0,
//   color: "blue"
// }];

let currentPlayerTurn = 0;
console.log(currentPlayerTurn)




// renderBoard();

// var playerse = [];
// console.log(playerse)
