import User from "./../Classes/User/User";
import breakFastImg from "./../../assets/images/breakfast.jpg";
import lunchImg from "./../../assets/images/lunch.jpg";
import dinnerImg from "./../../assets/images/dinner.jpg";
import { usersManager } from "../Classes/User/UsersManager";

const renderZoneFood = document.querySelector<HTMLElement>(".render_zone_for_user_data");

const renderFoodPageLocal = (outerPlace: HTMLElement, activeUser: User | null) => {
	console.log(outerPlace);
	outerPlace.innerHTML = "";

	outerPlace.innerHTML = `
    <div class="grid_meal_user">
        <div class="meal_user meal_user_breakfast">
            <img src="${breakFastImg}"/>
            <div class="data_about_item">
                 <div>Breakfast</div>
            </div>
        </div>
        <div class="meal_user meal_user_lunch">
            <img src="${lunchImg}"/>
            <div class="data_about_item">
                <div>Lunch</div>
            </div>
        </div>
        <div class="meal_user meal_user_dinner">
            <img src="${dinnerImg}"/>
            <div class="data_about_item">
                <div>Dinner</div>
            </div>
        </div>
    </div>
    `;
};

export const renderFoodPage = (activeUser:User = usersManager.getctiveUser) => {
	renderFoodPageLocal(renderZoneFood, activeUser);
};
