import User from "../Classes/User/User";
import { usersManager } from "../Classes/User/UsersManager";

const renderDailyIntakeHomePage = (outerPlace: HTMLElement, currentUser: User) => {
	const { dailyCalorieIntake } = currentUser.about.test;
	try {
		const arrayCards = [
			{
				title: "Kcal left",
				percent: 100,
				value: dailyCalorieIntake.calories.dailyCalorieIntake,
				color: "#f44336",
				eaten: dailyCalorieIntake.calories.eaten,
				burned: dailyCalorieIntake.calories.burned,
			},
		];

		const nutriens = [
			{
				title: "Carbs",
				percent:(50/dailyCalorieIntake.calories.dailyCarbs)*100,
                current:50,
				value: dailyCalorieIntake.calories.dailyCarbs,
				color: "#7ce2dd",
			},
			{
				title: "Protein",
				percent: (40/dailyCalorieIntake.calories.dailyProtein)*100,
                current:40,
				value: dailyCalorieIntake.calories.dailyProtein,
				color: "#c988f8",
			},
			{
				title: "Fat",
				percent: (20/dailyCalorieIntake.calories.dailyFat)*100,
                current:20,
				value: dailyCalorieIntake.calories.dailyFat,
				color: "#FFA117",
			},
		];

		let renderedStrNutriens = "";
		nutriens.forEach((item) => {
			renderedStrNutriens += `
                <div class="nutrien_item">
                    <div class="circular_card-small">
                    <div class="circular-progress-small" style="background:${circleProgressBar(item.percent, item.color)}">
                        <div class="value-container-small">${item.current.toFixed(0)} / ${item.value.toFixed(0)}g<br/>${item.title}</div>
                    </div>
                    </div>
                </div>
            `;
		});

		outerPlace.innerHTML = "";
		outerPlace.innerHTML += `
        <div class="dailyIntake_home_page">
            <div class="eaten_kcal_home_page kcal_stat">
                <div class="count_eaten_kcal">${arrayCards[0].eaten}</div>
                <div class="txt_kcal_home">eaten</div>
            </div>
            <div class="circular_card">
                <div class="circular-progress" style="background:${circleProgressBar(arrayCards[0].percent, arrayCards[0].color)}">
                    <div class="value-container">${arrayCards[0].value.toFixed(0)}<br/>Kcal Left</div>
                </div>
    
            </div>
            <div class="burned_kcal_home_page kcal_stat">
                <div class="count_burned_kcal">${arrayCards[0].burned}</div>
                <div class="txt_kcal_home">burned</div>
            </div>
        </div>
        <div class="nutrients_home_page"> ${renderedStrNutriens}  </div>
    `;
	} catch (e) {
		console.log(e);
	}
};

function circleProgressBar(progressPercent: number, color?: string) {
	let _value = Math.ceil(progressPercent * 3.6);
	return `conic-gradient( ${color === undefined ? "#4d5bf9" : color} ${_value}deg, #e1e1e1 ${_value}deg ) `;
}

export const renderHomePage = (currentUser: User = usersManager.getctiveUser) => {
	renderDailyIntakeHomePage(document.querySelector(".home_wrapper"), currentUser);
};
