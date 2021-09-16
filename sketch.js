var garden,rabbit,apple,leaf;
var gardenImg,rabbitImg,appleImg,leafImg;
var score = 0;
var gameState = "play"

function preload(){
 gardenImg = loadImage("garden.png");
 rabbitImg = loadImage("rabbit.png");
 appleImg = loadImage("apple.png");
 leafImg = loadImage("leaf.png");
 restartImg = loadImage("restart.png")
 gameOverImg = loadImage("gameOver.png")
}

function setup(){
 createCanvas(400,400);

 garden=createSprite(200,200);
 garden.addImage(gardenImg);

 rabbit = createSprite(180,340,30,30);
 rabbit.scale =0.09;
 rabbit.addImage(rabbitImg);

 appleB = new Group()
 leafB = new Group()

 rabbit.debug = false
 rabbit.setCollider("circle",0,0,100)

 score = 0;
}


function draw() {
 background(0);
  
 if(gameState === "play"){
 

 edges= createEdgeSprites();
 rabbit.collide(edges);

  if (keyDown("d")) {
     rabbit.x=rabbit.x+15
  }
  if (keyDown("a")) {
     rabbit.x=rabbit.x-15
  }

  if(appleB.isTouching(rabbit)){
     appleB.destroyEach()
     score=score+1
  }
  if(leafB.isTouching(rabbit)){
     gameState="end"
   }

    spawnleaf();
    spawnapple();
    drawSprites();

    textSize(20);
   fill("white");
   text("Score: "+ score, 300,50);
  }

   if (gameState === "end"){
   background("white");
   if(keyDown("enter")){
     reset()
   }
   drawSprites();
   stroke("red");
   fill("red");
   textSize(30);
   text("Score: "+ score,100,150);
   text("GameOver!!",70,200);
   text("Press Enter to restart",50,250);
  }
}


function spawnapple(){
  if(frameCount%130===0){
    apple=createSprite(600,10,70,13)
    apple.velocityY=7
    apple.x=Math.round(random(1,350))
    apple.addImage(appleImg)
    apple.scale=0.1
    apple.lifetime = 70;
    rabbit.depth=apple.depth
    rabbit.depth=rabbit.depth+1
    appleB.add(apple)
  }
}


function spawnleaf(){
  if(frameCount%50===0){
    leaf=createSprite(600,10,70,13)
    leaf.velocityY=5
    leaf.x=Math.round(random(1,350))
    leaf.addImage(leafImg)
    leaf.scale=0.1
    leaf.lifetime = 70;
    rabbit.depth=leaf.depth
    rabbit.depth=rabbit.depth+1
    leafB.add(leaf)
  }
}

function reset(){
  gameState = "play";
  appleB.destroyEach();
  leafB.destroyEach();
  score = 0;
}