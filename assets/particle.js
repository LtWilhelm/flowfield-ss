function Particle() {
  this.pos = createVector(random(width), random(height))
  this.vel = createVector(0, 0)
  this.acc = createVector(0, 0)
  this.maxSpeed = 10;
  this.color = 0

  this.update = function () {
    if (this.vel.equals(createVector(0, 0))) this.vel.add(p5.Vector.random2D())
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)
    this.color += 1
    if (this.color > 360) this.color = 0
  }

  this.applyForce = function (force) {
    this.acc.add(force)
  }

  this.show = function () {
    colorMode("hsb")
    stroke(this.color, 100, 75, 75);
    strokeWeight(1)
    point(this.pos.x, this.pos.y);
  }

  this.edges = function () {
    if (this.pos.x > width) this.pos.x = 0
    if (this.pos.x < 0) this.pos.x = width
    if (this.pos.y > height) this.pos.y = 0
    if (this.pos.y < 0) this.pos.y = height
  }

  this.follow = function(vectors) {
    let x = floor(this.pos.x/scl)
    let y = floor(this.pos.y/scl)
    let i = x + y * cols;
    let force = vectors[i]

    this.applyForce(force);
  }
}