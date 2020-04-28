let inc = 0.1
let cols, rows;
let scl = 20;

let zoff = 0

let fr

let particles = [];
let flowfield = [];

function setup() {
  createCanvas(innerWidth, innerHeight - 10)
  cols = floor(width / scl)
  rows = floor(height / scl)

  for (let i = 0; i < 1000; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  colorMode('rgb')
  background(0, 10);
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = (x + y * cols);
      let angle = noise(xoff, yoff, zoff) * TWO_PI *4
      let v = p5.Vector.fromAngle(angle);
      v.setMag(.5)
      flowfield[index] = v;
      stroke(0, 50)
      push();
      translate(x*scl, y*scl);
      pop();
      xoff += inc
    }
    yoff += inc
  }
  zoff += 0.001
  particles.forEach(e => e.follow(flowfield))
  particles.forEach(e => e.update())
  particles.forEach(e => e.show())
  particles.forEach(e => e.edges())
}