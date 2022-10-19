import User from "./../Classes/User/User";
import breakFastImg from "./../../assets/images/breakfast.jpg";
import lunchImg from "./../../assets/images/lunch.jpg";
import dinnerImg from "./../../assets/images/dinner.jpg";
import { usersManager } from "../Classes/User/UsersManager";

const renderZoneFood = document.querySelector<HTMLElement>(".render_zone_for_user_data");

const renderFoodPageLocal = (outerPlace: HTMLElement, activeUser: User | null) => {
	console.log(outerPlace);
	outerPlace.innerHTML = "";
    const {food} = activeUser.about;
	outerPlace.innerHTML = `
    <h2 class="main_hd_food_recommend">${activeUser.about.username}, recommend you a daily allowance of ${activeUser.about.test.dailyCalorieIntake.calories.dailyCalorieIntake} calories</h2>
    <div class="grid_meal_user">
        <div class="meal_user meal_user_breakfast">
            <img src="${breakFastImg}"/>
            <div class="data_about_item">
                 <div>Breakfast</div>
                 <div class="recommended_section_food">
                 <div>${food.recommendedCalorie.breakfast.calories} caloeries</div>
                 <div>${food.recommendedCalorie.breakfast.carbs} carbs</div>
                 <div>${food.recommendedCalorie.breakfast.fat} fast</div>
                 <div>${food.recommendedCalorie.breakfast.protein} protein</div>
                 </div>
            </div>
        </div>
        <div class="meal_user meal_user_lunch">
            <img src="${lunchImg}"/>
            <div class="data_about_item">
                <div>Lunch</div>
                <div class="recommended_section_food">
                <div>${food.recommendedCalorie.lanch.calories} caloeries</div>
                <div>${food.recommendedCalorie.lanch.carbs} carbs</div>
                <div>${food.recommendedCalorie.lanch.fat} fast</div>
                <div>${food.recommendedCalorie.lanch.protein} protein</div>
                </div>
            </div>
        </div>
        <div class="meal_user meal_user_dinner">
            <img src="${dinnerImg}"/>
            <div class="data_about_item">
                <div>Dinner</div>
                <div class="recommended_section_food">
                <div>${food.recommendedCalorie.lanch.calories} caloeries</div>
                <div>${food.recommendedCalorie.lanch.carbs} carbs</div>
                <div>${food.recommendedCalorie.lanch.fat} fast</div>
                <div>${food.recommendedCalorie.lanch.protein} protein</div>
                </div>
            </div>
        </div>
    </div>
    `;
};

export const renderFoodPage = (activeUser:User = usersManager.getctiveUser) => {
	renderFoodPageLocal(renderZoneFood, activeUser);
};
