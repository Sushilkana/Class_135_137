var play_video = "";
var status = "";
var object = "";

function preload() {
    play_video = createVideo('video.mp4');
    // play_video.hide();
}

function setup() {
    canvas = createCanvas(600,400);
    canvas.center();
}

function draw(){
    image(play_video,0,0,600,400);
    if(status != ""){
        objectDetector.detect(play_video,gotResult);
        for(i=0; i<= object.length;i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("object_number").innerHTML = "Object detected count: " + object.length;
            
            stroke("red");
            fill("red");
            noFill();

            percent = floor(object[i].confidence * 100);
            text(object[i].lable + percent + "%");

            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        object = results;
    }
}

function Start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status: Object Detecting";
}

function modelLoaded(){
    console.log("The cocossd model as loaded...");
    status = true;
    play_video.loop();
    play_video.speed(1);
    play_video.volume(0);
}