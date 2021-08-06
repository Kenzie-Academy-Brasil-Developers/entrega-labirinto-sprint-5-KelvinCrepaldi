//replaceMap
//restartGame
//startGame

let map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];
map = createMap(map)
let playerX = 0;
let playerY = 9;
let game = document.getElementById('game');
let fim = this.document.getElementById('tela-vitoria');

//recria o mapa para usar x e y
function createMap(map){
    let newmap = []
    for(let x = 0; x < map.length; x++){
        let line = map[x].split("");
        newmap.push(line)
    }
    console.log(newmap)
    return newmap;
}

//atualiza a parte visual
function replaceMap(){
    let mainContainer = document.getElementById('game');

    for(let x = 0; x < map.length; x++){
        let initLine = document.createElement('div');
        initLine.classList.add('initLine-style')
        for(y = 0; y < 21; y++){

            let createBox = document.createElement('div')
            createBox.classList.add('box')

            //parede
            if(map[x][y] === 'W'){
                createBox.classList.add('box-wall')
            }
            //vazio
            if(map[x][y] === ' '){
                createBox.classList.add('box-empty')
            }
            //jogador
            if(map[x][y] === 'S'){
                createBox.classList.add('box-player')
            }
            //final
            if(map[x][y] === 'F'){
                createBox.classList.add('box-end') 
            }
            initLine.appendChild(createBox); 
        }
        mainContainer.appendChild(initLine);
    }
}
replaceMap()

addEventListener('keydown', function(e){

    game.innerHTML= ''
    let keyName = e.key;

    if(keyName === 'ArrowUp'){
        if(map[playerY-1][playerX] !== 'W'){
            map[playerY-1][playerX] = "S"
            map[playerY][playerX] = " "
            playerY = playerY-1
        }
    }
    if(keyName === 'ArrowDown'){
        if(map[playerY+1][playerX] !== 'W'){
            map[playerY+1][playerX] = "S"
            map[playerY][playerX] = " "
            playerY = playerY+1
        }
    }
    if(keyName === 'ArrowLeft'){
        if(map[playerY][playerX-1] !== 'W'){
            map[playerY][playerX-1] = "S"
            map[playerY][playerX] = " "
            playerX = playerX-1
        }
    }
    if(keyName === 'ArrowRight'){
        if(map[playerY][playerX+1] !== 'W'){
            map[playerY][playerX+1] = "S"
            map[playerY][playerX] = " "
            playerX = playerX+1
        }
    }
    
    //condicao de vitoria
    if(playerX === 20 && playerY === 8){
        fim.style.display = 'block'
        
    }

    //correcao da borda do mapa
    if(playerX === -1 && playerY === 9){
        map[playerY][playerX] = "F"
        map[9][0] = "S"
        playerX=0;
        playerY=9;
    }
    if(playerX === 21 && playerY === 8){
        map[playerY][playerX-1] = "S"
    }

    replaceMap()
});

let botao = document.getElementById('restart');
botao.addEventListener('click', function(e){
    fim.style.display = 'none'
    map[playerY][playerX]=' '
    map[8][20] = "F"
    map[9][0] = "S"
    playerX=0;
    playerY=9;
    game.innerHTML=''
    replaceMap()
})