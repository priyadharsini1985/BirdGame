var parentBird,parentBirdImg;
var obstaclesImg;
var hunter,hunterImg1,hunterImg2;
var bg,bg1,bg2,backgroundImg,backgroundImg1,backgroundImg2,backgroundImg3;
var playButton,playImg;
var nest,nestImg1;
var stoneImg1;
var cryingBirdImage;
var kiteImg1,kiteImg2,kiteImg3,kiteImg4;
var obstacleGroup,bulletGroup;
var gameState="initial";
var life = 3;


function preload(){
  parentBirdImg =loadAnimation("Images/Bird.png");
  cryingBirdImage = loadAnimation("Images/CryingImage.png");
  obstaclesImg = loadImage("Images/Obstacles.png");
  backgroundImg = loadImage("Images/bg1.jpg");
  backgroundImg1 = loadImage("Images/bg2.png");
  backgroundImg2 = loadImage("Images/bg3.jpg");
  playImg = loadImage("Images/play1.png");
  nestImg1= loadImage("Images/Nest1.png");
  stoneImg1 = loadImage("Images/stone.png");
  hunterImg2 = loadImage("Images/hunterImage.png")
  hunterImg1 = loadImage("Images/hunter3.png")
  kiteImg1 = loadImage("Images/kiteobstacle_image2.png");
  kiteImg2 = loadImage("Images/kiteobstaclesimage.png");
  kiteImg3 = loadImage("Images/kiteobstaclesimage3.png");
  kiteImg4 = loadImage("Images/kiteobstaclesimage4.png");
 
}
function setup() {
  createCanvas(displayWidth,displayHeight);
  edges = createEdgeSprites();

  setStart();
  levelOne();
  //levelTwo();

  obstacleGroup = new Group();
  bulletGroup = new Group();

}

function draw() {
  background(255,255,255); 
  //console.log(frameCount); 
  if(gameState === "initial"){
   // setStart();
   bg.visible  = true;
   parentBird.visible = true;
   hunter.visible = true;
   playButton.visible  =true;

   bg1.visible = false;
   parentBird1.visible =false; 
   nest.visible = false;
   hunter1.visible = false;

   bg2.visible = false;
   
   gameState = "start"
   

  }
  drawSprites();
  if(gameState === "start" && mousePressedOver(playButton)){    
      clear();
      bg.visible = false;
      parentBird.visible =false; 
      hunter.visible = false;
      
      bg1.visible = true;
      parentBird1.visible =true; 
      parentBird1.changeAnimation("parent",parentBirdImg);
      parentBird1.x = displayWidth-1350;
      parentBird1.y = displayHeight-230;
      
      nest.visible = true;
      hunter1.visible = true;
      
      bg2.visible = false;
      //levelOne();
     
      gameState = "level1";    
 
  } 
  else if(gameState === "level1"){
     
      textSize(35);
      strokeWeight(2);
      stroke("blue");
      fill("Black");
      text("Life :" + life,displayWidth/2,displayHeight-1000);
      
      //hunter1.velocityX = 3;
      hunter1.bounceOff(edges);
      
      
      if(frameCount % 100 === 0){
        createBullet();
        bullet.x = hunter1.x + 60;
      }

    if(life > 0){
      spawnObstacles();


    }
      if(keyDown(RIGHT_ARROW)){
        parentBird1.x = parentBird1.x+5;
      }
      if(keyDown(LEFT_ARROW)){
        parentBird1.x = parentBird1.x-5;
      }
    
      if(keyDown(UP_ARROW)){
        parentBird1.y = parentBird1.y-5;
      }
    
      if(keyDown(DOWN_ARROW)){
        parentBird1.y = parentBird1.y+5;
      }
     
      if(obstacleGroup.isTouching(parentBird1) || bulletGroup.isTouching(parentBird1)){
        life = life-1;
        parentBird1.x = displayWidth-1350;
        parentBird1.y = displayHeight-230;
        
      }
      if (life === 0 ) {
        text("Oops!Restart again by pressing the SPACE key",displayWidth -1400,displayHeight-620);
        obstacleGroup.setVelocityXEach(0);
        bulletGroup.setVelocityYEach(0);

        obstacleGroup.setLifetimeEach(-1);
        bulletGroup.setLifetimeEach(-1);

        parentBird1.changeAnimation("crying",cryingBirdImage);
        parentBird1.x = displayWidth/2;
        parentBird1.y = displayHeight-730;
        parentBird1.setVelocity(0,0);

        hunter1.setVelocity(0,0);
        if (keyDown("space")) {
          life = 3;
          obstacleGroup.destroyEach();
          bulletGroup.destroyEach();
          gameState = "initial";
        }
      }
      if(parentBird1.isTouching(nest)){
        gameState = "level2"

      }
    }else if(gameState === "level2"){
      bg2.visible = true;

      bg.visible = false;
      parentBird.visible =false; 
      hunter.visible = false;
      
      bg1.visible = false;
      parentBird1.visible =true; 
      nest.visible = true;
      hunter1.visible = false;
      

      obstacleGroup.destroyEach();
      bulletGroup.destroyEach();
      textSize(50);
      strokeWeight(2);
      stroke("brown");
      fill("Black");
      text("Game Over",displayWidth/2,displayHeight/2);
    }

}
function setStart(){
  bg=createSprite(displayWidth/2,displayHeight/2,width,height);
  bg.addImage(backgroundImg);
  bg.scale = 6.4;
  
  parentBird = createSprite(400,300);
  parentBird.addAnimation("parent",parentBirdImg);
  parentBird.scale = 0.8;

  hunter = createSprite(1500,700);
  hunter.addImage(hunterImg1);
  hunter.scale = 0.8;

  playButton = createSprite(displayWidth/2,displayHeight/2);
  playButton.addImage(playImg);
  playButton.scale = 0.1;
 
}

function levelOne(){
  
  bg1=createSprite(displayWidth/2,displayHeight/2,width,height);
  bg1.addImage(backgroundImg1);
  bg1.scale = 1.9;

  bg2=createSprite(displayWidth/2,displayHeight/2,width,height);
  bg2.addImage(backgroundImg2);
  bg2.scale = 3.2;

  nest = createSprite(displayWidth-270,displayHeight-760)
  nest.addImage(nestImg1);
  nest.scale = 0.7;

  parentBird1 = createSprite(displayWidth-1350,displayHeight-230);
  parentBird1.addAnimation("parent",parentBirdImg);
  parentBird1.addAnimation("crying",cryingBirdImage);
  parentBird1.scale = 0.3;  
  parentBird1.setCollider("circle",0,0,200);
  //parentBird1.debug = true;

  hunter1 = createSprite(displayWidth-200,displayHeight-250);
  hunter1.addImage(hunterImg2);
  hunter1.scale = 0.6;
  hunter1.velocityX = 3;
  
  
  }

  function levelTwo(){

    
    bg2=createSprite(displayWidth/2,displayHeight/2,width,height);
    bg2.addImage(backgroundImg2);
    bg2.scale = 3.2;

   /*  parentBird2 = createSprite(displayWidth-330,displayHeight-600);
    parentBird2.addAnimation("parent",parentBirdImg);
    parentBird2.scale = 0.3;

    nest1 = createSprite(displayWidth-200,displayHeight-600)
    nest1.addImage(nestImg1);
    nest1.scale = 0.7; */

    //text("GameOver",displayWidth/2,displayHeight-700);
    //textSize(30);
  }

  function spawnObstacles(){
    if(frameCount % 100 === 0){
   
    obstacle = createSprite(width,Math.round(random(400,height-350)),50,50);
    obstacle.velocityX = -6;
    //obstacle.debug = true;
    
    var rand = Math.round(random(1,4))
    switch(rand){
      case 1: obstacle.addImage(obstaclesImg);
              obstacle.scale = 0.3;
              break;
      case 2: obstacle.addImage(stoneImg1);
              obstacle.scale = 0.5;
              break;
      case 3: obstacle.addImage(kiteImg1)
              break;
      case 4: obstacle.addImage(kiteImg2);
              obstacle.scale = 0.8;
              break
    }
    obstacleGroup.add(obstacle)
    obstacle.lifetime = 1000;
  }

}
function createBullet(){
   
  bullet = createSprite(hunter.x,500,20,40);
  //bullet.addImage("bullet",bulletImg);
 // bullet.scale = 0.3;
  //bulletbullet.velocityX = Math.round(random(-5,-20));
  bullet.velocityY = -3;
  //bullet.x = hunter.x;
  bulletGroup.add(bullet);
  bullet.lifetime = 1000;
}