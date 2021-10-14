// Specifies resources
let resources = {images:[
                  {id:"bar" , src:"images/bar.png"},
                  {id:"bird",src:"images/bird.png"},
                  {id:"day",src:"images/day.png"},
                  {id:"flappyend", src:"images/flappybird_end.png"},
                  {id:"logo", src:"images/logo.png"},
                  {id:"night", src:"images/night.png"},
                  {id:"pipebot",src:"images/pipe_bot.png"},
                  {id:"pipetop",src:"images/pipe_top.png"},
                  {id:"ring",src:"images/ring2.png"}
                  ],
                 audios:[
                   {id:"die" ,src:"audios/die.ogg"},
                   {id:"hit", src:"audios/hit.ogg"},
                   {id:"point",src:"audios/point.ogg"},
                   {id:"wing",src:"audios/wing.ogg"}
                  ]
                };

// Load resources and starts the game loop
function preload(){
    game = new Game("game");
    game.preload(resources);
    game.state = init;
    gameloop();
}
document.onload = preload();

// Controls the state of the game
function gameloop(){
  game.processInput()
  if(game.ready){
    game.state();
  }
  game.update()
  setTimeout(gameloop,20);
}

// Create game objects and perform any game initialization
function init(){
  day = new Sprite(game.images.day,game)
  game.setBackground(day)
  bird = new Animation(game.images.bird,3,game,132/3,34)
  bar = new Animation(game.images.bar,3,game,700,110)
  bar.y = game.height - 40
  ring = new Animation(game.images.ring,64,game,512/8,512/8)
  ring.x = game.width + 50
  ring.y = randint(100,350)
  ring.setVector(2,90)

  pipebot = new Sprite(game.images.pipebot,game)
  pipetop = new Sprite(game.images.pipetop,game)
  gameover = new Sprite(game.images.flappyend,game)

  scoree = new Animation(game.images.ring,64,game, 512/8,512/8)
  scoree.framerate = 1
  scoree.x = 40
  scoree.y = game.height - 40
  scoref = new Font("30px", "Comic Sans MS" , "brown", "black")

  //My addition
  scoref1 = new Font("23px", "Comic Sans MS" , "brown","black")
  scoref2 = new Font("23px", "Comic Sans MS" , "brown")
  scoref3 = new Font("30px", "Comic Sans MS" , "brown","black")
  //My addition

  logo = new Sprite(game.images.logo,game)
  logo.y -= 100
  hit = new Sound(game.audios.hit)
  point = new Sound(game.audios.point)
  wing = new Sound(game.audios.wing)
  game.state = startscreen;
}

// Game logic
function main(){
  game.scrollBackground("left",1.5)
  
  pipetop.moveTo(ring.x,ring.y - 200)
  ring.move()
  ring.framerate = 1
  pipebot.moveTo(ring.x,ring.y + 200)
  bird.draw()
  bar.draw()
  //scoree.draw()
  game.drawText(`X ${game.score}` , scoree.right + 5, scoree.y + 7, scoref)
  

  if(key.pressed[key.space]){
    bird.y -= 2
    wing.play()
  }else{
    bird.y +=2
  }

  if(bird.collidedWith(bar)||bird.collidedWith(pipetop)||bird.collidedWith(pipebot)){
    hit.play()

    game.state =gameoverscreen;
  }

  if(bird.collidedWith(ring)){
    point.play()
    game.score += 1
    ring.visible = false
  }

  if(ring.x < -20){
    ring.x = game.width + 50
    ring.y = randint(100,320)
    ring.speed += 1
    ring.visible = true
  }
}


function startscreen(){
  game.scrollBackground("left",1)
  bird.draw()
  logo.draw()
  bar.draw()

  if(key.pressed[key.space]){
    game.state=main;
  }
  game.drawText("Press [Space] to begin", game.width /2 - 160, game.height - 160, scoref)

  //My addition
  if(key.pressed[key.C]){
    game.state=challenge;
  }
  game.drawText("Press [C] to play challenge mode", game.width /2 - 200, game.height - 120, scoref)
  if(key.pressed[key.I]){
    game.state=instructions;
  }
  game.drawText("Press [I] to see instructions", game.width /2 - 180, game.height - 40, scoref)
  game.drawText("Help Flappy collect coins and pass through pipes!", game.width - 685, game.height - 400, scoref3)
  //My addition
}

  //My addition
function instructions(){
  game.scrollBackground("left",1)
  bar.draw()
  game.drawText("To play: Hold [Space] to move up", game.width - 525, game.height - 400, scoref2)
  game.drawText("You lose if you hit the floor or the pipes",game.width -560, game.height - 300, scoref2)
  game.drawText("Good Luck", game.width / 2 - 90, game.height - 200, scoref3)

  if(key.pressed[key.B]){
    game.score = 0
    bird.x = game.width / 2
    bird.y= game.height/2
    ring.x=game.width +50
    ring.y =randint(100,325)
    ring.speed = 2
    ring.visible = true
    game.state=startscreen;
  }
  game.drawText("Press [B] to go back", game.width / 2 - 150, game.height - 100, scoref3)
}
  //My addition


  //My addition
function challenge(){
  game.scrollBackground("left",1.5)
  
  pipetop.moveTo(ring.x,ring.y - 180)
  ring.move()
  ring.framerate = 1
  pipebot.moveTo(ring.x,ring.y + 180)
  bird.draw()
  bar.draw()
  scoree.draw()
  game.drawText(`X ${game.score}` , scoree.right + 5, scoree.y + 7, scoref)
  

  if(key.pressed[key.space]){
    bird.y -= 2
    wing.play()
  }else{
    bird.y +=3
  }

  if(bird.collidedWith(bar)||bird.collidedWith(pipetop)||bird.collidedWith(pipebot)){
    hit.play()

    game.state =gameoverscreen1;
  }

  if(bird.collidedWith(ring)){
    point.play()
    game.score += 1
    ring.visible = false
  }

  if(ring.x < -20){
    ring.x = game.width + 50
    ring.y = randint(100,320)
    ring.speed += 2
    ring.visible = true
  }
//My addition
}

function gameoverscreen(){

  gameover.draw()
  if(key.pressed[key.Y]){
    game.score = 0
    bird.x = game.width / 2
    bird.y= game.height/2
    ring.x=game.width +50
    ring.y =randint(100,325)
    ring.speed = 2
    ring.visible = true
    game.state=main;
  }
  
//My addition
  if(key.pressed[key.B]){
    game.score = 0
    bird.x = game.width / 2
    bird.y= game.height/2
    ring.x=game.width +50
    ring.y =randint(100,325)
    ring.speed = 2
    ring.visible = true
    game.state=startscreen;
  }

  game.drawText("Play Again? [Y] to begin normal mode", game.width /2 - 250, game.height - 140, scoref)
  game.drawText("Go to Start Up Screen? [B] to go to Start Up Screen", game.width /2 - 280, game.height - 110, scoref1)
//My addition



}
//My addition
function gameoverscreen1(){

  gameover.draw()
  if(key.pressed[key.C]){
    game.score = 0
    bird.x = game.width / 2
    bird.y= game.height/2
    ring.x=game.width +50
    ring.y =randint(90,320)
    ring.speed = 2
    ring.visible = true
    game.state=challenge;
  }

  if(key.pressed[key.B]){
    game.score = 0
    bird.x = game.width / 2
    bird.y= game.height/2
    ring.x=game.width +50
    ring.y =randint(100,325)
    ring.speed = 2
    ring.visible = true
    game.state=startscreen;
  }
  game.drawText("Play Again? [C] to begin challenge mode", game.width /2 - 250, game.height - 140, scoref)
  game.drawText("Go to Start Up Screen? [B] to go to Start Up Screen", game.width /2 - 280, game.height - 110, scoref1)
  //My addition

}

