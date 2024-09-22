let blueMushroom, darkBlueMushroom, greenMushroom, pinkMushroom;
let purpleMushroom, titleImage, yellowMushroom;
let eyeImage, circleImage;
let stairsImages = [];
let currentImages = [];
let pressedKeys = [];
let waveOffset = 0;
let bgMusic;
let isMusicPlaying = false;

// Variables for stairs animation
let stairFrame = 0; 
let stairFrameInterval = 20; 

// Variables for eye animation
let eyeScale = 0;
let isAnimating = false;
let glowAlpha = 0;
let glowDirection = 1;
let glowActive = false;

// Variables for eye image sequence animation
let eyeImages = [];
let eyeFrame = 0;
let eyeFrameInterval = 15;
let frameCounter = 0;

let rotationAngle = 0;
let alphaValue = 255;
let fadeDirection = -5;

function preload() {
  // Images from folder
  blueMushroom = loadImage('images/blueMushroom1.png');
  darkBlueMushroom = loadImage('images/darkBlueMushroom1.png');
  greenMushroom = loadImage('images/greenMushroom1.png');
  pinkMushroom = loadImage('images/pinkMushroom1.png');
  stairs = loadImage('images/stairs1.png');
  purpleMushroom = loadImage('images/purpleMushroom1.png');
  yellowMushroom = loadImage('images/yellowMushroom1.png');
  titleImage = loadImage('images/title.png');
  circleImage = loadImage('images/circle.png');

  for (let i = 1; i <= 6; i++) {
    stairsImages.push(loadImage(`images/stair${i}.png`));
  }

  // Load eye images
  eyeImages.push(loadImage('images/eye2.png'));
  eyeImages.push(loadImage('images/eye3.png'));
  eyeImages.push(loadImage('images/eye4.png'));

  bgMusic = loadSound('sound/sound.mp3');

  currentImages.push(blueMushroom);
  currentImages.push(darkBlueMushroom);
  currentImages.push(greenMushroom);
  currentImages.push(pinkMushroom);
  currentImages.push(purpleMushroom);
  currentImages.push(yellowMushroom);
  currentImages.push(stairs);
  currentImages.push(titleImage);
  currentImages.push(circleImage);
}

function setup() {
  createCanvas(1920, 1080);
  textFont('Audiowide');
}

function draw() {
  background(0);
  fill(255);
  textSize(20);
  textAlign(CENTER, TOP);
  text("Press 1, 2, 3, 4, 5, 6 and space to see the changes", width / 2, 30);

  waveOffset += 0.1;

  for (let i = 0; i < 6; i++) {
    let yOffset = sin(waveOffset + i) * 10;
    image(currentImages[i], 0, yOffset, 1920, 1080);
  }

  if (isAnimating) {

    eyeScale += 0.05;
    eyeScale = min(eyeScale, 1);

    if (glowActive) {
      drawGlowingImage(960, 540, eyeImages[eyeFrame], eyeScale);
    }

    // Stop animation when eye scale is complete
    if (eyeScale >= 1) {
      isAnimating = false;
      glowActive = true;
    }
  } else {
    // Always keep glow effect active
    if (glowActive) {
      drawGlowingImage(960, 540, eyeImages[eyeFrame], 1);
    }
  }

  image(currentImages[6], 0, 0, 1920, 1080);
  image(currentImages[7], 0, 0, 1920, 1080);


  if (pressedKeys.length === 6) {
    push();
    translate(770 + 375 / 2, 150 + 420 / 2);
    rotate(rotationAngle);
    tint(255, alphaValue);
    image(currentImages[8], -375 / 2, -420 / 2, 375, 420);
    pop();

    rotationAngle += 0.05;
    alphaValue += fadeDirection;

    if (alphaValue <= 50 || alphaValue >= 255) {
      fadeDirection *= -1;
    }

    frameCounter++;
    if (frameCounter >= eyeFrameInterval) {
      eyeFrame = (eyeFrame + 1) % eyeImages.length;
      frameCounter = 0;
    }

    if (pressedKeys.length === 6) {

      if (frameCounter % stairFrameInterval === 0) {
        stairFrame = (stairFrame + 1) % stairsImages.length;
        currentImages[6] = stairsImages[stairFrame];
      }
    }
  }
}

function drawGlowingImage(x, y, img, scaleFactor) {
  push();
  translate(x, y);
  scale(scaleFactor);

  glowAlpha += 5 * glowDirection;
  if (glowAlpha >= 150 || glowAlpha <= 0) {
    glowDirection *= -1;
  }

  for (let i = 0; i < 10; i++) {
    tint(255, glowAlpha / (i + 1));
    image(img, -img.width / 2 - i, -img.height / 2 - i, img.width + i * 2, img.height + i * 2);
  }

  tint(255, 255);
  image(img, -img.width / 2, -img.height / 2);

  pop();
}

function keyPressed() {
  if (['1', '2', '3', '4', '5', '6'].includes(key) && !pressedKeys.includes(key)) {

    if (key === '1') {
      currentImages[0] = loadImage('images/blueMushroom2.png');

      if (!isMusicPlaying) {
        bgMusic.play();
        isMusicPlaying = true;
      }
    } else if (key === '2') {
      currentImages[1] = loadImage('images/darkBlueMushroom2.png');
    } else if (key === '3') {
      currentImages[2] = loadImage('images/greenMushroom2.png');
    } else if (key === '4') {
      currentImages[3] = loadImage('images/pinkMushroom2.png');
    } else if (key === '5') {
      currentImages[4] = loadImage('images/purpleMushroom2.png');
    } else if (key === '6') {
      currentImages[5] = loadImage('images/yellowMushroom2.png');
    }

    pressedKeys.push(key);
  }

  if (pressedKeys.length === 6) {
    currentImages[7] = eyeImages[eyeFrame];
    isAnimating = true;
    glowActive = true;
    eyeScale = 0;
  }
}
