const canvas1 = document.getElementById("canvas1");
const context = canvas1.getContext("2d");

const beckGlif = ".";
let text2d = [];
let colum = 76;
let row = 57;

function created2dText() {
	for (let c = 0; c < colum; c++) {
		text2d.push([]);
		for (let r = 0; r < row; r++) {
			text2d[c].push(beckGlif);
		}
	}
}

function textGene() {
	let newStrPos = 0; // отступ сверхуъ
	let strText = "";

	for (let c of text2d) {
		for (let r of c) {
			strText += r;
		}
		context.fillText(strText, 0, newStrPos);
		strText = "";
		newStrPos = newStrPos + 12;
	}
}

function changeNumArray(r, c) {
	if (c < colum && r < row) {
		let num = 10000000000;
		text2d[c][r] = num;

		function tm() {
			setTimeout(() => {
				if (num > 9) {
					num = Math.round((num / 100) * 10);
					text2d[c][r] = num;
					tm();
				} else {
					text2d[c][r] = beckGlif;
				}
			}, 100);
		}
		tm();
	}
}

// function sinArrey() {
// 	let x = 0;
// 	let y = 0;

// 	function stepsSin() {
// 		setTimeout(() => {
// 			y = Math.sin(x);
// 			// y = 25 + 10 * y;
// 			y = 25 + 10 * ((y - (y / 100) * 50) / 3);
// 			x += 1;
// 			changeNumArray(Math.round(y), Math.round(x));
// 			// changeNumArray(Math.round(y) + 1, x);
// 			// changeNumArray(Math.round(y) + 2, x);
// 			console.log(Math.round(y));
// 			if (x >= colum) {
// 				x = 0;
// 			}
// 			stepsSin();
// 		}, 100);
// 	}
// 	stepsSin();
// }

function loop() {
	context.clearRect(0, 0, 1000, 1000);

	textGene();
	requestAnimationFrame(loop);
}

context.fillStyle = "#9E9E9E";
context.font = "16px 'Anonymous Pro'";
loop();
created2dText();

// sinArrey();

canvas1.onmousemove = (event) => {
	let r = Math.round(event.offsetX / 8.8);
	let c = Math.round(event.offsetY / 12);
	changeNumArray(r, c);
};
