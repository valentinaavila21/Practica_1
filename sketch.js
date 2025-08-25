// sketch.js
const BG = 0;         // color de fondo (negro)
let ojos = [];
let numOjos = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);   // canvas a tamaño ventana
  generarOjos();                             // crea ojos aleatorios
}

function draw() {
  background(BG);

  // actualizar y dibujar todos los ojos
  for (let ojo of ojos) {
    ojo.update();
    ojo.draw();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  generarOjos(); // reubicar ojos cuando cambie el tamaño de la ventana
}

function generarOjos() {
  ojos = [];
  for (let i = 0; i < numOjos; i++) {
    ojos.push(new Ojo(
      random(width),   // x aleatoria
      random(height),  // y aleatoria
      50,              // radio del ojo (blanco)
      30               // diámetro de la pupila
    ));
  }
}

// ---- Clase Ojo ----
class Ojo {
  constructor(x, y, bigRadius, smallDiameter) {
    this.x = x;
    this.y = y;
    this.r = bigRadius;
    this.d = smallDiameter;

    // Parpadeo
    this.blinkProgress = 0;           // 0 abierto, 1 cerrado
    this.state = 'idle';              // 'idle' | 'closing' | 'closed' | 'opening'
    this.blinkSpeed = random(0.10, 0.22); // velocidad de cierre/apertura por frame
    this.nextBlink = millis() + random(800, 3000); // cuándo parpadea
    this.pauseUntil = 0;              // mini-pausa con ojo cerrado
  }

  update() {
    // ¿toca parpadear?
    if (this.state === 'idle' && millis() >= this.nextBlink) {
      this.state = 'closing';
    }

    // cerrar
    if (this.state === 'closing') {
      this.blinkProgress += this.blinkSpeed;
      if (this.blinkProgress >= 1) {
        this.blinkProgress = 1;
        this.pauseUntil = millis() + random(60, 160); // ojo cerrado un momento
        this.state = 'closed';
      }
    }
    // cerrado (mini pausa)
    else if (this.state === 'closed') {
      if (millis() >= this.pauseUntil) {
        this.state = 'opening';
      }
    }
    // abrir
    else if (this.state === 'opening') {
      this.blinkProgress -= this.blinkSpeed;
      if (this.blinkProgress <= 0) {
        this.blinkProgress = 0;
        this.state = 'idle';
        // programa el próximo parpadeo con nueva velocidad
        this.nextBlink = millis() + random(1000, 4000);
        this.blinkSpeed = random(0.10, 0.22);
      }
    }
  }

  draw() {
    // 1) Blanco del ojo
    fill(255);
    stroke(0);
    circle(this.x, this.y, this.r * 2);

    // 2) Pupila que sigue al mouse, limitada al borde del ojo
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const distance = sqrt(dx * dx + dy * dy);
    const maxDistance = this.r - this.d / 2; // hasta el borde interno
    const angle = atan2(dy, dx);

    let px, py, tocaBorde = false;
    if (distance < maxDistance) {
      px = mouseX; py = mouseY;
    } else {
      px = this.x + cos(angle) * maxDistance;
      py = this.y + sin(angle) * maxDistance;
      tocaBorde = true;
    }

    // 3) Dibujar pupila (roja si está pegando al borde)
    noStroke();
    fill(tocaBorde ? color(255, 0, 0) : 0);
    circle(px, py, this.d);

    // 4) Párpados (rectángulos que “tapan” el ojo según blinkProgress)
    this.drawEyelids();
  }

  drawEyelids() {
    if (this.blinkProgress <= 0) return;

    noStroke();
    fill(BG);

    // Altura que cubre cada párpado desde el borde hacia el centro
    const cover = this.r * this.blinkProgress;

    // Párpado superior
    rect(this.x - this.r - 1, this.y - this.r - 1, this.r * 2 + 2, cover + 1);

    // Párpado inferior
    rect(this.x - this.r - 1, this.y + this.r - cover, this.r * 2 + 2, cover + 1);
  }
}
