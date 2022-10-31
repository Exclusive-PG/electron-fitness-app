export const moduleSimplexTable = (InputMatrix, MainFunc, maxCountX, maxLimitation, outerPlaceTable,outerPlaceVariables) => {

	("use strict");
	let matrix, horisont_x, vertical_x, Fun, iteration, min_k1_num, min_k_num;
	outerPlaceTable.innerHTML = "";
	outerPlaceVariables.innerHTML = "";
	/*################## ШАГ 0 ##################*/
	// Перебираем все ограничения

	matrix = InputMatrix;

	console.log(matrix);
	// Массив индексов по горизонтале
	horisont_x = [];
	for (let i = 0; i < maxCountX + 1; i++) {
		horisont_x[i] = i;
	}
	console.log("horisont_x", horisont_x);

	// Массив индексов по вертикале
	vertical_x = [];
	for (let i = 0; i < maxLimitation; i++) {
		vertical_x[i] = i + maxCountX;
	}
	console.log("vertical_x", vertical_x);

	// Матрица свободных членов
	let free = [];
	for (let k = 0; k < matrix.length; k++) {
		free[k] = matrix[k][maxCountX];
	}

	free[matrix.length] = 0;
	console.log("free", free);

	// Последняя строка сама функция  Матрица исходных значений
	Fun = MainFunc;

	//console.log("Fun",Fun)
	// Добавим ее в основную матрицу
	matrix.push(Fun);

	console.log("matrix", matrix);
	// Есть ли  отрицательные элементы в матрице свободных членов ?
	if (minelm(free) < 0) {
		iteration = 0; // счетчик итераций, для защиты от зависаний
		step1(); // Переходим к шагу 1
	}
	// Есть ли  отрицательные элементы в коэфициентах функции (последняя строчка) ?
	if (minelm(matrix[matrix.length - 1], false, true) < 0) {
		iteration = 0; // счетчик итераций, для защиты от зависаний
		step2(); // Переходим к шагу 2
	}
	print_table(matrix, horisont_x, vertical_x, outerPlaceTable); // Отображаем итоговую таблицу
	results(); // Отображаем результаты в понятном виде

	/*################## ШАГ1 ##################*/
	function step1() {
		iteration++;
		// находим ведущую строку
		min_k_num = minelm(free, true, true);
		console.log("min_k_num", min_k_num);
		console.log(`matrix[${min_k_num}]`, matrix[min_k_num]);
		// находим ведущий столбец

		if (minelm(matrix[min_k_num]) < 0) {
			min_k1_num = minelm(matrix[min_k_num], true, true);
			console.log(min_k1_num, "min_k1_num");
		} else {
			alert("Условия задачи несовместны и решений у нее нет");
			return false;
		}
		// Печатаем таблицу и выделяем на ней ведущие строку и столбец
		console.log(`ведущие строку и столбец : ROW ${min_k_num} , COL ${min_k1_num}`);
		print_table(matrix, horisont_x, vertical_x, outerPlaceTable, min_k_num, min_k1_num);
		// Обновляем индексы элементов по горизонтале и вертикале
		let tmp = horisont_x[min_k1_num];
		horisont_x[min_k1_num] = vertical_x[min_k_num];
		vertical_x[min_k_num] = tmp;

		// Замена
		update_matrix(min_k_num, min_k1_num);
		// матрица свободных членов
		for (let k = 0; k < matrix.length; k++) {
			free[k] = matrix[k][maxCountX];
		}
		console.log("ЗАМЕНА FREE", free);
		if (minelm(free, false, true) < 0 && iteration < 10)
			// нужно ли еще разок пройти второй шаг ?
			//if (confirm("продолжаем Шаг 1_"+iteration+" ?")) // Да здравсвует рекурсия, но спросим (чтобы комп не завис)
			step1();
	}

	/*################## ШАГ2 ##################*/
	function step2() {
		let min_row_num = 999,
			min_k_num;
		iteration++;
		// находим ведущий столбец
		let min_col_num = minelm(matrix[matrix.length - 1], true, true);

		// находим ведущую строку
		let cols_count = matrix[0].length - 1;
		// эмпирический коэфициент, тк мы не знаем, положително ли нулевое отношение
		let min_row = 9999;
		let tmp = 0;
		for (let i = 0; i < matrix.length - 1; i++) {
			tmp = free[i] / matrix[i][min_col_num];
			if (tmp < min_row && tmp >= 0) {
				min_row_num = i;
				min_row = tmp;
			}
		}

		min_k1_num = min_col_num;
		min_k_num = min_row_num;
		// Печатаем таблицу и выделяем на ней ведущие строку и столбец
		print_table(matrix, horisont_x, vertical_x, outerPlaceTable, min_k_num, min_k1_num);
		// Обновляем индексы элементов по горизонтале и вертикале
		tmp = horisont_x[min_k1_num];
		horisont_x[min_k1_num] = vertical_x[min_k_num];
		vertical_x[min_k_num] = tmp;
		// Если мы не нашли ведущую строку (999 - это наш эмпирический коэфициент)
		if (min_row_num == 999) {
			alert("функция в области допустимых решений задачи не ограничена");
			return false;
		}

		// Замена
		update_matrix(min_k_num, min_k1_num);
		// матрица свободных членов
		for (let k = 0; k < matrix.length; k++) {
			free[k] = matrix[k][maxCountX];
		}

		// нужно ли еще разок пройти второй шаг ?
		if (minelm(matrix[matrix.length - 1], false, true) < 0 && iteration < 10)
			// Да здравсвует рекурсия, но спросим, чтобы комп не завис
			//if (confirm("продолжаем Шаг 2_"+iteration+" ?"))
			step2();
	}
	// Функция замены (обновления матрицы)
	function update_matrix(min_k_num, min_k1_num) {
		let matrix1 = new Array();

		for (let i = 0; i < matrix.length; i++) {
			matrix1[i] = new Array();
			for (let j = 0; j < matrix[0].length; j++) {
				if (i == min_k_num && j == min_k1_num) {
					matrix1[i][j] = 1 / matrix[i][j];
				} else {
					if (i == min_k_num) {
						matrix1[i][j] = (matrix[i][j] * 1) / matrix[min_k_num][min_k1_num];
					} else {
						if (j == min_k1_num) {
							matrix1[i][j] = (-matrix[i][j] * 1) / matrix[min_k_num][min_k1_num];
						} else {
							matrix1[i][j] = matrix[i][j] - (matrix[i][min_k1_num] * matrix[min_k_num][j]) / matrix[min_k_num][min_k1_num];
						}
					}
				}
				matrix1[i][j] = Math.round(matrix1[i][j] * 1000) / 1000;
			}
		}
		matrix = matrix1;

		return false;
	}

	// Выводим результаты в понятном виде
	function results() {
		let nulls = "";
		//let nullsRes = []
		let valueRes = []
		// Иксы, равные нулю
		for (let i = 0; i < horisont_x.length - 1; i++) {
			if (horisont_x[i] < maxCountX) {
				nulls += "X" + (horisont_x[i] + 1) + "=";
				let _key = "X" + (horisont_x[i] + 1)
				valueRes.push({var:_key,value:0})
			}
		}
		
		nulls += "0 <br />";
		let vars = "";
		// Иксы, отличные от нуля
		for (let i = 0; i < vertical_x.length; i++) {
			if (vertical_x[i] < maxCountX){ 
				vars += "X" + (vertical_x[i] + 1) + "=" + matrix[i][maxCountX] + "<br />";
				let _key = "X" + (vertical_x[i] + 1);
				valueRes.push({ var: _key, value : matrix[i][maxCountX]})
		}
			
		}
		console.log(valueRes)
		let main_result = "";
		// Минимум(максимум) функции
		let res = 1;
		if (res > 0) main_result = "min F =" + matrix[matrix.length - 1][maxCountX] * -1;
		else main_result = "max F =" + matrix[matrix.length - 1][maxCountX];

		valueRes.push({var:"min F",value:matrix[matrix.length - 1][maxCountX] * -1})
		outerPlaceVariables.innerHTML += `<div class="result_variables">${nulls + vars + "<br />" + main_result}</div>`;
	}
	return false;
};

// // Вывод таблицы.
function print_table(arr, horisont_x, vertical_x, outerPlace, row, col) {
	let max_i = arr.length;
	let max_j = arr[0].length;
	let html_table = "";
	let html_head = "<th></th>";
	// заголовки
	console.log("PRINT");
	//console.log("2222",horisont_x)
	//console.log("HORISONT_X",horisont_x)
	for (let j = 0; j < max_j - 1; j++) {
		html_head += "<th>X" + (horisont_x[j] + 1) + "</th>";
	}
	html_head += "<th>Вільні члени</th>";
	html_head = "<thead><tr>" + html_head + "</tr></thead>";
	// Элементы
	for (let i = 0; i < max_i; i++) {
		html_table += "<tr>";
		if (!(i == max_i - 1)) {
			html_table += "<th>X" + (vertical_x[i] + 1) + "</th>";
		} else {
			html_table += "<th>F</th>";
		}

		for (let j = 0; j < max_j; j++) {
			html_table += "<td>" + arr[i][j] + "</td>";
		}
		html_table += "</tr>";
	}

	outerPlace.innerHTML += `<table class="simplex_table"> ${html_head}  ${html_table}  </table>`;
	// Выделяем колонку, если указана
	// if (col !== undefined)
	// 	$("table:last tr").each(function () {
	// 		$(this).children("td").eq(col).addClass("selected");
	// 	});
	console.log(`ROW:${row}|COL:${col}`);

	if (row !== undefined) {
		[...document.querySelectorAll(".simplex_table")[document.querySelectorAll(".simplex_table").length - 1].children[1].children].forEach((item, index) => {
			if (row === index) {
				//item.classList.add("selected")
				//console.log(item.children);
				item.classList.add("selected");
			}
			console.log(`AGA-row ${row}-index ${index}`);
		});
	}

	if (col !== undefined) {
		[...document.querySelectorAll(".simplex_table")[document.querySelectorAll(".simplex_table").length - 1].children[1].children].forEach((item, index) => {
			
				//item.classList.add("selected")
				//console.log(item.children);
				[...item.children].forEach((tdItem,tdIndex)=>{
					if((col+1)=== tdIndex){
						tdItem.classList.add("selected")
					}
					console.log(`AGA,COL${col} tdIndex:${tdIndex}`);
				})
			
			console.log(`AGA-row ${row}-index ${index}`);
		});
	}
	// // Выделяем строку, если указана
	// if (row !== undefined)
	// 	$("table:last tr")
	// 		.eq(row + 1)
	// 		.addClass("selected");
}
// Поиск минимального элемента
//minelm(free) < 0
function minelm(array, dispayNum, not_last) {
	console.log(array);
	let m = array[0];
	let num = 0;
	let len = 0;
	// если not_last, то последний элемент не учитываем в массиве
	if (not_last) {
		len = array.length - 2;
	} else {
		len = array.length - 1;
	}
	//console.log("not last",not_last)
	for (let i = 1; i <= len; i++) {
		if (array[i] < m) {
			m = array[i];
			num = i;
		}
	}

	// Выводим номер минимального
	if (dispayNum) {
		//console.log("num",num)
		return num;
	} else {
		// или значение
		//console.log(m)
		return m;
	}
}
