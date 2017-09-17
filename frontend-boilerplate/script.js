'use strict';
/*
	clearRect, fillRect, rect, and strokeRect parameters:
	(xPosition,yPosition,width,height))
	
	arc(xPos,yPos,radius,sAngle,eAngle,antiClockwiseBoolean)
	
	arcTo(x1,y1,x2,y2,radius)
*/ 

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
	draw() { this.ctx.fillRect(this.xPos,this.yPos,this.width,this.height); }
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


window.onload = function() {
	var canvas = document.getElementById('screen');
	var ctx = canvas.getContext('2d');
	var wheel = new Circle(ctx,10,295,5);
	wheel.draw('fill');
	var cannon = new Rectangle(ctx,10,290,15,5);
	cannon.draw();
};



