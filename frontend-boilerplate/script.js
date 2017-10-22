'use strict';
/*
	clearRect, fillRect, rect, and strokeRect parameters:
	(xPosition,yPosition,width,height))
	
	arc(xPos,yPos,radius,sAngle,eAngle,antiClockwiseBoolean)
	
	arcTo(x1,y1,x2,y2,radius)
*/ 

const GAMELOOP_TIME = 16;
const UP_KEY = 119;
const DOWN_KEY = 115;
const SHOOT_KEY = 13;
var upIsPressed = false;
var downIsPressed = false;
var shootIsPressed = false;

class CannonBall {
	constructor(c,x,y,dx,dy) {
		this.c = c;
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
	}
	move() {
		if (this.y < 300 && this.x < 500) {
			//x motion
			this.x+=this.dx;
			//y motion
			this.y-=this.dy; 	
			this.dy-=0.05;
			
		}
	}
	draw() {
		this.c.beginPath();
		this.c.arc(this.x,this.y,1,0,2*Math.PI);
		this.c.stroke();
	}
	
}

class Cannon  { //NOTE: angle is in radians
		constructor(c,rLength,angle) {
			this.c = c;
			this.rLength = rLength;
			this.angle= angle;
			this.dAngle = .05;
			this.cbCollection = [];
		}
		getXVector() { 
			return this.rLength*Math.cos(this.angle);
		}
		getYVector() { 
			return 300-this.rLength*Math.sin(this.angle);
		}
		increaseAngle() { 
			if (this.angle < (Math.PI/2)) {
				this.angle+=this.dAngle;
			}
		}
		decreaseAngle() {
			if (this.angle > 0) {
				this.angle-=this.dAngle;
			}
		}
		changeY() {
			this.cbCollection.forEach(function(element) {
				element.dy+=0.5;
				console.log(element.dy);
			});
		}
		shoot() {
			this.cbCollection.push(new CannonBall(this.c,this.getXVector(),this.getYVector(),this.rLength*Math.cos(this.angle)/15,this.rLength*Math.sin(this.angle)/15));
			console.log(this.cbCollection.length);
		}
		draw() {
			this.c.beginPath();
			this.c.moveTo(0,300);
			this.c.lineTo(this.getXVector(),this.getYVector());
			this.c.stroke();
			this.cbCollection.forEach(function(element) {
				element.move();
				element.draw();
			});
		}
}


function CanvasClear(canvas,context) { c.clearRect(0,0,canvas.width,canvas.height); }


window.onload = function() {
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	var cannon = new Cannon(ctx,70,Math.PI/4);
	var counter = 0;
	window.onkeypress = function(e) {
		if (e.keyCode == UP_KEY) { 
			cannon.increaseAngle();
		}
		else if (e.keyCode == DOWN_KEY) { 
			cannon.decreaseAngle(); 
		}
		else if (e.keyCode == SHOOT_KEY) 
			cannon.shoot();
	};
	
	
	
	setInterval(function() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		cannon.draw();
		counter++;
	}, GAMELOOP_TIME);
};


