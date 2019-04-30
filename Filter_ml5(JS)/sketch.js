let video;
let poseNet;
let nosex =0;
let nosey =0;
let eyelx =0;
let eyely =0;
let eyerx =0;
let eyery =0;
function setup(){
	createCanvas(640,480);
	video = createCapture(VIDEO);
	video.hide();
	poseNet = ml5.poseNet(video, modelReady);
	poseNet.on('pose',gotPoses);
}
function modelReady(){
console.log('model ready');
}

function gotPoses(poses){
	//console.log(poses);
	if(poses.length>0){
	let newx = poses[0].pose.keypoints[0].position.x;
	let newy = poses[0].pose.keypoints[0].position.y;
	let elx= poses[0].pose.keypoints[1].position.x;
	let ely= poses[0].pose.keypoints[1].position.y;
  let erx= poses[0].pose.keypoints[2].position.x;
	let ery= poses[0].pose.keypoints[2].position.y;
		nosex = lerp(nosex, newx, 0.5);
		nosey = lerp(nosey, newy, 0.5);
		eyelx = lerp(eyelx, elx,0.5);
		eyely = lerp(eyely, ely,0.5);
    eyerx = lerp(eyerx, erx,0.5);
		eyery = lerp(eyery, ery,0.5);
	}
}
function draw(){
	image(video, 0, 0);
  
  let d = dist(nosex, nosey, eyelx, eyely)
	fill(255, 0,0);
	ellipse(nosex,nosey,d);
	
  eye(eyelx, eyely, d,1);
  eye(eyerx, eyery, d, -1);
	
}

function eye(x, y, size, n){
  
  let angle = frameCount *0.2;
  
  fill(255);
	noStroke();
	ellipse(x, y, size, size);
	
	fill(56);
	ellipse(x+cos(angle*n)*size/5, y+sin(angle*n)*size/5, size/2, size/2);
  noStroke();
}