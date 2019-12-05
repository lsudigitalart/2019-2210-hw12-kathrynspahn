var clones;
var playTime, loadTime;
var amp, level;
var bgcolor;
var fft;

function preload() {
    clones = loadSound("clones.mp3");
}

function setup() {
  createCanvas(1500, 800);
  userStartAudio();
  background(10,200,250);


  if (clones.isLoaded()) {
    loadTime = millis();
    print(loadTime);
    clones.play();
  }



  amp = new p5.Amplitude();
  fft = new p5.FFT();
}


var particles = [];

function mousePressed(){
  for(var i = 0; i < 10; i++) {
    var x = random(width)
    var y = random(height);
    var z = 100;
    particles[i] = new Particle(x, y, z);
  }

}

function draw() {
  for(var i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].display();
  }
}

function Particle(tempX, tempY, tempDiameter){
  this.x = tempX;
  this.y = tempY;
  this.diameter = tempDiameter;
  this.speed = random();

  this.move = function() {
    this.x += this.speed

  };

  this.display = function() {
    fill(0,250,300);
    ellipse(this.x, this.y, this.diameter);
  };


}
function draw() {
  for(var i = 0; i < particles.length; i++) {
    particles[i].move();
    particles[i].display();
  }

  playTime = millis() - loadTime;
  level = amp.getLevel();

  mappedColor = map(level, 0, 1, 0, 255);

  cSize = map(level, 0, 1, 0, width);
  
  var spectrum = fft.analyze();
  var trebleVol = fft.getEnergy("treble");
  var midVol = fft.getEnergy("mid");
  var bassVol = fft.getEnergy("bass");



  fill(0,50,50);
  noStroke();
  for (var x = trebleVol; x < width; x=x+200) {
    fill(200,0,100,30)
    circle(x,200,x,100);
    fill(100,0,100,30)
    circle(x, 400, x, 300);
    fill(0,100,200,30)
    circle(x,600,x,500);
    fill(0,200,200,30)
    circle(x,800,x,700);
   }

  noStroke();
  for (var x = midVol; x < width; x=x+200) {
    fill(200,250,250,10)
    circle(x,800,x,100);
    fill(100,200,0,10)
    circle(x, 600, x, 300);
    fill(0,200,200,10)
    circle(x,400,x,500);
    fill(250,0,200,10)
    circle(x,200,x,700);
   }
 
   noStroke();
   for (var x = bassVol; x < width; x=x+200) {
     fill(250,0,200,30)
     circle(x,200,x,700);
     fill(100,200,200,30)
     circle(x, 400, x, 500);
     fill(100,200,0,30)
     circle(x,600,x,300);
     fill(200,250,250,30)
     circle(x,800,x,100);
    }
  
}
