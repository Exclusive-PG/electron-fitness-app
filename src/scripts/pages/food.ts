import User from "./../Classes/User/User";
import breakFastImg from "./../../assets/images/breakfast.jpg";
import lunchImg from "./../../assets/images/lunch.jpg";
import dinnerImg from "./../../assets/images/dinner.jpg";
import { usersManager } from "../Classes/User/UsersManager";
import { RecommendedMealCalorieIntakeItem } from "../../types/types";
import FoodManager, { foodManager } from "./../Classes/Food/FoodManager";

const currentMealSection = document.querySelector<HTMLElement>(".current_meal_section");
const renderZoneFood = document.querySelector<HTMLElement>(".render_zone_for_user_data");
type Data = Array<{ food: RecommendedMealCalorieIntakeItem; nameMeal: string; img: any; id: string }>;
type dataItem = { food: RecommendedMealCalorieIntakeItem; nameMeal: string; img: any; id: string };

const renderFoodPageLocal = (outerPlace: HTMLElement, activeUser: User | null) => {
	console.log(outerPlace);
	outerPlace.innerHTML = "";
	const { food } = activeUser.about;

	const card: Data = [
		{ food: food.recommendedCalorie.breakfast, nameMeal: "Breakfast", img: breakFastImg, id: "1" },
		{ food: food.recommendedCalorie.lunch, nameMeal: "Lunch", img: lunchImg, id: "2" },
		{ food: food.recommendedCalorie.dinner, nameMeal: "Dinner", img: dinnerImg, id: "3" },
	];
console.log(card)
	let _rendererCard = "";

	card.forEach((item) => {
		_rendererCard += `
        <div class="meal_user meal_user_${item.nameMeal.toLowerCase()}" data-id-meal="${item.id}">
        <img src="${item.img}"/>
        <div class="data_about_item">
             <div>${item.nameMeal}</div>
             <div class="recommended_section_food">
             <h4 class="recommended_section_header">Recommended <i class="fa-solid fa-utensils"></i>:</h4>
             <div><i class="fa-solid fa-wheat-awn"></i> ${item.food.calories} caloeries</div>
             <div><i class="fa-solid fa-wheat-awn"></i> ${item.food.carbs} carbs</div>
             <div><i class="fa-solid fa-wheat-awn"></i> ${item.food.fat} fats</div>
             <div><i class="fa-solid fa-wheat-awn"></i> ${item.food.protein} protein</div>
             </div>
        </div>
    </div>
        `;
	});
	outerPlace.innerHTML = `
    <h2 class="main_hd_food_recommend">${activeUser.about.username}, recommend you a daily allowance of ${activeUser.about.test.dailyCalorieIntake.calories.dailyCalorieIntake} calories</h2>
    <div class="grid_meal_user">
        ${_rendererCard}
    </div>
    <div class="btn_for_calc_min_cost_for_diet"><i class="fa-solid fa-calculator"></i>  <span class="btn_text_for_calc_min_cost_for_diet">Сalculate the minimum cost of the ration during the diet</span></div>
    `;

	document.querySelectorAll(".meal_user").forEach((item) => {
		item.addEventListener("click", () => {
			let _id = item.getAttribute("data-id-meal");
			renderCurrentMeal(document.querySelector(".current_meal_wrapper_render"), card.filter((item) => item.id === _id)[0], usersManager.getctiveUser, foodManager);
			currentMealSection.classList.add("active");
		});
	});
	document.querySelector(".close_win_current_meal").addEventListener("click", () => currentMealSection.classList.remove("active"));
};

const renderCurrentMeal = (outerPlace: HTMLElement, data: dataItem, activeUser: User | null, foodManager: FoodManager) => {
	outerPlace.innerHTML = "";
	let rendererAllFoodList = "";
	let rendererUsersFoodList = "";
	let arrayForMyActiveFood: any[] = [];
    
    activeUser.getCurrentMeal(data.id).forEach(item=>{
        arrayForMyActiveFood.push(item)
    })
   
	foodManager.getListFood.forEach((item) => {
		rendererAllFoodList += `
       <div class="food-item-list ${activeUser.getCurrentMeal(data.id).includes(item.getData.id) ? "active" : ""}" data-id-current-food=${item.getData.id}>
            <div class="food-item-list-name">${item.getData.name}</div>
            <div class="food-item-list-image"><img src="${item.getData.image}"/></div>
       </div>
        `;
	});

	foodManager.getListFood.forEach((item) => {
		rendererUsersFoodList += `
        ${activeUser.getCurrentMeal(data.id).includes(item.getData.id) ? `
        <div class="user-food-item-list" data-id-current-food=${item.getData.id}>
             <div class="user-food-item-list-name">${item.getData.name}</div>
             <div class="user-food-item-list-image "><img src="${item.getData.image}"/></div>
        </div>`
        : ""
        }
         `;
	});
	outerPlace.innerHTML = `
    <h2 class="header_current_meal_user">${data.nameMeal}</h2>
    <div class="total_nutriens_calories_users_meal"></div>
    <div class="wrapper_food">
        <div class="current_food_list">
        <div class="hd_food_current_meal">My food</div>
        <div class="render_current_food_list_user">${rendererUsersFoodList === "" ? "None" : rendererUsersFoodList}</div>
        </div>
        <div class="all_food_list">
        <div class="hd_food_current_meal">All food</div>
        <div class="render_all_food_list ">${rendererAllFoodList}</div>
        </div>
    </div>
    <div class="footer_wrapper_current_meal">
    <button class="btn btn-shine save-for-current-meal"><span>save</span></button>
    </div>
    `;

    showTotalNutriensAndCalories(document.querySelector(".total_nutriens_calories_users_meal"),arrayForMyActiveFood)

	document.querySelectorAll(".food-item-list").forEach((item) => {
		item.addEventListener("click", () => {
			item.classList.toggle("active");
			let _idFood = item.getAttribute("data-id-current-food");
			let foodElement = foodManager.currentFoodById(_idFood).getData.id;
			let index = arrayForMyActiveFood.indexOf(_idFood);
			item.classList.contains("active") ? arrayForMyActiveFood.push(foodElement) : index > -1 && arrayForMyActiveFood.splice(index, 1);
            showTotalNutriensAndCalories(document.querySelector(".total_nutriens_calories_users_meal"),arrayForMyActiveFood)

			console.log(arrayForMyActiveFood);
		});
	});

	document.querySelector(".save-for-current-meal").addEventListener("click", () => {
		usersManager.editMealForActiveUser(data.id, arrayForMyActiveFood);
        rendererMyFoodList(document.querySelector(".render_current_food_list_user"),foodManager,activeUser,data)
	});
};

function showTotalNutriensAndCalories(outerPlace:HTMLElement,id:Array<string>){
    const {calories,carbs,fats,protein,portion} = foodManager.calculateTotalNutriens(id)
    outerPlace.innerHTML = `Calories: ${calories} | Portion: ${portion} g<br/><i class="fa-solid fa-wheat-awn"></i>protein: ${protein} <i class="fa-solid fa-wheat-awn"></i>carbs: ${carbs} <i class="fa-solid fa-wheat-awn"></i>fats: ${fats}`;
}
function rendererMyFoodList(outerPlace:HTMLElement,foodManager:FoodManager,activeUser: User | null,data:dataItem){
     outerPlace.innerHTML = "";
     foodManager.getListFood.forEach((item) => {
		outerPlace.innerHTML += `
        ${activeUser.getCurrentMeal(data.id).includes(item.getData.id) ? `
        <div class="user-food-item-list" data-id-current-food=${item.getData.id}>
             <div class="user-food-item-list-name">${item.getData.name}</div>
             <div class="user-food-item-list-image "><img src="${item.getData.image}"/></div>
        </div>`
        : ""
        }
         `;
	});
}
function addFoodItemWindow(){
    document.querySelector(".add-food-item").addEventListener("click", () => {
		let _validate = false;
        let numbers = /^[0-9]+$/;
		let _errors = [...document.querySelectorAll(".error-icon-create-food")];
        let inputs = [...document.querySelectorAll(".add_custom_food > input")]
        console.log(inputs)
      
        inputs.forEach((item:HTMLInputElement, index) => {
            !item.value.match(numbers) ? _errors[index].classList.add("active") : _errors[index].classList.remove("active");
		});
	
		_errors.every((item) => {
			if (item.classList.contains("active")) {
				_validate = false;
				return;
			} else {
				_validate = true;
				return true;
			}
		});
	

		// if (!_validate) return;

		// courseManager.editCustomCourse(customCourse.data.id, { editExercises: arrayCurrentExerciseEdit, muscleType: muscleTypeInput.value, name: nameCustomCourseInput.value });
		// renderTrainingCourse(document.querySelector(".render_custom_training"), "Your custom courses", courseManager.allCourses.custom);
		// readyForCreate();
		// arrayCurrentExerciseEdit = [];
		// console.log(courseManager.allCourses);
	});
}
export const renderFoodPage = (activeUser: User = usersManager.getctiveUser) => {
    const createCustomFoodItemWin = document.querySelector(".create_custom_food_item")
	renderFoodPageLocal(renderZoneFood, activeUser);
    document.querySelector(".close_win_create_food_item").addEventListener("click", () =>{
        createCustomFoodItemWin.classList.remove("active")
    })
    document.querySelector(".btn_for_create_your_food_item").addEventListener("click", () =>{
        createCustomFoodItemWin.classList.add("active")
    })
    addFoodItemWindow()
};
