import User from "./../Classes/User/User";
import breakFastImg from "./../../assets/images/breakfast.jpg";
import lunchImg from "./../../assets/images/lunch.jpg";
import dinnerImg from "./../../assets/images/dinner.jpg";
import { usersManager } from "../Classes/User/UsersManager";
import { RecommendedMealCalorieIntakeItem } from "../../types/types";
import FoodManager, { foodManager } from './../Classes/Food/FoodManager';

const currentMealSection = document.querySelector<HTMLElement>(".current_meal_section");
const renderZoneFood = document.querySelector<HTMLElement>(".render_zone_for_user_data");
type Data = Array<{ food: RecommendedMealCalorieIntakeItem; nameMeal: string; img: any; id: string}>;
type dataItem = { food: RecommendedMealCalorieIntakeItem; nameMeal: string; img: any; id: string}

const renderFoodPageLocal = (outerPlace: HTMLElement, activeUser: User | null) => {
	console.log(outerPlace);
	outerPlace.innerHTML = "";
	const { food } = activeUser.about;

	const card: Data = [
		{ food: food.recommendedCalorie.breakfast, nameMeal: "Breakfast", img: breakFastImg, id: "1" },
		{ food: food.recommendedCalorie.lanch, nameMeal: "Lunch", img: lunchImg, id: "2" },
		{ food: food.recommendedCalorie.dinner, nameMeal: "Dinner", img: dinnerImg, id: "3" },
	];

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
            let _id = item.getAttribute("data-id-meal")
            renderCurrentMeal(document.querySelector(".current_meal_wrapper_render"),card.filter((item=>item.id === _id))[0],usersManager.getctiveUser,foodManager)
            currentMealSection.classList.add("active");    
		});
	});
	document.querySelector(".close_win_current_meal").addEventListener("click", () => currentMealSection.classList.remove("active"));
};

const renderCurrentMeal = (outerPlace: HTMLElement, data: dataItem, activeUser: User | null,foodManager:FoodManager) => {
	outerPlace.innerHTML = "";
    let rendererAllFoodList = "";
    let arrayForMyActiveArray :any[] = [];

    foodManager.getListFood.forEach((item)=>{
        rendererAllFoodList += `
       <div class="food-item-list" data-id-current-food=${item.getData.id}>
            <div class="food-item-list-name">${item.getData.name}</div>
            <div class="food-item-list-image"><img src="${item.getData.image}"/></div>
       </div>
        `
    })


	outerPlace.innerHTML = `
    <h2 class="header_current_meal_user">${data.nameMeal}</h2>
    <div class="wrapper_food">
        <div class="current_food_list">
        <div>My food</div>
        <div class="render_current_food_list_user ">None</div>
        </div>
        <div class="all_food_list">
        <div>All food</div>
        <div class="render_all_food_list ">${rendererAllFoodList}</div>
        </div>
    </div>
    `;

    document.querySelectorAll(".food-item-list").forEach((item)=>{
        item.addEventListener("click",()=>{
            let _id = item.getAttribute("data-id-current-food")
            let foodItem = foodManager.currentFoodById(_id)
            arrayForMyActiveArray.push(foodItem)
            console.log(arrayForMyActiveArray)
        })
    })

};

export const renderFoodPage = (activeUser: User = usersManager.getctiveUser) => {
	renderFoodPageLocal(renderZoneFood, activeUser);
};




