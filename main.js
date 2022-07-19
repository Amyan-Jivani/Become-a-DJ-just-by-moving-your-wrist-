leftwristx=0;
rightwristx=0;
rightwristy=0;
leftwristy=0;
leftwrist_score=0;

function setup(){
canvas = createCanvas(600, 500);
canvas.center();
video = createCapture(VIDEO);
video.hide();
posenet=ml5.poseNet(video, modelLoaded);
posenet.on('pose', gotPoses);
}

function modelLoaded(){
    window.alert("Model Is Looooooooooaded");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("Left Wrist-x = "+ leftwristx + " Left Wrist-y = " + leftwristy);
        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("Right Wrist-x = "+ rightwristx + " Right Wrist-y = " + rightwristy);
        leftwrist_score=results[0].pose.keypoints[9].score;
        console.log("Score Of Left Wrist = " + leftwrist_score);
    }
}

function draw(){
    image(video, 0 , 0, 600, 500);
    if(leftwrist_score>0.2){
    fill("red");
    stroke("red");
    circle(leftwristx, leftwristy, 20);
    inNumberleftwristy=Number(leftwristy);
    remove_decimal=floor(inNumberleftwristy);
    volume=remove_decimal/500;
    document.getElementById("text_volume").innerHTML="Volume - " + volume;
    
    sound.setVolume(volume);
    }

}

sound = "";
function preload(){
    sound = loadSound("music.mp3");
}
function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}