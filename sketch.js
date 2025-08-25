function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

  let centerx = width / 2; 
  let centery = height / 2; 
  let bigRadius = 100; 
  let smallDiameter = 100;

  // Círculo grande centrado
  fill(255);
  stroke(0);
  circle(centerx, centery, bigRadius * 2);

  // Vector desde el centro hacia el mouse
  let dx = mouseX - centerx;
  let dy = mouseY - centery;
  let distance = sqrt(dx * dx + dy * dy);

  let maxDistance = bigRadius - smallDiameter / 2;
  let angle = atan2(dy, dx);

  let smallX, smallY;
  let touchingEdge = false;

  if (distance < maxDistance) {
    smallX = mouseX;
    smallY = mouseY;
  } else {
    smallX = centerx + cos(angle) * maxDistance;
    smallY = centery + sin(angle) * maxDistance;
    touchingEdge = true;
  }

  // Círculo pequeño con cambio de color
  if (touchingEdge) {
    fill(255,0,0); // rosado si toca el borde
  } else {
    fill(0); // negro si está dentro
  }

  stroke(0);
  circle(smallX, smallY, smallDiameter);
}
