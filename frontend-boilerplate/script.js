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

class Shape {
	constructor(c,x,y) {
		this.ctx = c;
		this.xPos = x;
		this.yPos = y;
	}
	getX() { return this.xPos; }
	getY() { return this.yPos; }
	setX(x) { this.xPos = x; }
	setY(y) { this.yPos = y; }
	setColor(color) { this.ctx.fillStyle = color; }
	draw(){ }
}

class Rectangle extends Shape {
	constructor(c,x,y,w,h) { 
		super(c,x,y);
		this.width = w;
		this.height = h;
	}
	getWidth() { return this.width; }
	getHeight() { return this.height; }
	draw() { this.ctx.fillRect(this.xPos,this.yPos,this.width,this.height); }
}

class Cannon extends Rectangle {
	constructor(c,x,y,w,h) {
		super(c,x,y);
		this.width = w;
		this.height = h;
		this.degrees = 0;
	}
	move(degrees) {
		this.ctx.save();
		this.degrees+=1;
		this.ctx.rotate(this.degrees*Math.PI/180);
		this.ctx.xPos-=2;
		this.ctx.yPos-=3;
		
	}
}

class Circle extends Shape {
	constructor(c,x,y,r) {
		super(c,x,y);
		this.radius = r;
	}
	draw(style) { 
		this.ctx.arc(this.xPos,this.yPos,this.radius,0,2*Math.PI,false);
		switch (style.toLowerCase()) {
			case 'fill':
				this.ctx.fill();
				break;
			case 'stroke':
				this.ctx.stroke();
				break;
			default:
				alert("Error in circle class parameter!");
				break;
		}
	}	
}

class CannonBall extends Circle {
	constructor(c,x,y) {
		super(c,x,y);
		this.radius = 2;
		this.speed = 1;
		this.xPos_Saved = x;
	}
	reset() {
		this.xPos = this.xPos_Saved;
	}
}

function CanvasClear(canvas,context) { c.clearRect(0,0,canvas.width,canvas.height); }


window.onload = function() {
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	//var wheel = new Circle(ctx,13,297,3);
	var cannon = new Cannon(ctx,canvas.width/2,canvas.height/2,20,20);
	
	window.onkeypress = function(e) {
		if (e.keyCode == UP_KEY) { 
			cannon.move(10);
		}
		else if (e.keyCode == DOWN_KEY) { 
			cannon.setY(cannon.getY()+5);
		}
		else if (e.keyCode == SHOOT_KEY) 
			shootIsPressed = true;
	};
	
	
	setInterval(function() {
		ctx.clearRect(0,0,canvas.width,canvas.height);
		cannon.draw();
		//wheel.draw('fill');
	}, GAMELOOP_TIME);
};


