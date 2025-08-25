let ojos = [];      // Arreglo que guarda los ojos
let numOjos = 20;   // Cantidad de ojos

function setup() {
  createCanvas(windowWidth, windowHeight); // Canvas ocupa toda la ventana

  // Generar ojos en posiciones aleatorias
  for (let i = 0; i < numOjos; i++) {
    ojos.push({
      x: random(width),
      y: random(height),
      bigRadius: 50,      // Radio del ojo grande
      smallDiameter: 30   // Diámetro de la pupila
    });
  }
}

function draw() {
  background(0); // Fondo negro

  for (let ojo of ojos) {
    let centerx = ojo.x; 
    let centery = ojo.y; 
    let bigRadius = ojo.bigRadius; 
    let smallDiameter = ojo.smallDiameter;

    // Ojo grande (blanco)
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

    // Pupila
    fill(touchingEdge ? color(255, 0, 0) : 0);
    stroke(0);
    circle(smallX, smallY, smallDiameter);
  }
}

// Ajustar el canvas si cambia el tamaño de la ventana
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ojos = []; // Vaciamos y regeneramos
  for (let i = 0; i < numOjos; i++) {
    ojos.push({
      x: random(width),
      y: random(height),
      bigRadius: 50,
      smallDiameter: 30
    });
  }
}
