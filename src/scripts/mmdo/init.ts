import { moduleSimplexTable } from "./simplexTable";
import { Matrix } from './Matrix';
import FileSystem from './../Classes/FileSystem/FileSystem';
import { path, shell } from "../requiredLib/requiredLib";

let arrayMainFunction: number[]  = []
let countX = 4,countLimitation = 5;
const matrix = new Matrix();
let dataInput : any;

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
	document.querySelector(".btn_for_calc_min_cost_event").addEventListener("click", () => {
		matrix.createMatrix(countX);
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

		dataInput = matrix.fillMatrix(_tempArrayLimLeft, _tempArrayRight,_tempArraySymbolLimitation, countX,countLimitation,arrayMainFunction);
		renderBtns(document.querySelector(".btn-controls-render"),document.querySelector(".tables_simplex_table"))
		document.querySelector(".result_simplex_table").scrollTo({top:0,behavior:"smooth"})
	
	});

}

function renderBtns(outerPlace:HTMLElement,modifyZone:HTMLElement){
outerPlace.innerHTML = "";
outerPlace.innerHTML += `
<div class="zoom-in-table"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
<div class="zoom-out-table"><i class="fa-solid fa-magnifying-glass-minus"></i></div>
<div class="save-log-file-calculating"><i class="fa-regular fa-file-lines"></i></div>
`
let modifyPadding:number = 400,step = 50,maxLimit = 400
	document.querySelector(".zoom-out-table").addEventListener("click",()=>{
			modifyPadding < maxLimit && (modifyPadding+=step)
			modifyZone.style.padding = `0 ${modifyPadding}px`
	})
	document.querySelector(".zoom-in-table").addEventListener("click",()=>{
		modifyPadding <= 0 ? (modifyPadding = 0) : (modifyPadding -=step) 
		modifyZone.style.padding = `0 ${modifyPadding}px`
})
	document.querySelector(".save-log-file-calculating").addEventListener("click",()=>{
		console.log(matrix.getResultData())
		let _pathLog = path.join(FileSystem.PATHS.logs, `${Date.now().toString()}.log`)
		FileSystem.createLog(matrix.getResultData(),dataInput,_pathLog)
		shell.showItemInFolder(_pathLog)
	})
}
document.querySelector(".btn_set_matrix").addEventListener("click",()=>{
		
	document.querySelector(".section_set_matrix").classList.add("active")
})
document.querySelector(".close_win_set_matrix").addEventListener("click",()=>{
document.querySelector(".section_set_matrix").classList.remove("active")
console.log("click")
})
document.querySelector(".btn_save_matrix").addEventListener("click",()=>{
countX = parseInt(document.querySelector<HTMLInputElement>(".count_x").value);
countLimitation = parseInt(document.querySelector<HTMLInputElement>(".count_limitation").value);
renderCountXFunction(countX, document.querySelector(".inputs_x"));
renderLimitationCount(countX, countLimitation, document.querySelector(".limitation_block"));
document.querySelector(".section_set_matrix").classList.remove("active")
})
renderCountXFunction(countX, document.querySelector(".inputs_x"));
renderLimitationCount(countX, countLimitation, document.querySelector(".limitation_block"));
//limitation_block
export const renderPageCalc = () => {};
