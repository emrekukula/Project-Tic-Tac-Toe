Array.prototype.containsArray = function(val) {
    var hash = {};
    for(var i=0; i<this.length; i++) {
        hash[this[i]] = i;
    }
    return hash.hasOwnProperty(val);
}


function createUser(name) {

    this.name = name;

    let winCount = 0;

    function win() {
        winCount++;
    }


    return {
        name,
        win,
        winCount,
    }
}

const game = (function() {

    const divs = document.querySelectorAll('.divs');
    const turn = document.querySelector('.turn');
    const result = document.querySelector('.result');
    const restart = document.querySelector('.restart');
    const submit = document.querySelector('.submit');
    const user1 = document.getElementById('user1')
    const user2 = document.getElementById('user2')
    const playerDisplay1 = document.querySelector('.playerDisplay1');
    const playerDisplay2 = document.querySelector('.playerDisplay2');
    const countDisplay1 = document.querySelector('.countDisplay1');
    const countDisplay2 = document.querySelector('.countDisplay2');

    let gameBoard =['', '', '', '', '', '', '', '', ''];

    let indexArrayX = [];
    let indexArrayO = [];

    const winners = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];



    function filterX() {

        for (let i = 0;i < gameBoard.length; i++) {
            if (gameBoard[i] == "x" && !indexArrayX.includes(i)) {
                indexArrayX.push(i);
                indexArrayX.sort();
            }
         }
         checkWinX();
    }

    function filterO() {

        for (let i = 0;i < gameBoard.length; i++) {
            if (gameBoard[i] == "o" && !indexArrayO.includes(i)) {
                indexArrayO.push(i);
                indexArrayO.sort();
            }
         }
         checkWinO();
    }

    let winCount1 = 0;
    let winCount2 = 0;
    let run = false;

    function checkWinX() {
        let slicedArrayX = ['', ''];
        console.log(slicedArrayX)
        for ( let i = 0; i < 4; i++) {
            slicedArrayX.splice(i, 0, indexArrayX.slice(i, i + 3));
        }

        for ( let i = 0; i < 4; i++) {

            //  if contains the array and anyone haven't won yet 
            if ((winners.containsArray(slicedArrayX[i]) == true && (run == false) ) ||
                (gameBoard[i] == 'x' && gameBoard[i + 4] == 'x' && 
                gameBoard[i + 8] == 'x' )) {
                result.textContent = 'X WINS';
                winCount1++
                run = true;
                setTimeout(restartGame, 3000);
            }
        } 
        renderWin1(winCount1)
    }

    function checkWinO() {
        let slicedArrayO = ['', ''];

        for ( let i = 0; i < 4; i++) {
            slicedArrayO.splice(i, 0, indexArrayO.slice(i, i + 3));
        }

        for ( let i = 0; i < 4; i++) {
            if ((winners.containsArray(slicedArrayO[i]) == true && (run == false) ) ||
                (gameBoard[i] == 'o' && gameBoard[i + 4] == 'o' && 
                gameBoard[i + 8] == 'o' )) {
                result.textContent = 'O WINS';
                winCount2++
                run = true;
                setTimeout(restartGame, 3000);
            }
        } 
        renderWin2(winCount2)
    }

    function renderWin1(winCount1) {
        countDisplay1.textContent = winCount1 + ' ' + 'wins';
    }

    function renderWin2(winCount2) {
        countDisplay2.textContent = winCount2 + ' ' + 'wins';
    }


    function render() {
        let i = 0;
        divs.forEach((div) => {
            div.textContent = gameBoard[i];
            i++;
        })
    }
    
    let counter = 0;
    
    for (let i = 0; i < divs.length; i++) {
        divs[i].addEventListener("click", () => {
            
            if ( divs[i].textContent !== '') {
                return;
            } else if (counter % 2 == 1) {
                addO(i);
                turn.textContent = 'turn: x';
                counter++;
            } else if (counter % 2 == 0) {
                addX(i);
                turn.textContent = 'turn: o';
                counter++;
            } else {
                return;
            }
            console.log(counter)
        })
    }

    divs.forEach(e => {
        e.addEventListener('click', filterX);
    })

    divs.forEach(e => {
        e.addEventListener('click', filterO);
    })

    window.addEventListener('click', () => {
        if ( counter == 9 && result.textContent == '') {
            result.textContent = 'GAME IS A TIE'
        }
    })

    restart.addEventListener('click', () => {
        restartGame();
        counter = 0;
    });

    submit.addEventListener('click', (e) => {
        e.preventDefault();

        const userInfo1 = user1.value;
        const userInfo2 = user2.value;

        newPlayer(userInfo1, userInfo2);
    });

    function newPlayer(play1, play2) {
        const player1 = createUser(play1);
        const player2 = createUser(play2);

        playerDisplay1.textContent = '(X)' + ' ' + player1.name;
        playerDisplay2.textContent = '(O)' + ' ' + player2.name;
    }

    function addX(i) {
        gameBoard.slice( i, i+ 1, 'x');
        gameBoard[i] = 'x';
        divs[i].textContent = 'x';
    }

    function addO(i) {
        gameBoard.slice( i, i+ 1, 'o');
        gameBoard[i] = 'o';
        divs[i].textContent = 'o';
    }

    function restartGame() {
         gameBoard =['', '', '', '', '', '', '', '', '']
         slicedArrayX = ['', ''];
         slicedArrayY = ['', ''];
         indexArrayO = [];
         indexArrayX = [];  
         result.textContent = '';
         turn.textContent = 'turn: x';
         run = false;

         for (let i = 0; i < divs.length; i++) {
             divs[i].textContent = '';
         }
    }

    render();
    
    return {
        addX: addX,
    }
})();
