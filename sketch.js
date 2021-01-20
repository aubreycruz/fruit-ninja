var sword, swordImage;
var alien1, alien1Image, alien2, alien2Image;
var fruit1, fruit1Image, fruit2, fruit2Image, fruit3, fruit3Image, fruit4, fruit4Image;

var PLAY=1;
var END=0;
var gameState=1;

var score;

var gameOverSound, fruitCutSound;
var gameOver, gameOverImage;

function preload(){
  swordImage = loadImage("sword.png");
  
  alien1Image = loadImage("alien1.png");
  alien2Image = loadImage("alien2.png");
  
  fruit1Image = loadImage("fruit1.png");
  fruit2Image =loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  
  gameOverImage = loadImage("gameover.png");

  fruitCutSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");
}

function setup(){
  createCanvas(600,600);
  
  sword = createSprite(300,450,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
  fruitsGroup =createGroup();
  enemyGroup = createGroup();
  
  score = 0;
  
  //sword.debug = true
  sword.setCollider("rectangle",0,0, 40, 40);
}

function draw(){
  background("#C2D5EC");
  
  textSize(20);
  fill("black");
  text("Score: "+score, 15,30);
  
  if(gameState === PLAY){
    sword.y = World.mouseY;
    sword.x = World.mouseX;

    fruits();
    enemy();
    
    if(fruitsGroup.isTouching(sword)){
      fruitCutSound.play();
      fruitsGroup.destroyEach();
      score =score+1;
    }
    
    if(enemyGroup.isTouching(sword)){
      gameOverSound.play();
      gameState = END;
    }
    } else if(gameState === END){
    sword.addImage(gameOverImage);
    sword.scale= 1.2;  
    sword.x=300;
    sword.y=300;
    
    fruitsGroup.destroyEach();
    enemyGroup.destroyEach();
    
    fruitsGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
  }
  drawSprites();
}

function fruits(){
  if(frameCount % 80 === 0){
    //create variable for fruits
    var fruit = createSprite(600,300,20,20);
    fruit.scale = 0.2;
    
    var r = Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1Image);
    } else if(r == 2){
      fruit.addImage(fruit2Image);
    } else if(r == 3){
      fruit.addImage(fruit3Image);
    } else if(r == 4){
      fruit.addImage(fruit4Image);
    }

    fruit.y = Math.round(random(50,500));
    
    fruit.velocityX = -6;
    fruit.lifetime = 120;
  
    fruitsGroup.add(fruit);
  }
}

function enemy(){
  if(frameCount % 200 === 0){
    var alien = createSprite(600,300.20,20);
    alien.scale = 0.8;

    var r = Math.round(random(1,2));
    if(r == 1){
      alien.addImage(alien1Image);
    } else if(r == 2){
      alien.addImage(alien2Image);
    }
    
    alien.y = Math.round(random(100,450));
    
    alien.velocityX = -6;
    alien.lifetime = 120;
    
    enemyGroup.add(alien);
  }
}