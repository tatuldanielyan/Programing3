//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/Predator.js");
var Man = require("./modules/Man.js");
var Killer = require("./modules/Killer.js");
let random = require('./modules/random');
//! Requiring modules  --  END

//! Initializing global arrays  --  START
grassArr = [];
grassEaterArr = [];
predatorArr = [];
manArr = [];
killerArr = [];
matrix = [];
//! Initializing global arrays  --  END

// statistics start
grassHashiv = 0;
grassEaterHashiv = 0;
predatorHashiv = 0;
manHashiv = 0;
killerHashiv = 0;
// statistics end

// time = 0
//! Creating MATRIX -- START

function matrixGenerator(matrixSize, grass, grasseater, predator, man, killer) {
    for (let i = 0; i < matrixSize; i++) {
        matrix[i] = [];
        for (let o = 0; o < matrixSize; o++) {
            matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grasseater; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 2;
    }
    for (let i = 0; i < predator; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 3;
    }
    for (let i = 0; i < man; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 4;
    }
    for (let i = 0; i < killer; i++) {
        let customX = Math.floor(random(matrixSize));
        let customY = Math.floor(random(matrixSize));
        matrix[customY][customX] = 5;
    }
}
matrixGenerator(40, 700, 30, 46, 40, 15);
//! Creating MATRIX -- END

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END

function creatingObjects() {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
                grassEaterHashiv++;
            } else if (matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
                grassHashiv++
            }
            else if (matrix[y][x] == 3) {
                var predator = new Predator(x, y);
                predatorArr.push(predator);
                predatorHashiv++
            }
            else if (matrix[y][x] == 4) {
                var man = new Man(x, y);
                manArr.push(man);
                manHashiv++
            }
            else if (matrix[y][x] == 5) {
                var killer = new Killer(x, y);
                killerArr.push(killer);
                killerHashiv++
            }
        }
    }
}

creatingObjects();

let exanak = 0;
let weather = "winter"

function game() {

    exanak++;
    if (exanak <= 10){
        weather = "summer"
    }else if (exanak <= 20){
        weather = "autumn"
    }else if (exanak > 20){
        exanak = 0
    }


    if (grassArr[0] !== undefined) {
        for (var i in grassArr) {
            grassArr[i].mul();
        }
    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
          grassEaterArr[i].eat();
        }
    }
    if (predatorArr[0] !== undefined) {
        for (var i in predatorArr) {
          predatorArr[i].eat();
        }
    }
    if (manArr[0] !== undefined) {
        for (var i in manArr) {
          manArr[i].eat();
        }
    }
    if (killerArr[0] !== undefined) {
        for (var i in killerArr) {
          killerArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        matrix: matrix,
        grassCounter: grassHashiv,
        grassLiveCounter: grassArr.length,
        grassEaterCounter: grassEaterHashiv,
        predatorCounter: predatorHashiv,
        manCounter: manHashiv,
        killerCounter: killerHashiv,
        weather: weather
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)
