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

class Line  { //NOTE: angle is in radians
		constructor(c,rLength,angle) {
			this.c = c;
			this.rLength = rLength;
			this.angle= angle;
			this.dAngle = .1;
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
		draw() {
			this.c.beginPath();
			this.c.moveTo(0,300);
			this.c.lineTo(this.getXVector(),this.getYVector());
			this.c.stroke();
		}
}

function CanvasClear(canvas,context) { c.clearRect(0,0,canvas.width,canvas.height); }


window.onload = function() {
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	var cannon = new Line(ctx,20,0);
	
	window.onkeypress = function(e) {
		if (e.keyCode == UP_KEY) { 
			cannon.increaseAngle();
		}
		else if (e.keyCode == DOWN_KEY) { 
			cannon.decreaseAngle(); 
		}
		else if (e.keyCode == SHOOT_KEY) 
			shootIsPressed = true;
	};
	
	
	
	setInterval(function() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		cannon.draw();
	}, GAMELOOP_TIME);
};


