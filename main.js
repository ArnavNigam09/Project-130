function setup()
{
    canvas = createCanvas(600 , 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video , modelLoaded);
    poseNet.on('pose', gotPoses);
    
}

leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;


function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoint[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        leftwristX = results[0].pose.leftwrist.X;
        leftwristY = results[0].pose.leftwrist.Y;
        rightwristX = results[0].pose.rightwrist.X;
        rightwristY = results[0].pose.rightwrist.Y;
        console.log("leftwristX = " + leftwristX + "leftwristY = " + leftwristY);
        console.log("rightwristX = " + rightwristX + "rightwristY = " + rightwristY);
        
    }
}

function modelLoaded()
{
    console.log('poseNet is inisialized')
}

function draw()
{
    image(video, 0 , 0 , 600 , 500);
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightwristX, rightwristY,20);
    if(rightwristY>0 && rightwristY<=100)
    {
        document.getElementById("speed").innerHTML = "speed = 0.5x";
        song.rate(0.5);
    }
    else if(rightwristY>100 && rightwristY<200)
    {
        document.getElementById("speed").innerHTML = "speed = 1x";
        song.rate(1); 
    }
    else if(rightwristY>200 && rightwristY<=300)
    {
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
    }
    else if(rightwristY>300 && rightwristY<=400)
    {
        document.getElementById("speed").innerHTML = "speed  = 2x";
        song.rate(2);
    }
    else if(rightwristY>400 && rightwristY<=500)
    {
        document.getElementById("speed").innerHTML = "speed = 2.5x";
        song.rate(2.5);
    }
    if(scoreLeftWrist>0.2)
    {
    circle(leftwristX, leftwristY, 20);
    InNumberleftwristY = Number(leftwristY);
    remove_decimal = floor(InNumberleftwristY);
    volume = remove_decimal/(600-100);
    document.getElementById("volume").innerHTML = "volume =" + volume;
    song.setVolume(volume);
    }
}
song = "";

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);

}



    