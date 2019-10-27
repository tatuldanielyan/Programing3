function setup() {
    var socket = io();
    var side = 15;
    var matrix = [];

    // ! Getting DOM objects (HTML elements)
    let weatherElement = document.getElementById('weather');
    let grassCountElement = document.getElementById('grassCount');
    let grassLiveCountElement = document.getElementById('grassLiveCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let grassEaterLiveCountElement = document.getElementById('grassEaterLiveCount');
    let predatorCountElement = document.getElementById('predatorCount');
    let predatorLiveCountElement = document.getElementById('predatorLiveCount');
    let manCountElement = document.getElementById('manCount');
    let manLiveCountElement = document.getElementById('manLiveCount');
    let killerCountElement = document.getElementById('killerCount');
    let killerLiveCountElement = document.getElementById('killerLiveCount');
    let titanCountElement = document.getElementById('titanCount');
    let titanLiveCountElement = document.getElementById('titanLiveCount');
    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);

    function drawCreatures(data) {


        // let sendData = {
        //     matrix: matrix,
        //     grassCounter: grassHashiv,
        //     grassLiveCounter: grassArr.length,
        //     eatCounter: eatHashiv,
        //     huntCounter: huntHashiv,
        //     termCounter: termHashiv,
        //     titanCounter: titanHashiv,
        //     weather: weather
        // }

        //! after getting data pass it to matrix variable
        matrix = data.matrix;
        weatherElement.innerText = data.weather; "summer"
        grassCountElement.innerText = data.grassCounter;
        grassLiveCountElement.innerText = data.grassLiveCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        grassEaterLiveCountElement.innerText = data.grassEaterLiveCounter;
        predatorCountElement.innerText = data.predatorCounter;
        predatorLiveCountElement.innerText = data.predatorLiveCounter;
        manCountElement.innerText = data.manCounter;
        manLiveCountElement.innerText = data.manLiveCounter;
        killerCountElement.innerText = data.killerCounter;
        killerLiveCountElement.innerText = data.killerLiveCounter;
        titanCountElement.innerText = data.titanCounter;
        titanLiveCountElement.innerText = data.titanLiveCounter;
        //! Every time it creates new Canvas with new matrix size
        createCanvas(matrix[0].length * side, matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < matrix.length; i++) {
            for (var j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] == 1) {
                    if (data.weather == "spring") {
                        fill("green");
                    } else if (data.weather == "summer") {
                        fill("#00b300");
                    } else if (data.weather == "autumn") {
                        fill("#004d00");
                    }
                    else if (data.weather == "winter") {
                        fill("white");
                    }
                } else if (matrix[i][j] == 2) {
                    if (data.weather == "spring") {
                        fill("orange");
                    } else if (data.weather == "summer") {
                        fill("#ffaf1a");
                    } else if (data.weather == "autumn") {
                        fill("#e69500");
                    }
                    else if (data.weather == "winter") {
                        fill("#ffc14d");
                    }
                } else if (matrix[i][j] == 0) {
                    fill('#acacac');
                } else if (matrix[i][j] == 3) {
                    if (data.weather == "spring") {
                        fill("red");
                    } else if (data.weather == "summer") {
                        fill("#ff1a1a");
                    } else if (data.weather == "autumn") {
                        fill("#cc0000");
                    }
                    else if (data.weather == "winter") {
                        fill("#ff3333");
                    }
                } else if (matrix[i][j] == 4) {
                    if (data.weather == "spring") {
                        fill("blue");
                    } else if (data.weather == "summer") {
                        fill("#1a1aff");
                    } else if (data.weather == "autumn") {
                        fill("#000099");
                    }
                    else if (data.weather == "winter") {
                        fill("#3333ff");
                    }
                } else if (matrix[i][j] == 5) {
                    if (data.weather == "spring") {
                        fill("black");
                    } else if (data.weather == "summer") {
                        fill("#1a1a1a");
                    } else if (data.weather == "autumn") {
                        fill("#333333");
                    }
                    else if (data.weather == "winter") {
                        fill("#404040");
                    }
                }
                else if (matrix[i][j] == 6) {
                    if (data.weather == "spring") {
                        fill("#cc33ff");
                    } else if (data.weather == "summer") {
                        fill("#d24dff");
                    } else if (data.weather == "autumn") {
                        fill("#ac00e6");
                    }
                    else if (data.weather == "winter") {
                        fill("#d966ff");
                    }
                    
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}