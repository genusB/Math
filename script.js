let cloud1 = document.getElementById('cloud1');
let input1 = document.getElementById('input1');
let gameOver = document.getElementById('gameOver');
let heart1 = document.getElementById('heart1');
let heart2 = document.getElementById('heart2');
let heart3 = document.getElementById('heart3');
let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let cloud1_1 = cloud1.cloneNode(true);
let cloud1_2 = cloud1.cloneNode(true);
let cloud1_3 = cloud1.cloneNode(true);
let cloud1_4 = cloud1.cloneNode(true);
let cloud1_5 = cloud1.cloneNode(true);
let cloud1_6 = cloud1.cloneNode(true);
let cloud1_7 = cloud1.cloneNode(true);
let cloud1_8 = cloud1.cloneNode(true);
let cloud1_9 = cloud1.cloneNode(true);
let cloud1_10 = cloud1.cloneNode(true);
let cloud1_11 = cloud1.cloneNode(true);
let cloud1_12 = cloud1.cloneNode(true);
let cloud1_13 = cloud1.cloneNode(true);
let cloud1_14 = cloud1.cloneNode(true);

let submitButton = document.getElementById('button1');
let startButton = document.getElementById('button2');
let restartButton = document.getElementById('button3');
let score = document.getElementById('score');
let answer1 = -1, answer2 = -1, answer3 = -1, answer4 = -1, answer5 = -1, answer6 = -1;
let answers = [answer1, answer2, answer3, answer4, answer5, answer6];
let a, b, c, aa, bb;
let sample1, sample2, sample3, sample4, sample5, sample6;
let samples = [sample1, sample2, sample3, sample4, sample5, sample6];
let current_i = 0;
let saveLife = false;

let clY = -728;

let gameScore = 0;
let cl_timeout = 100;

let cl_speed = 0.5; //cloud speed
let cl_maxI = 300;  //iterations count 
let cl_opacity = 10; //primary opacity 
let cl_opStep = 0.00825; //opacity reduce step 
let cl_clouds = [cloud1_1, cloud1_2, cloud1_3, cloud1_4, cloud1_5, cloud1_6, cloud1_7, cloud1_8, cloud1_9, cloud1_10, cloud1_11, cloud1_12, cloud1_13, cloud1_14];
let cl_i = 0;
let firstTimeout = true;
let submitVerify = true;
let flagVerify = false;
let hearts = [heart1, heart2, heart3];
let h_i = 2;

function start() {
  
  gameScore = 0;
  score.innerHTML = "Rachunak: 0";
  cl_timeout = 100;
  cl_speed = 0.5;
  cl_maxI = 300;   
  cl_opacity = 10;  
  cl_opStep = 0.00825;
  cl_i = 0;
  firstTimeout = true;
  submitVerify = true;
  hearts = [heart1, heart2, heart3];
  h_i = 2;
  
  startButton.style.visibility = "hidden";
  restartButton.style.visibility = "hidden";
  submitButton.style.visibility = "visible";
  input1.style.visibility = "visible";
  input1.disabled = false;
  heart1.style.visibility = "visible";
  heart2.style.visibility = "visible";
  heart3.style.visibility = "visible";
  score.style.visibility = "visible";
  gameOver.style.visibility = "hidden";
  
  for (let z = 0; z < 14; z++){
    try{
      cl_clouds[z].style.visibility == 'hidden';
      document.getElementById('container').removeChild(cl_clouds[z]);
    } catch (err) {}
    
  }
  
  runClouds();
}

function runClouds() {
 
      current_i = Math.trunc(Math.random()*5);
      cloudMath();      
      console.log("Dobra, žulik, voś adkaz - " + answers[current_i]);

      input1.disabled = false;
      saveLife = false;

      try {
        if ((cl_i >= 0)&&(cl_i < 7)) {
          document.getElementById('container').removeChild(cl_clouds[cl_i+7]);
          cl_clouds[cl_i+7].style.visibility = "hidden";
        }
        if ((cl_i >= 7)&&(cl_i < 14)) {
          document.getElementById('container').removeChild(cl_clouds[cl_i-7]);
          cl_clouds[cl_i-7].style.visibility = "hidden";

          for(let i = 0; i < 7; i++) {
            flagVerify[i] = 0;
          }
        }
      } 
      catch (err) {}
      
      if (gameOver.style.visibility == "hidden") {
        cl_clouds[cl_i].style.visibility = "visible";
        cl_clouds[cl_i].querySelectorAll('div:last-child')[0].innerHTML = samples[current_i];    
        document.getElementById('container').appendChild(cl_clouds[cl_i]);
      }
            
      if ((gameScore >= 10)&&(gameScore < 20)) { cl_speed = 1; cl_opacity = 9; cl_opStep = 0.015; }
      if ((gameScore >= 20)&&(gameScore < 40)) { cl_speed = 1.5; cl_opacity = 7; cl_opStep = 0.0173;}
      if ((gameScore >= 40)&&(gameScore < 50)) { cl_speed = 2; cl_opacity = 6; cl_opStep = 0.01965;}
      if (gameScore >= 50) { cl_speed = 2.5; cl_opacity = 5.5; cl_opStep = 0.023;}
    
      cloudMove(cl_clouds[cl_i], -310, clY, cl_speed, cl_maxI, 10, cl_opacity, cl_opStep);
      teslaMove(cl_speed, cl_opacity, 10);

        
      if (cl_i < 13){cl_i += 1;} else {cl_i = 0;}    

} 

let x;

function submit() {

  if (submitVerify == true){
             
      if (cl_i == 0){x = 13;} else {x = cl_i - 1;}
    
      if (answers[current_i] == input1.value) {
        
        flagVerify = true;
        gameScore += 1;
        score.innerHTML = "Rachunak: " + gameScore;   

        saveLife = true;

        submitVerify = false;
        input1.disabled = true;
        setTimeout (function() { submitVerify = true; }, 1000);    
      }

  }
  
  input1.value="";  
}

rotateIndex = 0;

//cloudMove parameters: Cloud name, i0, y offset, cloud speed, iterations count, timeout size, opacity0, opacity step
function cloudMove (cloud, i, y, speed, iterations, time, opacity, opacityStep)
{
  setTimeout(function() {  
    
    if((rotateIndex >= 0) && (rotateIndex < 36))
    {
      degree = 357;
    }
    else if((rotateIndex >= 36) && (rotateIndex < 72))
    {
      degree = 3;
    }
    else{rotateIndex = 0;}

    cloud.style.transform = "translate(" + i + "px," + y + "px) rotate(" + degree + "deg)";

    rotateIndex++;

    if (i < iterations){
      i += speed;    
      cloudMove(cloud, i, y, speed, iterations, time, opacity, opacityStep);
    }
    else{          
      ctx.clearRect(0,0 , canvas.width, canvas.height);
      //Cloud finished its way, no answer   
        if (saveLife === false) {
          cloud.style.opacity = 0;
          if (hearts[0].style.visibility == 'visible') {
            cl_timeout = 100;
            runClouds();
          }

          hearts[h_i].style.visibility = 'hidden';
          if (h_i == 0){gameover();}
          h_i--;
          
        }  
        else {
          cloud.style.opacity = 0;
          if (hearts[0].style.visibility == 'visible') {
            cl_timeout = 100;
            runClouds();
          }
        }       
    }
  }, time);
}

function teslaMove(speed, opacityStep, time)
{
    flagVerify = false;
    let img = new Image();
    img.src = "assets/tesluk.png";
    img.onload = function() {
    init();
    };
  
    const width = 240;
    const height = 320;

    function drawFrame(frameX,canvasX)
    {
      ctx.drawImage(img, 
                    frameX * width, 0, width, height,
                    canvasX * width, 0, width * 0.8, height* 0.8);
    }

    const cycleLoop = [0, 1, 2, 3, 0];
    let currentLoopIndex = 0;
    let frameCount;
    let moveLeft = 0;
    let clearPoint = 2.4;

    let speedStep = 0.0057;

    if(window.matchMedia("(max-width: 1400px) and (orientation: landscape)").matches) {
        speedStep = 0.0062;
        clearPoint = 2.5;
    }
    function step() {
        frameCount++;

        moveLeft += speed * speedStep;


      if(frameCount < 10)
      {
        window.requestAnimationFrame(step);
        return;
      }  

      if(moveLeft >= clearPoint)
      {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      frameCount = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawFrame(cycleLoop[currentLoopIndex], moveLeft);
      currentLoopIndex++;

      if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
      }
      window.requestAnimationFrame(step);
    }

    function init() {
      window.requestAnimationFrame(step);
    }
}

function validateInput(inp) {
  inp.value = inp.value.replace(/[^\d]*/g, '');
}

function gameover() {
  startButton.style.visibility = "hidden";
  restartButton.style.visibility = "visible";
  gameOver.style.visibility = "visible";
  submitButton.style.visibility = "hidden";
  input1.style.visibility = "hidden";
  score.style.visibility = "hidden";
  gameOver.innerHTML = "Kaniec lekcyi, adznaka: " + gameScore;
  
  for (let z = 0; z < 14; z++){
    try {
      cl_clouds[z].style.visibility == 'hidden';
      document.getElementById('container').removeChild(cl_clouds[z]);
    } catch (err) {}
    
  }
  
}

function newGame() {
  window.location.reload(false); 
  start();
}

function cloudMath(){
  //a*b, aa*b, a*bb, aa+b, a+bb, aa+bb, aa-b
  a = Math.trunc(Math.random()*(9 - 1) + 1);
  b = Math.trunc(Math.random()*(9 - 1) + 1);
  c = Math.trunc(Math.random()*(9 - 1) + 1);
  aa = Math.trunc(Math.random()*(99 - 10) + 10);
  bb = Math.trunc(Math.random()*(99 - 10) + 10);
  sample1 = a + " * " + b; answer1 = a*b; //a * b
  sample2 = aa + " - " + b; answer2 = aa-b; //aa - b
  sample3 = a + " + " + bb; answer3 = a+bb; //a + bb
  sample4 = a + "+" + b + "+" + c; answer4 = a+b+c; //a + b + c
  sample5 = aa + " + " + bb; answer5 = aa+bb; //aa + bb
  sample6 = aa + " * " + b; answer6 = aa*b; //aa * b  
  
  answers = [answer1, answer2, answer3, answer4, answer5, answer6];
  samples = [sample1, sample2, sample3, sample4, sample5, sample6];
}
