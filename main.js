var canvas1 = document.getElementById("canvas1");
var context = canvas1.getContext("2d");

// canvas1.onmousedown = function () {
// 	canvas1.onmousemove = function (event) {
// 		var x = event.offsetX;
// 		var y = event.offsetY;

// 		context.fillStyle = "#fff";
// 		context.fillRect(x, y, 5, 5);
// 	};
// 	canvas1.onmouseup = function () {
// 		canvas1.onmousemove = null;
// 	};
// };

// var upx;
// var upy;

// var x;
// var y;

// canvas1.onmousedown = function (event) {
// 	x = event.offsetX;
// 	y = event.offsetY;

// 	canvas1.onmousemove = function (event) {
// 		upx = event.offsetX;
// 		upy = event.offsetY;

// 		context.clearRect(0, 0, 500, 500);
// 		context.beginPath();
// 		context.strokeStyle = "#fff";
// 		context.lineWidth = 1;
// 		context.moveTo(x, y);
// 		context.lineTo(upx, upy);
// 		context.stroke();
// 	};

// 	canvas1.onmouseup = function (event) {
// 		canvas1.onmousemove = null;
// 	};
// };

var arr = [[]];
var number = 0;
var newObg = true;

function lastPointX() {
	return arr[number][arr[number].length - 1].x;
}
function lastPointY() {
	return arr[number][arr[number].length - 1].y;
}

function startArrow(x, y, arrow = 20) {
	return x >= arr[number][0].x - arrow && x <= arr[number][0].x + arrow && y >= arr[number][0].y - arrow && y <= arr[number][0].y + arrow;
}

canvas1.onclick = function (event) {
	context.beginPath();
	context.strokeStyle = "#fff";
	context.lineWidth = 5;
	if (newObg) {
		arr[number].push({ x: event.offsetX, y: event.offsetY });

		if (arr[number].length == 1) {
			context.moveTo(lastPointX(), lastPointY());

			console.log("1");
		} else if (startArrow(event.offsetX, event.offsetY)) {
			context.fillStyle = "rgba(255, 255, 255, 0.25)";
			context.fill();
			context.closePath();

			newObg = false;
			console.log("2");
		} else {
			context.lineTo(lastPointX(), lastPointY());
			context.stroke();

			console.log("3");
		}
		context.stroke();
	} else {
		++number;
		arr.push([]);
	}
};
