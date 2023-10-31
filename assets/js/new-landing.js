var hexagon_radius = 45;
var hexagon_max_absolute_speed = 0.05;
var hexagon_space_between = 1;
var hexagon_color = '#366189';
var hexagon_line_width = 2;

var changing_colors = true;
var changing_colors_speed = 0.1;

var fancy_graphics = false;

var canvas, ctx;

var hexagons = [];

var s3p3 = Math.sqrt(3);

var h = 175;

var decreasing_flag = false;

function init() {
	
	canvas = document.getElementById('new');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	canvas.style.width = canvas.width + 'px';
	canvas.style.height = canvas.height + 'px';
	ctx = canvas.getContext('2d');
	
	var hw = Math.ceil( canvas.width / ( 1.5 * hexagon_radius + hexagon_space_between * 2 ) ) + 1;
	var hh = Math.ceil( canvas.height / ( s3p3 * hexagon_radius + hexagon_space_between * 2 ) ) + 1;
	
	for(var x = -1;x<hw;x++)
		for(var y=0;y<hh;y++)
			addHexagon(
				 hexagon_radius + hexagon_space_between + ( 1.5 * hexagon_radius + hexagon_space_between * 2 ) * x,
				s3p3 * hexagon_radius / 2 + hexagon_space_between + ( s3p3 * hexagon_radius + hexagon_space_between * 2 ) * y - ( x%2 ? s3p3 * hexagon_radius / 2 : 0 ),
				{x: x, y: y}
			);
	
	ctx.fillStyle = 'rgba(0, 0, 0, 1)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	loop();
	
} 

function loop() {
	requestAnimFrame(loop);
	
	ctx.globalCompositeOperation = "source-over";
	
	ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	ctx.globalCompositeOperation = "lighter";
	ctx.lineWidth = hexagon_line_width;
	
	if(!fancy_graphics) {
		ctx.beginPath();
		for(var i=0;i<hexagons.length;i++){

			drawHexagonPath(i);

		}
		if(changing_colors) {
			ctx.shadowColor = ctx.strokeStyle = 'hsl(' + h + ', 100%, 50%)';
			if(h<230 && decreasing_flag==false){
				h+=changing_colors_speed;

			}
			else if (h>=230 && decreasing_flag==false){
				decreasing_flag = true;
				h-=changing_colors_speed;
			}
			else if(h>175 && decreasing_flag==true){
				h-=changing_colors_speed;

			}
			else if(h<=175 && decreasing_flag == true){
				decreasing_flag = false;
				//h+=changing_colors_speed;
			};
		}else
			ctx.shadowColor = ctx.strokeStyle = hexagon_color;
		ctx.shadowBlur = 20;
		ctx.stroke();
	}else {
		for(var i=0;i<hexagons.length;i++){
			ctx.beginPath();
			
			drawHexagonPath(i);
			
			if(changing_colors)
				ctx.shadowColor = ctx.strokeStyle = 'hsl(' + h + ', 100%, 50%)';
			else
				ctx.shadowColor = ctx.strokeStyle = hexagon_color;
			
			ctx.shadowBlur = 20;
			ctx.stroke();
		}
		
		if(changing_colors)
			h += changing_colors_speed;
		
	}
	
	
	
	
}

function addHexagon(x, y, opts) {
	var l = Math.floor(Math.random() * 6),
		p = Math.random();
	
	if(!opts) opts = {};
	
	hexagons.push({
		sl: opts.l || opts.l === 0 ? opts.l : l,
		p: opts.p || opts.p === 0 ? opts.p : p,
		x: x,
		y: y,
		speed: opts.speed || opts.speed === 0 ? opts.speed : ( Math.random() * hexagon_max_absolute_speed * 2 - hexagon_max_absolute_speed )
	});
}

function drawHexagonPath(hex_index) {
	
	var hex = hexagons[hex_index];
	
	ctx.save();
	ctx.translate(hex.x, hex.y);
	ctx.rotate(hex.a);
	
	ctx.moveTo(
		Math.cos( Math.PI / 3 * hex.sl ) * hexagon_radius + Math.cos( Math.PI / 3 * (hex.sl + 2) ) * hexagon_radius * hex.p,
		Math.sin( Math.PI / 3 * hex.sl ) * hexagon_radius +  Math.sin( Math.PI / 3 * (hex.sl + 2) ) * hexagon_radius * hex.p
	);
	
	//ctx.moveTo(hex.x, hex.y);
	
	ctx.lineTo(
		Math.cos( Math.PI / 3 * ( hex.sl + 1 ) ) * hexagon_radius,
		Math.sin( Math.PI / 3 * ( hex.sl + 1 ) ) * hexagon_radius
	);
	
	ctx.lineTo(
		Math.cos( Math.PI / 3 * ( hex.sl + 2 ) ) * hexagon_radius,
		Math.sin( Math.PI / 3 * ( hex.sl + 2 ) ) * hexagon_radius
	);
	
	ctx.lineTo(
		Math.cos( Math.PI / 3 * ( hex.sl + 3 ) ) * hexagon_radius,
		Math.sin( Math.PI / 3 * ( hex.sl + 3 ) ) * hexagon_radius
	);
	
	ctx.lineTo(
		Math.cos( Math.PI / 3 * ( hex.sl + 3 ) ) * hexagon_radius + Math.cos( Math.PI / 3 * (hex.sl + 5) ) * hexagon_radius * hex.p,
		Math.sin( Math.PI / 3 * ( hex.sl + 3 ) ) * hexagon_radius + Math.sin( Math.PI / 3 * (hex.sl + 5) ) * hexagon_radius * hex.p
	);
	
	ctx.restore();
	
	hex.p += hex.speed;
	if(hex.p > 1 || hex.p < 0) {
		hex.p = hex.speed < 0 ? 1 : 0;
		hex.sl += hex.speed < 0 ? -1 : 1;
		hex.sl = hex.sl % 6;
		hex.sl = hex.sl < 0 ? 4 - hex.sl : hex.sl;
	}
	
	hexagons[hex_index] = hex;
	
}

window.onload = function() {
	init();
};

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();