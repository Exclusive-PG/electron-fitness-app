function renderCountXFunction(countX: number, outerPlace: HTMLElement) {
	let arrayMainFunction: number[] = [];
	outerPlace.innerHTML = "";
	for (let index = 0; index < countX; index++) {
		outerPlace.innerHTML += `
        ${index < countX - 1 ? `<input type="number" value="1"> x${index + 1}+` : `<input type="number" value="2"> x${index + 1}`}
        `;
	}
	document.querySelector(".btn_for_calc_min_cost").addEventListener("click", () => {
		arrayMainFunction = [];
		[...outerPlace.children].forEach((item: HTMLInputElement) => {
			// console.log(item.value)
			arrayMainFunction.push(parseInt(item.value));
		});
		arrayMainFunction.push(0);
		console.log(arrayMainFunction);
	});
}

renderCountXFunction(4, document.querySelector(".inputs_x"));
export const renderPageCalc = () => {};
