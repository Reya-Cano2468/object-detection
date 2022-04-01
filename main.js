img = "";
status1 = "";
objects = [];


function preload() {
    
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = 'STATUS : Detecting Objects';
    

}

function draw() {
    image(video, 0, 0, 640, 420);

    if (status1 != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0; i < objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "no. of objects detected are -" + objects.length;
            fill(r,g,b)
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}


function modelLoaded() {
    console.log("Model Loaded");
    status1 = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log("Error")
    }
    console.log("results")
    objects = results;
}