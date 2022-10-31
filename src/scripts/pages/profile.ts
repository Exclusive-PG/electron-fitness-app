import User from "../Classes/User/User";
import { usersManager } from "../Classes/User/UsersManager";
import { renderUsersList } from "../controllers/user-controller/switchUser";
import FoodManager, { foodManager } from './../Classes/Food/FoodManager';




function renderCurrentProfile(outerPlace: HTMLElement, activeUser: User,foodManager:FoodManager) {
    //breakfast
    const  caloriesBreakfast  = foodManager.calculateTotalNutriens(activeUser.about.food.breakfast);
    const  caloriesLunch  = foodManager.calculateTotalNutriens(activeUser.about.food.lunch);
    const  caloriesDinner  = foodManager.calculateTotalNutriens(activeUser.about.food.dinner);

    outerPlace.innerHTML = "";
	outerPlace.innerHTML = `
    <div class="block_data_user">
        <header class="header_data_user">
            <div class="wrapper_img_data_user"><img src="${activeUser.about.image}"/></div>
            <div class="name_data_user">${activeUser.about.username}</div>
            <div class="id_data_user"><b>ID:</b> ${activeUser.about.id}</div>
            <div class="date_register_current_user">Date register account: ${activeUser.about.dateRegister}</div>
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
            <div class="">Food: <br/><i class="fa-solid fa-wheat-awn"></i> Breakfast: ${caloriesBreakfast.calories} cal<br/><i class="fa-solid fa-wheat-awn"></i> Lunch: ${caloriesLunch.calories} cal<br/><i class="fa-solid fa-wheat-awn"></i> Dinner: ${caloriesDinner.calories} cal</div>
        </section>
        <footer>
        
        </footer>
    </div>
`;
    document.querySelector(".delete_account_current_user").addEventListener("click",()=>{
        usersManager.removeCurrentUser()
        document.querySelector<HTMLElement>(".wrapper_create_login_user").style.display  = "flex"
        document.querySelector<HTMLElement>(".create_login_user").style.display = "flex"
        renderUsersList();
    })
}


export const renderProfilePage = (activeUser: User = usersManager.getctiveUser) => {
	renderCurrentProfile(document.querySelector(".render_zone_for_current_user_data"), activeUser,foodManager);
};
