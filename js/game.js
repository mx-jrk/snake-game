//canvas
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

//drawingGameElements
const ground = new Image();
const food = new Image();
const tox = new Image();

ground.src = "img/ground.png";
food.src = "img/food.png";
tox.src = 'img/tox.png'


//Var's
let box = 32;
cheat = false;
bot = false;
dir='',
score = 0,
GameSpeed = Number(prompt('Выберите скорость от 1 до 10')),
mbTox = confirm('Включить ловушки?'),
botPlay = confirm('Включить бота?');;
if (GameSpeed == 228 && !botPlay) {
    cheat = true;
    GameSpeed = 5;
} else if (botPlay) {
    GameSpeed = prompt('Выберите скорость бота');
    bot = true;
}

let toxCoordinates = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}
let foodCoordinates = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box,
}

let snakeHeadCoordinates = [];
snakeHeadCoordinates[0] = {
    x: 9 * box,
    y: 10 * box,
}
let snakeHeadX = snakeHeadCoordinates[0].x;
let snakeHeadY = snakeHeadCoordinates[0].y;

//Functions
//---------------------------------------------------------------------------------------------------------------------------------
function gameOver() {
    clearInterval(game);
    alert('Вы проиграли со счётом: ' + score);
}

document.addEventListener("keydown", direction);
function direction(event) {
    if (bot != false) return;
    if ((event.keyCode == 37 || event.keyCode == 65) && dir != 'right')
        dir = "left"
    else if ((event.keyCode == 38 || event.keyCode == 87) && dir != 'down')
        dir = "up"
    else if ((event.keyCode == 39 || event.keyCode == 68) && dir != 'left')
        dir = "right"
    else if ((event.keyCode == 40 || event.keyCode == 83) && dir != 'up')
        dir = "down";

}

function respawnTox() {
    let toxX = Math.floor(Math.random() * 17 + 1) * box;
    let toxY = Math.floor(Math.random() * 15 + 3) * box;
    while (spawTox(toxX, toxY) != true) {
        toxX = Math.floor(Math.random() * 17 + 1) * box;
        toxY = Math.floor(Math.random() * 15 + 3) * box;
    }
    toxCoordinates = {
        x: toxX,
        y: toxY,
    }
}

function spawTox(x, y) {
    if (x == foodCoordinates.x && y == foodCoordinates.y) return false;
    if ((Math.abs(x - snakeHeadCoordinates[0].x) < 3 * box) && (Math.abs(y - snakeHeadCoordinates[0].y) < 3 * box)) return false;
    for (let i = 0; i < snakeHeadCoordinates.length; i++) {
        if (x == snakeHeadCoordinates[i].x && y == snakeHeadCoordinates[i].y) return false;
    }
    return true;
}

function spawnFood(x, y) {
    for (let i = 0; i < snakeHeadCoordinates.length; i++) {
        if (x == snakeHeadCoordinates[i].x && y == snakeHeadCoordinates[i].y) return false;
    }
    return true;
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x == arr[i].x && head.y == arr[i].y) return true
    }
    return false;
}

function checkBotStep(Xt, Yt, testarr) {
    let testNewHead = {
        x: Xt,
        y: Yt,
    }
    if (eatTail(testNewHead, testarr) == false && (Xt != toxCoordinates.x || Yt != toxCoordinates.y)) return true
    else return false;

}

//Bot
function botGame() {
    //Соотношение координат гловы змеи с координатами фрукта + проверка будущего шага
    if (snakeHeadX < foodCoordinates.x) {
        console.log(1);
        if (dir != 'left' && snakeHeadX < box * 17 && checkBotStep(snakeHeadX + box, snakeHeadY, snakeHeadCoordinates) == true) dir = 'right'
        else if (dir != 'down' && snakeHeadY > 3 * box && checkBotStep(snakeHeadX, snakeHeadY - box, snakeHeadCoordinates) == true) dir = 'up'
        else if (dir != 'up' && snakeHeadY < box * 17 && checkBotStep(snakeHeadX, snakeHeadY + box, snakeHeadCoordinates) == true) dir = 'down'
        else if (dir != 'right' && snakeHeadX > box && checkBotStep(snakeHeadX - box, snakeHeadY, snakeHeadCoordinates) == true) dir = 'left';

    } else if (snakeHeadX > foodCoordinates.x) {
        console.log(2);
        if (dir != 'right' && snakeHeadX > box && checkBotStep(snakeHeadX - box, snakeHeadY, snakeHeadCoordinates) == true) dir = 'left'
        else if (dir != 'down' && snakeHeadY > 3 * box && checkBotStep(snakeHeadX, snakeHeadY - box, snakeHeadCoordinates) == true) dir = 'up'
        else if (dir != 'up' && snakeHeadY < box * 17 && checkBotStep(snakeHeadX, snakeHeadY + box, snakeHeadCoordinates) == true) dir = 'down'
        else if (dir != 'left' && snakeHeadX < box * 17 && checkBotStep(snakeHeadX + box, snakeHeadY, snakeHeadCoordinates) == true) dir = 'right';
    } else if (snakeHeadY > foodCoordinates.y) {
        console.log(3);
        if (dir != 'down' && snakeHeadY > 3 * box && checkBotStep(snakeHeadX, snakeHeadY - box, snakeHeadCoordinates) == true) dir = 'up'
        else if (dir != 'right' && snakeHeadX > box && checkBotStep(snakeHeadX - box, snakeHeadY, snakeHeadCoordinates) == true) dir = 'left'
        else if (dir != 'left' && snakeHeadX < box * 17 && checkBotStep(snakeHeadX + box, snakeHeadY, snakeHeadCoordinates) == true) dir = 'right'
        else if (dir != 'up' && snakeHeadY < box * 17 && checkBotStep(snakeHeadX, snakeHeadY + box, snakeHeadCoordinates) == true) dir = 'down';
    } else if (snakeHeadY < foodCoordinates.y) {
        console.log(4);
        if (dir != 'up' && snakeHeadY < box * 17 && checkBotStep(snakeHeadX, snakeHeadY + box, snakeHeadCoordinates) == true) dir = 'down'
        else if (dir != 'right' && snakeHeadX > box && checkBotStep(snakeHeadX - box, snakeHeadY, snakeHeadCoordinates) == true) dir = 'left'
        else if (dir != 'left' && snakeHeadX < box * 17 && checkBotStep(snakeHeadX + box, snakeHeadY, snakeHeadCoordinates) == true) dir = 'right'
        else if (dir != 'down' && snakeHeadY > 3 * box && checkBotStep(snakeHeadX, snakeHeadY - box, snakeHeadCoordinates) == true) dir = 'up';
    }
}
//---------------------------------------------------------------------------------------------------------------------------------
//GameCode
function drawGame() {
    //Отрисовка
    ctx.drawImage(ground, 0, 0);
    ctx.drawImage(food, foodCoordinates.x, foodCoordinates.y);
    if (mbTox == true) ctx.drawImage(tox, toxCoordinates.x, toxCoordinates.y);
    for (let i = 0; i < snakeHeadCoordinates.length; i++) {
        if (i == 0) ctx.fillStyle = "red";
        else ctx.fillStyle = 'green';
        ctx.fillRect(snakeHeadCoordinates[i].x, snakeHeadCoordinates[i].y, 25, 25)
    }
    ctx.fillStyle = "white";
    ctx.font = "50px Arial";
    ctx.fillText(score, box * 2.5, box * 1.7);

    //Проверка на съедание фрукта. Респавн ловушки и фрукта
    if (snakeHeadX == foodCoordinates.x && snakeHeadY == foodCoordinates.y) {
        score++;
        let foodX = Math.floor(Math.random() * 17 + 1) * box;
        let foodY = Math.floor(Math.random() * 15 + 3) * box;
        while (spawnFood(foodX, foodY) != true) {
            foodX = Math.floor(Math.random() * 17 + 1) * box;
            foodY = Math.floor(Math.random() * 15 + 3) * box;
        }
        foodCoordinates = {
            x: foodX,
            y: foodY,
        }
        if (mbTox == true) respawnTox();
        console.log(foodCoordinates);
    } else if (mbTox == true && snakeHeadX == toxCoordinates.x && snakeHeadY == toxCoordinates.y) {
        if (snakeHeadCoordinates.length == 1) gameOver();
        respawnTox();
        snakeHeadCoordinates.pop();
        snakeHeadCoordinates.pop();
        score--;
    } else {
        snakeHeadCoordinates.pop();
    }
    //console.log(snakeHeadX, snakeHeadY);

    //Проверка на врезание в стену
    if ((cheat == false) && (snakeHeadX < box || snakeHeadX > box * 17 || snakeHeadY < 3 * box || snakeHeadY > box * 17))
        gameOver();

    //Управление змеёй
    if (bot == true) {

        botGame();
    }
    //snakeHeadCoordinates.pop();
    if (dir == 'left') snakeHeadX -= box;
    if (dir == 'right') snakeHeadX += box;
    if (dir == 'down') snakeHeadY += box;
    if (dir == 'up') snakeHeadY -= box;

    let newHead = {
        x: snakeHeadX,
        y: snakeHeadY
    }

    //Проверка на врезание в хвотс
    if (cheat == false && eatTail(newHead, snakeHeadCoordinates) == true)
        gameOver();
    snakeHeadCoordinates.unshift(newHead);


}

let game = setInterval(drawGame, 500 / GameSpeed);