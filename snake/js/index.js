// Переменные
let inputDir = {x: 0, y: 0}; 
let playAgain = document.getElementById("btn");
let speed = 3;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 5, y: 5},    
]

let food = {x: 6, y: 7};

// ОСновные функции игры

function main(currentTime) {
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = currentTime;
    playGame();
}


function isCollide(snake) {
    // если врезаться в самого себя
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // если врезаться в стену
    if(snake[0].x >= 10 || snake[0].x <=0 || snake[0].y >= 10 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function playGame(){

    // обновляем змейку и еду
    if(isCollide(snakeArr)){
  
        inputDir =  {x: 0, y: 0}; 
        playAgain.style.display = "block";
        snakeArr = [{x: 5, y: 5}];
        score = 0; 
        speed = 3;
    }

    // если скушали еду увеличиваем счет  и вставляем его в соответствующий блок, увеличиваем скорость, возобновляем появление еды
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
     
        score += 1;
        speed += 0.3;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "Лучший результат: " + hiscoreval;
        }
        scoreBox.innerHTML = "Счёт: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 9;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // двигаем змейкой
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

   
    // отрисовка змейки
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // отрисовка еды
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// записываем результат в локал localstorage и выводим  его в начале новой игры

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Лучший результат: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // начало игры
    playAgain.style.display = "none";
   
// движение по стрелочкам

    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});