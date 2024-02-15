music = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload() {
    music = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(375, 130)
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded() {
    console.log("Modelo iniciado!");
    window.alert("Modelo iniciado!");
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score
        scoreLeftWrist = results[0].pose.keypoints[9].score
        console.log("Direita = " + scoreRightWrist + ", Esquerda = " + scoreLeftWrist)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("Direita X = " + rightWristX + "Direita Y = " + rightWristY + "Esquerda X = " + leftWristX + "Esquerda Y = " + leftWristY)

    }
}

function draw() {
    image(video, 0, 0, 600, 450);
    fill("green");
    stroke("darkgreen");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100){
            document.getElementById("speed").innerHTML = "Velocidade = 0.5x";
            music.rate(0.5);
        }
        else if(rightWristY > 100 && rightWristY <= 200){
            document.getElementById("speed").innerHTML = "Velocidade = 1x";
            music.rate(1);
        }
        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById("speed").innerHTML = "Velocidade = 1.5x";
            music.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Velocidade = 2x";
            music.rate(2);
        }
        else{
            document.getElementById("speed").innerHTML = "Velocidade = 2.5x";
            music.rate(2.5);
        }
        if(scoreLeftWrist >= 0.2){
            circle(leftWristX, leftWristY, 20)
            InNumberLeftWristY = Number(leftWristY);
            removeDecimal = floor(InNumberLeftWristY);
            volume = removeDecimal / 500;
            document.getElementById("volume").innerHTML = "Volume = " + volume;
            music.setVolume(volume);
        }
    }
}

function play() {
    music.play();
    music.setVolume(0.5);
    music.rate(1);
}

function pause() {
    music.pause();
}

function stop() {
    music.stop();
}