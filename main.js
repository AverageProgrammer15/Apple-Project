
previous_x = 0;
previous_y = 0;

draw_apple = "";
draw_circle = "";
draw_rectangle = "";
content = null
to_number = 0;

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();


screen_height = 0;
screen_width = 0;



Apple = "apple.png"


function setup() {
  screen_width = window.innerWidth;
  screen_height = window.innerHeight;
  canvas = createCanvas(screen_width, screen_height-150);
  canvas.center()
  console.log("Canvas created and loaded.");
  background(220);



};

function preload(){
  apple = loadImage("apple.png");
  round = loadImage("circle.png");
  rectImg = loadImage("rectangle.png");

  if (apple && round && rect){
    console.log("All images have been loaded")
  }

  if (document.getElementById("p5_loading")){
    console.error("Canvas might not load!!")
  }
}



function start()
{
  document.getElementById("status").innerHTML = "System is listening please speak";  
  recognition.start();
} 
 
recognition.onresult = function(event) {

  

 content = event.results[0][0].transcript.toLowerCase();

 console.log("Recieved:", content)

 if (Number.isInteger(Number(content))){
  document.getElementById("status").innerHTML = "No. of apple to be drawn:", content; 
 }

 

 
 to_number = Number(content)
 speak_data = "Drawing",to_number,"apples"
 speak()
 draw("apple")

 
}



function draw(command){
  Rng = Math.floor(Math.random()*10);
  x = 0;
  y = 0;

  if (Number.isInteger(to_number)){
    if(command == "apple")
      {
        for (i=1; i<=to_number;i++){
          console.log(i)
          Rng = Math.floor(Math.random());
          console.log("Rng no.:", Rng)
          x = Rng * 700
          y = Rng * 400
          console.log("(",x,y,")")
          if (x == previous_x && previous_y == y){
            x += (Math.floor(Math.random() * 700));
            y += (Math.floor(Math.random() * 400));
            console.log("New:",x,y)
          }
          
          image(apple,x, y, 50,50)
          
        }
        draw_circle = "";
        draw_apple = "";
      } 
  } else{
    console.log("Can't recognize number")
  }
  
} 

function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    console.log("Speaking:", speak_data);
    synth.speak(utterThis);
    speak_data = ""
}