function getComputerChoice(){
    const comp = Math.random();
    if(comp < 0.34) return 'gajah';
    if(comp >= 0.34 && comp < 0.67) return 'orang';
    return 'semut';
}

function getResult(computer, player){
    if (player === computer) return 'Seri';
    if (player === 'gajah') {
        if (computer === 'orang') return 'Menang';
        if (computer === 'semut') return 'Kalah';
    }
    if (player === 'orang') {
        if (computer === 'gajah') return 'Kalah';
        if (computer === 'semut') return 'Menang';
    }
    if (player === 'semut') {
        if (computer === 'gajah') return 'Menang';
        if (computer === 'orang') return 'Kalah';
    }

}

function turn(){
    const imgComputer = document.querySelector('.img-komputer');
    const image = ['gajah', 'semut', 'orang'];
    let i = 0;
    const startTime = new Date().getTime();
    setInterval(function() {
        if(new Date().getTime() - startTime > 1000){
            clearInterval();
            return;
        }
        imgComputer.setAttribute('src', `img/${image[i++]}.png`);
        if(i == image.length) i = 0;
    }, 100);
}


const imgP = document.querySelectorAll('li img');
imgP.forEach(function(imgButton){
    imgButton.addEventListener('click', function(){
        const computerChoice = getComputerChoice();
        const playerChoice = imgButton.className;
        const result = getResult(computerChoice, playerChoice);

        turn();

        console.log(computerChoice);
        console.log(playerChoice);

        setTimeout(function(){
            const info = document.querySelector('.info');
            const imgComp = document.querySelector('.img-komputer');
            imgComp.setAttribute(`src`, `img/${computerChoice}.png`);
            info.innerHTML = result;
        }, 1000);
    });
})
