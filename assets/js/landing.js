var RENDERER = {
	RESIZE_INTERVAL : 30,
	RADIUS : 25,
	RATE : 0.98,

	init : function(){
		this.setParameters();
		this.setup();
		this.reconstructMethods();
		this.bindEvent();
		this.render();
	},
	setParameters : function(){
		this.$window = $(window);
		this.$container = $('#jsi-hex-container');
		this.$canvas = $('<canvas />');
		this.context = this.$canvas.appendTo(this.$container).get(0).getContext('2d');
		this.hexagons = [];
		this.resizeIds = [];
	},
	setup : function(){
		this.hexagons.length = 0;
		this.resizeIds.length = 0;
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.$canvas.attr({width : this.width, height : this.height});
		this.createHexagons();
	},
	getRandomValue : function(min, max){
		return min + (max - min) * Math.random() | 0;
	},
	createHexagons : function(){
		this.radius = this.RADIUS * this.RATE;
		this.vertices = [];

		for(var i = 0; i < 6; i++){
			this.vertices.push({x : this.radius * Math.sin(Math.PI / 3 * i), y : -this.radius * Math.cos(Math.PI / 3 * i)});
		}
		this.vertices.push(this.vertices[0]);
		this.hexWidth = this.RADIUS * Math.cos(Math.PI / 6) * 2;
		this.hexHeight = this.RADIUS * (2 - Math.sin(Math.PI / 6));

		var countX = Math.ceil(this.width / this.hexWidth) + 1,
			countY = Math.ceil(this.height / this.hexHeight) + 1,
			offsetX = -(countX * this.hexWidth - this.width) / 2,
			offsetY = -(countY * this.hexHeight - this.height) / 2;

		countX++;

		for(var y = 0; y < countY; y++){
			for(var x = 0; x < countX; x++){
				this.hexagons.push(new HEXAGON(this, offsetX + (x + 0.5) * this.hexWidth - (y % 2 == 1 ? 0 : this.hexWidth / 2), offsetY + (y + 0.5) * this.hexHeight));
			}
		}
		for(var y = 0; y < countY; y++){
			for(var x = 0; x < countX; x++){
				var hexagon = this.hexagons[y * countX + x];

				if(x < countX - 1){
					hexagon.neighbors[0] = this.hexagons[y * countX + x + 1];
				}
				if((x < countX - 1 || y % 2 == 0) && y < countY - 1){
					hexagon.neighbors[1] = this.hexagons[(y + 1) * countX + x + (y % 2 == 1 ? 1 : 0)];
				}
				if((x > 0 || y % 2 == 1) && y < countY - 1){
					hexagon.neighbors[2] = this.hexagons[(y + 1) * countX + x + (y % 2 == 1 ? 0 : -1)];
				}
				if(x > 0){
					hexagon.neighbors[3] = this.hexagons[y * countX + x - 1];
				}
				if((x > 0 || y % 2 == 1) && y > 0){
					hexagon.neighbors[4] = this.hexagons[(y - 1) * countX + x + (y % 2 == 1 ? 0 : -1)];
				}
				if((x < countX - 1 || y % 2 == 0) && y > 0){
					hexagon.neighbors[5] = this.hexagons[(y - 1) * countX + x + (y % 2 == 1 ? 1 : 0)];
				}
			}
		}
		this.hexagons[this.getRandomValue(0, this.hexagons.length - 1)].select();
	},
	watchWindowSize : function(){
		while(this.resizeIds.length > 0){
			clearTimeout(this.resizeIds.pop());
		}
		this.tmpWidth = this.$window.width();
		this.tmpHeight = this.$window.height();
		this.resizeIds.push(setTimeout(this.jdugeToStopResize, this.RESIZE_INTERVAL));
	},
	jdugeToStopResize : function(){
		var width = this.$window.width(),
			height = this.$window.height(),
			stopped = (width == this.tmpWidth && height == this.tmpHeight);

		this.tmpWidth = width;
		this.tmpHeight = height;

		if(stopped){
			this.setup();
		}
	},
	reconstructMethods : function(){
		this.selectHexagon = this.selectHexagon.bind(this);
		this.watchWindowSize = this.watchWindowSize.bind(this);
		this.jdugeToStopResize = this.jdugeToStopResize.bind(this);
		this.render = this.render.bind(this);
	},
	selectHexagon : function(event){
		var axis = this.getAxis(event);

		for(var i = 0, count = this.hexagons.length; i < count; i++){
			this.hexagons[i].judge(axis.x, axis.y);
		}
	},
	getAxis : function(event){
		var offset = this.$container.offset();
		return {x : event.clientX - offset.left + this.$window.scrollLeft(), y : event.clientY - offset.top + this.$window.scrollTop()};
	},
	bindEvent : function(){
		this.$window.on('resize', this.watchWindowSize);
		this.$container.on('click', this.selectHexagon);
	},
	render : function(){
		requestAnimationFrame(this.render);

		this.context.fillStyle = 'hsla(320, 25.00%, 81.20%, 0.30)';
		this.context.fillRect(0, 0, this.width, this.height);

		for(var i = 0, count = this.hexagons.length; i < count; i++){
			this.hexagons[i].render(this.context);
		}
	}
};
var HEXAGON = function(renderer, x, y){
	this.renderer = renderer;
	this.x = x;
	this.y = y;
	this.init();
};
HEXAGON.prototype = {
	COUNT : {MIN : 5, MAX : 50},
	LUMINANCE : {MIN : 10, MAX : 70},

	init : function(){
		this.selections = [];
		this.neighbors = new Array(6);
		this.sourceIndices = [];
	},
	judge : function(x, y){
		if(x < this.x - this.renderer.hexWidth / 2 || x > this.x + this.renderer.hexWidth / 2
			|| y < this.y - this.renderer.RADIUS || y > this.y + this.renderer.RADIUS
			|| y < this.y && Math.abs((x - this.x) / (y - this.y + this.renderer.RADIUS)) > Math.tan(Math.PI / 3)
			|| y > this.y && Math.abs((x - this.x) / (y - this.y - this.renderer.RADIUS)) > Math.tan(Math.PI / 3)){
			return;
		}
		this.select();
	},
	select : function(){
		this.hue = this.renderer.getRandomValue(100, 300);
		this.selections.push({count : 0, hue : this.hue});
	},
	relate : function(sourceIndices){
		this.sourceIndices.push(sourceIndices);
	},
	draw : function(context, targets){
		for(var i = 0; i < targets.length; i++){
			var target = targets[i],
				fillLuminance = 0,
				strokeLuminance = 0;

			if(target.count < this.COUNT.MIN){
				fillLuminance = this.LUMINANCE.MIN + (this.LUMINANCE.MAX - this.LUMINANCE.MIN) * Math.pow(Math.sin(Math.PI / 2 * target.count / this.COUNT.MIN), 3);
			}else if(target.count < this.COUNT.MAX){
				fillLuminance = this.LUMINANCE.MIN + (this.LUMINANCE.MAX - this.LUMINANCE.MIN) * Math.pow(Math.sin(Math.PI / 2 * (1 + (target.count - this.COUNT.MIN) / (this.COUNT.MAX - this.COUNT.MIN))), 3);
			}
			if(target.count < this.COUNT.MIN * 2){
				strokeLuminance = this.LUMINANCE.MIN + (this.LUMINANCE.MAX - this.LUMINANCE.MIN) * Math.sin(Math.PI / 2 * target.count / this.COUNT.MIN / 2);
			}else if(target.count < this.COUNT.MAX * 2){
				strokeLuminance = this.LUMINANCE.MIN + (this.LUMINANCE.MAX - this.LUMINANCE.MIN) * Math.sin(Math.PI / 2 * (1 + (target.count - this.COUNT.MIN * 2) / (this.COUNT.MAX - this.COUNT.MIN) / 2));
			}
			context.fillStyle = 'hsla(' + target.hue + ', 333%, ' + fillLuminance + '%, 0.3)';
			context.fill();
			context.strokeStyle = 'hsla(' + target.hue + ', 333%, ' + strokeLuminance + '%, 0.3)';
			context.stroke();
		}
	},
	render : function(context){
		context.save();
		context.globalCompositeOperation = 'lighter';
		context.translate(this.x, this.y);
		context.beginPath();

		for(var i = 0, vertices = this.renderer.vertices; i < 6; i++){
			context[i == 0 ? 'moveTo' : 'lineTo'](vertices[i].x, vertices[i].y);
		}
		context.closePath();
		context.fillStyle = 'hsla(348, 333%, ' + this.LUMINANCE.MIN + '%, 0.3)';
		context.fill();

		this.draw(context, this.selections);
		this.draw(context, this.sourceIndices);
		context.restore();

		for(var i = this.selections.length - 1; i >= 0; i--){
			var selection = this.selections[i];

			if(selection.count == this.COUNT.MIN){
				for(var j = 0; j < 6; j++){
					if(this.neighbors[j]){
						var indices = [];

						for(var k = 0; k < 3; k++){
							var index = j - 1 + k;
							index += 6;
							index %= 6;
							indices.push(index);
						}
						this.neighbors[j].relate({indices : indices, hue : this.hue, count : 0});
					}
				}
			}
			if(++selection.count == this.COUNT.MAX * 2){
				this.selections.splice(i, 1);
			}
		}
		for(var i = this.sourceIndices.length - 1; i >= 0; i--){
			var indices = this.sourceIndices[i],
				index = indices.indices[this.renderer.getRandomValue(0, 3)];

			if(this.neighbors[index] && indices.count == this.COUNT.MIN){
				this.neighbors[index].relate({indices : indices.indices, hue : indices.hue, count : 0});
			}
			if(++indices.count == this.COUNT.MAX * 2){
				this.sourceIndices.splice(i, 1);
			}
		}
	}
};
$(function(){
	RENDERER.init();
});
