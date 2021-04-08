var tower,towerImg
var PLAY= 1;
var END = 0;
var gameState = PLAY;

var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;

function preload(){
 towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
}

function setup(){
  createCanvas(600,600);
  
  tower=createSprite(300,300,600,600);
  tower.addImage("tower",towerImg)
  tower.velocityY= 1;
  
  ghost = createSprite(300,300, 25,35)
  ghost.addImage("ghost",ghostImg)
  ghost.velocityY =   1;
  ghost.scale = 0.3;
  
  doorsGroup= new Group()
  climbersGroup = new Group()
  invisibleBlockGroup= new Group()
}

function draw(){
  
  if(gameState === PLAY){
     if (tower.y >400){
      tower.y  = 300;
    }
    
  if(keyDown("space")){
    ghost.velocityY = -10  ;
  }
   ghost.velocityY = ghost.velocityY +0.5
    
    if(keyDown("LEFT_ARROW")){
    ghost.x = ghost.x -3  ;
  }
    
    if(keyDown("RIGHT_ARROW")){
     ghost.x = ghost.x +3 
  }
   
   if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0 ;
    } 
    
    if(ghost.isTouching(invisibleBlockGroup)){
      gameState = END ;
    } 
  spawnDoors();
    
   drawSprites() 
  }
  else if(gameState === END){
  textSize(30);
  fill("blue");
  text("gameOver",250,300) ; 
  
  }
  
}


function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleBlock.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleBlock.debug = true;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}
