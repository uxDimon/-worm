const canvas1 = document.getElementById("canvas1");
const context = canvas1.getContext("2d");

let widthСlient = document.documentElement.clientWidth;
let heightСlient = document.documentElement.clientHeight;
const beckGlif = ".";
const symbolWidth = 8.8;
const symbolHeight = 12;
let text2d = [];
let rect = canvas1.getBoundingClientRect();
let colum = 67; // Количество строк
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
	if (c < colum && r < row && c >= 0 && r >= 0) {
		let num = 10000000000;
		text2d[c][r] = num;

		function tm() {
			setTimeout(() => {
				if (num > 9) {
					num = num / 10;
					text2d[c][r] = num;
					tm();
				} else {
					text2d[c][r] = beckGlif;
				}
			}, 100);
		}
		tm();
		lastC = c;
		lastR = r;
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

function canvasSize() {
	if (widthСlient >= 1000) {
		// задаем максимальную ширину
		canvas1.width = 1000;
	} else {
		canvas1.width = Math.floor(Math.floor(widthСlient / symbolWidth) * symbolWidth - symbolWidth);
	}

	if (heightСlient >= 800) {
		// задаем максимальную высоту
		canvas1.height = 800;
	} else {
		canvas1.height = Math.floor(Math.floor(heightСlient / symbolHeight) * symbolHeight - symbolHeight);
	}

	// обновляем стиль шрифта при изменение окна
	context.fillStyle = "#9E9E9E";
	context.font = "16px 'Anonymous Pro'";
}

window.addEventListener(
	"resize",
	() => {
		widthСlient = document.documentElement.clientWidth;
		heightСlient = document.documentElement.clientHeight;

		rect = canvas1.getBoundingClientRect();
		canvasSize();
	},
	false
);

canvasSize();
loop();
created2dText();

sinWaveArrey();
{
	let lastR, lastC, r, c;

	function mouseTouchEvent() {
		if (c != lastC) {
			changeNumArray(r, c);
			lastR = r;
			lastC = c;
			аnim = false; // останавливает анимацию
		}
		text2d[2][0] = r;
		text2d[1][0] = c;
	}

	function startAnimation() {
		аnim = true;
		sinWaveArrey();
	}

	canvas1.addEventListener(
		// событие для курсора мыши
		"mousemove",
		(event) => {
			r = Math.round(event.offsetX / symbolWidth);
			c = Math.round(event.offsetY / symbolHeight);
			mouseTouchEvent();
			console.log("m");
		},
		false
	);
	canvas1.addEventListener(
		"mouseout",
		() => {
			startAnimation();
		},
		false
	);

	canvas1.addEventListener(
		// события для тач экранов
		"touchmove",
		(event) => {
			r = Math.round((event.touches[0].clientX - rect.left) / symbolWidth);
			c = Math.round((event.touches[0].clientY - rect.top) / symbolHeight);
			mouseTouchEvent();
			console.log("t");
		},
		false
	);
	canvas1.addEventListener(
		"touchend",
		() => {
			startAnimation();
		},
		false
	);
}
