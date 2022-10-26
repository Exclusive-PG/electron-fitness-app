import { moduleSimplexTable } from "./simplexTable";

let arrayMainFunction: number[]  = []
let matrix: number[] | any[] = [];

function renderCountXFunction(countX: number, outerPlace: HTMLElement) {
	outerPlace.innerHTML = "";
	for (let index = 0; index < countX; index++) {
		outerPlace.innerHTML += `
        ${index < countX - 1 ? `<input type="number" value="1"> x${index + 1} +` : `<input type="number" value="2"> x${index + 1}`}
        `;
	}
	//document.querySelector(".btn_for_calc_min_cost").addEventListener("click", () => {

	//});
}

function renderLimitationCount(countX: number, countLimitation: number, outerPlace: HTMLElement) {
	outerPlace.innerHTML = "";

	for (let i = 0; i < countLimitation; i++) {
		outerPlace.innerHTML += `<div class="limitation_item"></div>`;
	}
	document.querySelectorAll(".limitation_item ").forEach((item, index) => {
		for (let index = 0; index < countX; index++) {
			item.innerHTML += `
			${index < countX - 1 ? `<input type="number" value="4" class="lim_left_side"> x${index + 1} +` : `<input type="number" value="5" class="lim_left_side"> x${index + 1}`}
			`;
		}
		item.innerHTML += `
		<select class="select_symbol_for_limitation">
			<option value="1"> ≤ </option>
			<option value="-1"> ≥ </option>
		</select>
		<input type="number" value="0" class="lim_right_side">
		`;
	});
	document.querySelector(".btn_for_calc_min_cost").addEventListener("click", () => {
		createMatrix(countLimitation);
		let _tempArrayLimLeft: any[] = [];
		let _tempArrayRight: any[] = [];
		let _tempArraySymbolLimitation: any[] = [];
		arrayMainFunction = [];
		document.querySelectorAll(".limitation_item > .lim_left_side").forEach((item: HTMLInputElement, index: number) => {
			_tempArrayLimLeft.push(parseInt(item.value));
			//console.log(_tempArray)
		});
		document.querySelectorAll(".lim_right_side").forEach((item:HTMLInputElement) => {
			_tempArrayRight.push(parseInt(item.value))
		});
		document.querySelectorAll(".select_symbol_for_limitation").forEach((item:HTMLSelectElement)=>{
			_tempArraySymbolLimitation.push(parseInt(item.value))
		});
	
		[...document.querySelector(".inputs_x").children].forEach((item: HTMLInputElement) => {
			arrayMainFunction.push(parseInt(item.value));
		});
		arrayMainFunction.push(0);
		console.log(arrayMainFunction);

		fillMatrix(_tempArrayLimLeft, _tempArrayRight,_tempArraySymbolLimitation, countX,countLimitation);
	});
}
function createMatrix(countLim: number) {
	matrix = [];
	for (let index = 0; index < countX+1; index++) {
		matrix[index] = [];
	}
}
function fillMatrix(dataLimLeft: Array<number>, dataLimRight: Array<number>, dataSymbol:Array<number>, countX: number,countLimitation:number) {
	let _countGoal = countX;
	let indexMatrix = 0;
	console.log(dataLimLeft)
	dataLimLeft.forEach((item, index) => {
		if (_countGoal === index) {
			indexMatrix++;
			_countGoal += countX;
		}
		console.log(`  ${index}  === ${_countGoal} `)
		matrix[indexMatrix].push(item);
	});
	dataLimRight.forEach((item,index)=>{
		matrix[index].push(item)
	})

	for (let i = 0; i < countLimitation; i++) {
		for (let j = 0; j < countX+1; j++) {
			console.log(`${ matrix[i][j]} * ${dataSymbol[i]}`)
			matrix[i][j] = matrix[i][j]*dataSymbol[i] 
		
		}
		
	}
	//matrix[countLimitation] = arrayMainFunction

	// dataSymbol.forEach((item,index)=>{
	// 	console.log(matrix[index])
	// })
	moduleSimplexTable(matrix,arrayMainFunction,countX,countLimitation)
//	console.log(matrix,arrayMainFunction);
}

let countX = 4,countLimitation = 5;
renderCountXFunction(countX, document.querySelector(".inputs_x"));
renderLimitationCount(countX, countLimitation, document.querySelector(".limitation_block"));
//limitation_block
export const renderPageCalc = () => {};
