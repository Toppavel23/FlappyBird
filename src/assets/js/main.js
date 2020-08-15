const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const bird = new Image();
const background = new Image();
const frontBackground = new Image();
const pipeTop = new Image();
const pipeBottom = new Image();

bird.src = "./assets/images/bird.png";
background.src = "./assets/images/background.png";
frontBackground.src = "./assets/images/frontBackground.png";
pipeTop.src = "./assets/images/pipeTop.png";
pipeBottom.src = "./assets/images/pipeBottom.png";

let fly = new Audio();
let score_audio = new Audio();

fly.src = "./assets/audio/fly.mp3";
score_audio.src = "./assets/audio/score.mp3";

const gap = 85;

const moveUp = () => {
  yPos -= 25;
  fly.play();
};

document.addEventListener("keydown", moveUp);

let pipe = [];

pipe[0] = {
  x: cvs.width,
  y: 0,
};

let score = 0;

let xPos = 10;
let yPos = 150;
let grav = 1.5;

const draw = () => {
  ctx.drawImage(background, 0, 0);

  for (let i = 0; i < pipe.length; i++) {
    ctx.drawImage(pipeTop, pipe[i].x, pipe[i].y);
    ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeTop.height + gap);

    pipe[i].x--;

    if (pipe[i].x == 125) {
      pipe.push({
        x: cvs.width,
        y: Math.floor(Math.random() * pipeTop.height) - pipeTop.height,
      });
    }

    if (
      (xPos + bird.width >= pipe[i].x &&
        xPos <= pipe[i].x + pipeTop.width &&
        (yPos <= pipe[i].y + pipeTop.height ||
          yPos + bird.height >= pipe[i].y + pipeTop.height + gap)) ||
      yPos + bird.height >= cvs.height - frontBackground.height
    ) {
      location.reload();
    }

    if (pipe[i].x == 5) {
      score++;
      score_audio.play();
    }
  }

  ctx.drawImage(frontBackground, 0, cvs.height - frontBackground.height);
  ctx.drawImage(bird, xPos, yPos);

  yPos += grav;

  ctx.fillStyle = "#000";
  ctx.font = "24px Verdana";
  ctx.fillText("Счет: " + score, 10, cvs.height - 20);

  requestAnimationFrame(draw);
};

pipeBottom.onload = draw;
