import { shell } from "electron";
import User from "../Classes/User/User";
import { usersManager } from "../Classes/User/UsersManager";
import { renderUsersList } from "../controllers/user-controller/switchUser";
import FoodManager, { foodManager } from "./../Classes/Food/FoodManager";
import { UsersManager } from "./../Classes/User/UsersManager";

function renderCurrentProfile(outerPlace: HTMLElement, activeUser: User, foodManager: FoodManager) {
	//breakfast
	const caloriesBreakfast = foodManager.calculateTotalNutriens(activeUser.about.food.breakfast);
	const caloriesLunch = foodManager.calculateTotalNutriens(activeUser.about.food.lunch);
	const caloriesDinner = foodManager.calculateTotalNutriens(activeUser.about.food.dinner);

	outerPlace.innerHTML = "";
	outerPlace.innerHTML = `
    <div class="block_data_user">
        <header class="header_data_user">
            <div class="wrapper_img_data_user"><img src="${activeUser.about.image}"/></div>
            <div class="name_data_user">${activeUser.about.username}</div>
            <div class="id_data_user"><b>ID:</b> ${activeUser.about.id}</div>
            <div class="date_register_current_user">Date register account: ${activeUser.about.dateRegister}</div>
            <div class="share_btn_with_friends"><i class="fa-regular fa-share-from-square"></i> Share with friends</div>
            <div class="delete_account_current_user"><i class="fa-solid fa-trash-can fa-2x"></i></div>
        </header>
        <section class="detail_data_user">
            <div class=""><i class="fa-solid fa-user"></i> Age: ${activeUser.about.age} year</div>
            <div class=""><i class="fa-solid fa-user"></i> Gender: ${activeUser.about.gender.txt}</div>
            <div class=""><i class="fa-solid fa-user"></i> Height: ${activeUser.about.height} cm</div>
            <div class=""><i class="fa-solid fa-user"></i> Weight: ${activeUser.about.weight} cm</div>
            <div class=""><i class="fa-solid fa-bolt"></i> Level Activity: ${activeUser.getCurrentUserActivity()} </div>
            <div class=""><i class="fa-solid fa-bolt"></i> Goal: ${activeUser.about.goal.txt} </div>
            <div class=""><i class="fa-solid fa-dumbbell"></i> Following courses: ${activeUser.about.courses.length} </div>
            <div class="">Food: <br/><i class="fa-solid fa-wheat-awn"></i> Breakfast: ${caloriesBreakfast.calories} cal<br/><i class="fa-solid fa-wheat-awn"></i> Lunch: ${
		caloriesLunch.calories
	} cal<br/><i class="fa-solid fa-wheat-awn"></i> Dinner: ${caloriesDinner.calories} cal</div>
        </section>
        <footer>
        
        </footer>
    </div>
`;
	document.querySelector(".delete_account_current_user").addEventListener("click", () => {
		usersManager.removeCurrentUser();
		document.querySelector<HTMLElement>(".wrapper_create_login_user").style.display = "flex";
		document.querySelector<HTMLElement>(".create_login_user").style.display = "flex";
		renderUsersList();
	});
	document.querySelector(".share_btn_with_friends").addEventListener("click", () => {
		document.querySelector(".section_share_result").classList.add("active");
	});
	document.querySelector(".close_win_share_result").addEventListener("click", () => {
		document.querySelector(".section_share_result").classList.remove("active");
	});
	renderShareForm(document.querySelector(".share_form_render"), usersManager);
}

function renderShareForm(outerPlace: HTMLElement, usersManager: UsersManager) {
	const { date, result } = usersManager.getShareHistory();
	outerPlace.innerHTML = "";
	outerPlace.innerHTML = `
<div class="wrapper_share_result">
    <h3>Hi from Fitness App</h3>
    <div class="share_res_date">Data from ${date.from} to ${date.to}</div>
    <div class="share_res_cal"> 
    <ul class="list_result">
    <li>burned<i class="fa-solid fa-dumbbell"></i> ${result.totalBurnedCalories} cal.</li>
    <li>ate <i class="fa-solid fa-utensils"></i> ${result.totalEatenCalories} cal. (Protein:${result.totalProtein}g, carbs:${result.totalCarbs}g, fats:${result.totalFats}g)</li>
    <li>following courses: ${result.followingCourses}</li>
    <li>my level activity: ${result.lvlActivity}</li>
    </ul>
    <h3>Share:</h3>
    <div class="wrapper_btns_share">
        <div class="btn_share_tweet"><span><i class="fa-brands fa-twitter"></i></span></div>
        <div class="btn_copy_res"><span><i class="fa-regular fa-copy"></i></span></div> 
    </div>
    </div>
</div>
`;
let _res_txt_link = `Hello form Fitness App. Data from ${date.from} to ${date.to}. My results: burned ${result.totalBurnedCalories} cal. and ate ${result.totalEatenCalories} cal. (Protein:${result.totalProtein}g, carbs:${result.totalCarbs}g, fats:${result.totalFats}g), following courses ${result.followingCourses} , my level activity: ${result.lvlActivity.toLocaleLowerCase()}`
	
document.querySelector(".btn_share_tweet").addEventListener("click", () => {
		shell.openExternal(`https://twitter.com/intent/tweet?text=${_res_txt_link}
        &hashtags=sport,workout,health,fitness`);
	});
    document.querySelector(".btn_copy_res").addEventListener("click", () => {
        if (!navigator.clipboard) return;
          
          navigator.clipboard.writeText(_res_txt_link).then(function() {
            console.log('Async: Copying to clipboard was successful!');
          }, function(err) {
            console.error('Async: Could not copy text: ', err);
          });
	});
}

export const renderProfilePage = (activeUser: User = usersManager.getctiveUser) => {
	renderCurrentProfile(document.querySelector(".render_zone_for_current_user_data"), activeUser, foodManager);
};
