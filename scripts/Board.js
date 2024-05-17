const startButton = (function(){
    let startBtn = document.querySelector('header');
    let outerCircle = document.querySelector('.outerCircle');
    let innerCirlce = document.querySelector('.innerCircle');
    let gameBoard = document.querySelector('.board');
    startBtn.addEventListener('click', startFunc);
    function startFunc(){
        outerCircle.style.opacity = 1;
        innerCirlce.style.animation = `bg 1s`;
        setTimeout(()=>{
            startBtn.style.transform = `translateY(0)`;
            innerCirlce.style.opacity = 1;
            innerCirlce.style.animation = `bg 5s infinite`;
            gameBoard.style.display = `grid`;
            gameBoard.style.opacity = 0;
        }, 1000);
        setTimeout(()=>{
            gameBoard.style.opacity = 1;
        }, 1200)
        events.emit('playerSwitch', startBtn);
    }
    setTimeout(()=>{
        startBtn.removeEventListener('click', startFunc);
    }, 1500);
})();

const gameOverAnim = (function(){
    let movingTexts = document.querySelectorAll('header > p, header > button');
    let winnerText = document.querySelector('header > p:nth-child(3)');
    let replayBtn = document.querySelector('header > button');
    let player;
    events.on('player', (p)=>{
        player = p;
        if(player.wonStatus){
            winnerText.innerHTML = `Player ${player.sign} wins!`;
            animAndReplayBtn();
        }
    });
    events.on('TIE', (obj)=>{
        if(obj.tieCheck == 9 && !obj.player.wonStatus){
            winnerText.innerHTML = `It's a TIE!`;
            animAndReplayBtn();
        }
    });
    function animAndReplayBtn(){
        movingTexts.forEach(movingText=>{
            movingText.style.animation = `toGameOver 1s forwards, toPlayerWins 1s 2s forwards, toReplayBtn 1s 4s forwards`;
        });
        replayBtn.addEventListener('click', ()=>{
            location.reload();
        });
    }
})();

const theBoard = (function(){
    const board = [];
    for(let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3; j++){
            board[i][j] = " ";
        }
    }
    window.addEventListener('DOMContentLoaded', ()=>{
        events.emit('board', board);
    });
})()

const DOMBoard = (function(){
    let grid = [];
    for(let i = 0; i < 3; i++){
        grid[i] = [];
        for(let j = 0; j < 3; j++){
            grid[i][j] = document.querySelector(`.box:nth-child(${i*3+j+1})`);
        }
    }
    events.on('player', (p)=>{
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                grid[i][j].innerHTML = p.sign;
            }
        }
        if(p.wonStatus){
            for(let i = 0; i < 3; i++){
                for(let j = 0; j < 3; j++){
                    if(grid[i][j] != ''){
                        grid[i][j].innerHTML = "";
                        grid[i][j].style.cursor = 'not-allowed';
                    }
                }
            }
            grid = '';
        }
    });

    for(let i = 0; i < 3; i++){
        for(let j = 0; j < 3; j++){
            grid[i][j].addEventListener('click', ()=>{
                let pos = {i,j};
                grid[i][j].style.color = `rgb(255, 163, 77)`;
                events.emit('CurrentPlayerPos', pos);
                grid[i][j].style.cursor = `not-allowed`;
                grid[i][j] = '';
                events.emit('playerSwitch', grid);
            });
        }
    };
    let player;
    events.on('VerticalWin', (i)=>{
        document.querySelector(`.box:nth-child(${i+1})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${i+1})`).style.color = `rgb(255, 124, 0)`;
        document.querySelector(`.box:nth-child(${i+4})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${i+4})`).style.color = `rgb(255, 124, 0)`;
        document.querySelector(`.box:nth-child(${i+7})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${i+7})`).style.color = `rgb(255, 124, 0)`;
    });
    events.on('HorizontalWin', (i)=>{
        document.querySelector(`.box:nth-child(${(i*3)+1})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${(i*3)+1})`).style.color = `rgb(255, 124, 0)`;
        document.querySelector(`.box:nth-child(${(i*3)+2})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${(i*3)+2})`).style.color = `rgb(255, 124, 0)`;
        document.querySelector(`.box:nth-child(${(i*3)+3})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${(i*3)+3})`).style.color = `rgb(255, 124, 0)`;
    });
    events.on('PDiagWin', (p)=>{
        player = p;
        document.querySelector(`.box:nth-child(${1})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${1})`).style.color = `rgb(255, 124, 0)`;
        document.querySelector(`.box:nth-child(${5})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${5})`).style.color = `rgb(255, 124, 0)`;
        document.querySelector(`.box:nth-child(${9})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${9})`).style.color = `rgb(255, 124, 0)`;
    });
    events.on('ODiagWin', (player)=>{
        player;
        document.querySelector(`.box:nth-child(${3})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${3})`).style.color = `rgb(255, 124, 0)`;
        document.querySelector(`.box:nth-child(${5})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${5})`).style.color = `rgb(255, 124, 0)`;
        document.querySelector(`.box:nth-child(${7})`).style.backgroundColor = `rgb(255, 163, 77)`;
        document.querySelector(`.box:nth-child(${7})`).style.color = `rgb(255, 124, 0)`;
    });
    events.on('TIE', (obj)=>{
        if(obj.tieCheck == 9 && !obj.player.wonStatus){
            let boxes = document.querySelectorAll('.box');
            boxes.forEach(box=>{
                box.style.backgroundColor = `rgb(255, 163, 77)`;
                box.style.color = `rgb(255, 124, 0)`;
            });
        }
    });
})();

const updateBoard = (function(){
    let player;
    let gameBoard;
    events.on('board', (board)=>{
        gameBoard = board;
    })
    events.on('player', (p)=>{
        player = p;
    });
    function upBrd(pos){
        gameBoard[pos.i][pos.j] = player.sign;
    }
    events.on('CurrentPlayerPos', (pos)=>{
        upBrd(pos);
        gameOver.gEnd();
    });
})();

const players = (function(){
    function player(sign, currentPos, playerTurn, wonStatus){
        return {sign, currentPos, playerTurn, wonStatus};
    }
    p1 = player('X', '', true, false);
    p2 = player('O', '', false, false);
    let gameBoard;
    events.on('board', (board)=>{
        gameBoard = board;
    });
    const playerSwitch = function(){
        if(p1.wonStatus || p2.wonStatus){
            // alert('Game OVER (Wanna start a new one? Reload the page)');
            if(p1.wonStatus){
                events.emit('player', p1);
            }
            else{
                events.emit('player', p2);
            }
        }
        else{
            if(p1.playerTurn){
                p1.playerTurn = false;
                p2.playerTurn = true;
                events.emit('player', p1);
                return;
            }
            else{
                p2.playerTurn = false;
                p1.playerTurn = true;
                events.emit('player', p2);
                return;
            }
        }
    }  
    events.on('playerSwitch', (grid)=>{
        grid;
        playerSwitch();
    }); 

})();

const gameOver = (function(){
    let gameBoard;
    let player;
    events.on('board', (board)=>{
        gameBoard = board;
    });
    events.on('player', (p)=>{
        player = p;
    });
    const gEnd = ()=>{
        let tieCheck = 0;
        for(let i = 0 ; i < 3; i++){
            if(gameBoard[0][i] == player.sign && gameBoard[1][i] == player.sign && gameBoard[2][i] == player.sign){
                player.wonStatus = true;
                events.emit('VerticalWin', i);
            }
            else if(gameBoard[i][0] == player.sign && gameBoard[i][1] == player.sign && gameBoard[i][2] == player.sign){
                player.wonStatus = true;
                events.emit('HorizontalWin', i);
            }
            // else{
            //     for(let m = 0; m < 3; m++){
            //         for(let n = 0; n < 3; n++){
            //             if(gameBoard[m][n] != ' '){
            //                 tieCheck++;
            //             }
            //         }
            //     }
            //     events.emit('TIE', tieCheck);
            // }
        }
        if(gameBoard[0][0] == player.sign && gameBoard[1][1] == player.sign && gameBoard[2][2] == player.sign){
            player.wonStatus = true;
            events.emit('PDiagWin', player);
        }
        else if(gameBoard[0][2] == player.sign && gameBoard[1][1] == player.sign && gameBoard[2][0] == player.sign){
            player.wonStatus = true;
            events.emit('ODiagWin', player);
        }
        else{
            for(let m = 0; m < 3; m++){
                for(let n = 0; n < 3; n++){
                    if(gameBoard[m][n] != ' '){
                        tieCheck++;
                    }
                }
            }
            events.emit('TIE', {tieCheck, player});
        }
    };
    return {gEnd};
})();