import { moduleSimplexTable } from "./simplexTable";
import { Matrix } from './Matrix';

let arrayMainFunction: number[]  = []
let countX = 4,countLimitation = 5;
const matrix = new Matrix({countX});


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
		matrix.createMatrix(countLimitation);
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

		matrix.fillMatrix(_tempArrayLimLeft, _tempArrayRight,_tempArraySymbolLimitation, countX,countLimitation,arrayMainFunction);
		renderZoomBtns(document.querySelector(".btn-controls-render"),document.querySelector(".result_simplex_table"))
	});
}

function renderZoomBtns(outerPlace:HTMLElement,modifyZone:HTMLElement){
outerPlace.innerHTML = "";
outerPlace.innerHTML += `
<div class="zoom-in-table"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
<div class="zoom-out-table"><i class="fa-solid fa-magnifying-glass-minus"></i></div>
`
let modifyPadding:number = 0,step = 50,maxLimit = 400
	document.querySelector(".zoom-out-table").addEventListener("click",()=>{
			modifyPadding < maxLimit && (modifyPadding+=step)
			modifyZone.style.padding = `0 ${modifyPadding}px`
	})
	document.querySelector(".zoom-in-table").addEventListener("click",()=>{
		modifyPadding <= 0 ? (modifyPadding = 0) : (modifyPadding -=step) 
		modifyZone.style.padding = `0 ${modifyPadding}px`
})
}

renderCountXFunction(countX, document.querySelector(".inputs_x"));
renderLimitationCount(countX, countLimitation, document.querySelector(".limitation_block"));
//limitation_block
export const renderPageCalc = () => {};
