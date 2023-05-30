function getComputerChoice(){
    const computer = Math.random();
    if(computer < 0.34) return 'gajah';
    if(computer >= 0.34 && computer > 0.67 ) return 'orang';
    return 'semut';
}

function getResult(computer, player){
    if(player == computer) return 'Seri';
    if(player == 'gajah') return (computer == 'orang') ? 'Menang' : 'Kalah';
    if(player == 'orang') return (computer == 'gajah') ? 'Kalah' : 'Menang';
    if(player == 'semut') return (computer == 'orang') ? 'Kalah' : 'Menang';
}

function turnImgComputer(){
    const getImgComputer = document.querySelector('.img-komputer');
    const startTime = new Date().getTime();
    const stringChoice = ['gajah', 'orang', 'semut'];
    let i = 0;
    setInterval(function(){
        if(new Date().getTime() - startTime > 1000){
            clearInterval();
            return;
        }
        getImgComputer.setAttribute('src', `img/${stringChoice[i++]}.png`);
        if(i == stringChoice.length) i = 0;
    }, 100);
}

function countScore(result){
    const sComputer = document.querySelector('.count-sComputer');
    const sPlayer = document.querySelector('.count-sPlayer');

    let scoreComputer = parseInt(localStorage.getItem('scoreComputer')) || 0;
    let scorePlayer = parseInt(localStorage.getItem('scorePlayer')) || 0;

    if(result === 'Menang'){
        if(scoreComputer === 0){
            scorePlayer += 100;
            scoreComputer += 0;
        }else{
            scorePlayer += 100;
            scoreComputer -= 50;
        }
        sComputer.textContent = scoreComputer;
        sPlayer.textContent = scorePlayer;
        localStorage.setItem('scorePlayer', scorePlayer);
        localStorage.setItem('scoreComputer', scoreComputer);           
    }else if(result === 'Kalah'){
        if(scorePlayer === 0){
            scoreComputer += 100;
            scorePlayer += 0;
        }else{
            scoreComputer += 100;
            scorePlayer -= 50;
        }        
        sComputer.textContent = scoreComputer;
        sPlayer.textContent = scorePlayer;
        localStorage.setItem('scorePlayer', scorePlayer);
        localStorage.setItem('scoreComputer', scoreComputer);
    }else{
        scorePlayer = scorePlayer;
        scoreComputer = scoreComputer;
        sComputer.textContent = scoreComputer;
        sPlayer.textContent = scorePlayer;
        localStorage.setItem('scorePlayer', scorePlayer);
        localStorage.setItem('scoreComputer', scoreComputer);
    }
}


const imgPlayer = document.querySelectorAll('li img');
imgPlayer.forEach(function(choice){
    choice.addEventListener('click', function(){
        const playerChoice = choice.className;
        const computerChoice = getComputerChoice();
        const result = getResult(computerChoice, playerChoice);

        turnImgComputer();
        countScore();
        
        setTimeout(function(){
        countScore(result);
        const getClassInfo = document.querySelector('.info');
        const getImgComputer = document.querySelector('.img-komputer');
        getClassInfo.innerHTML = result;

        getImgComputer.setAttribute('src', `img/${computerChoice}.png`);
        }, 1000);
    });
});

window.addEventListener('load', function(){
    localStorage.setItem('scorePlayer', 0);
    localStorage.setItem('scoreComputer', 0);
});