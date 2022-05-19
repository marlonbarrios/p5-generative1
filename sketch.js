var nParticles = 110;
var particles = [];
var particleSize = 80;
var maxCounter= 150;
var lines = [];

function checkCollisions() {
  lines = [];
  for(var i=0; i < nParticles ; i++) {
    for(var j=0; j < nParticles ; j++) {
      if(i != j){
        var distance = p5.Vector.dist(
          particles[i].position,
          particles[j].position
        );
        if(distance < particleSize) {
          if(particles[i].counter == 0) {

           particles[i].direction.rotate(Math.random());
           particles[i].counter = maxCounter;
          }
          if(particles[j].counter == 0) {
          particles[j].direction.rotate(Math.random());
          particles[j].counter = maxCounter;
          }
          lines.push(
           [particles[i].position, particles[j].position]
          );
        }
      }
    }

  }
}


function createParticle() {
  var particle = {};
  particle.position = createVector(
    Math.random() * width,
    Math.random() * height
  );
  particle.direction = createVector(
    Math.random(),
    Math.random()
  );
  particle.update = function() {
    this.position.add(this.direction);
    if(this.position.x > width ||
      this.position.x < 0)
      this. position.x = width /2;
      if(this.position.y > height || 
        this.position.y < 0)
        this.position.y = height /2;
        if(this.counter > 0)
        this.counter -= 1;
  }
  particle.counter = 0;
  return particle;
}



function setup() {
  createCanvas(1000, 300);
  background(200);
   stroke(0, 80);
  fill(0,90);
  
  for(var i=0; i < nParticles ; i++) {
particles.push(createParticle());
}

}

function draw() {

  background(255);
  checkCollisions();
    for(var i=0; i < nParticles ; i++) {
    particles[i].update();
    ellipse( 
      particles[i].position.x,
      particles[i].position.y,
10
    );
  }
  for(var i=0;i<lines.length;i++) {
    line(
      lines[i][0].x, lines[i][0].y, 
      lines[i][1].x, lines[i][1].y
  
    );
  }
}
