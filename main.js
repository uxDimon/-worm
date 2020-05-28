const canvas1 = document.getElementById("canvas1");
const context = canvas1.getContext("2d");

const beckGlif = ".";
let text2d = [];
let colum = 76; // Количество строк
let row = 57; // Количество символов в строке
let аnim = true;

function created2dText() {
	// Создает 2d масив
	for (let c = 0; c < colum; c++) {
		text2d.push([]);
		for (let r = 0; r < row; r++) {
			text2d[c].push(beckGlif);
		}
	}
}

function drawArrey() {
	// Отрисовывает 2d масив
	let newStrPos = 0; // отступ сверхуъ
	let strText = "";

	for (let c of text2d) {
		for (let r of c) {
			strText += r;
		}
		context.fillText(strText, 0, newStrPos);
		strText = "";
		newStrPos += 12;
	}
}

function changeNumArray(r, c) {
	// Меняет символ в ячейке массива
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

function randomInteger(min, max) {
	// случайное число от min до max
	let rand = min + Math.random() * (max - min);
	return Number(rand.toFixed(2));
}

function sinWaveArrey() {
	// Создает волну в массиве
	let x = 0;
	let y = 0;
	let waveWidth = 0.1;

	function stepsSin() {
		setTimeout(() => {
			if (!аnim) {
				return;
			}
			y = 23 + 16 * Math.sin(x * waveWidth);
			x += 1;
			changeNumArray(Math.round(y), x);
			if (x >= colum) {
				x = 0;
				waveWidth = randomInteger(0.05, 0.3);
			}
			stepsSin();
		}, 30);
	}
	stepsSin();
}

function loop() {
	// Зацикленная функция для обновления холста
	context.clearRect(0, 0, 1000, 1000);
	drawArrey();
	requestAnimationFrame(loop);
}

context.fillStyle = "#9E9E9E";
context.font = "16px 'Anonymous Pro'";
loop();
created2dText();

sinWaveArrey();

canvas1.onmousemove = (event) => {
	let r = Math.round(event.offsetX / 8.8);
	let c = Math.round(event.offsetY / 12);
	changeNumArray(r, c);
	аnim = false;
};

canvas1.onmouseout = () => {
	аnim = true;
	sinWaveArrey();
};
