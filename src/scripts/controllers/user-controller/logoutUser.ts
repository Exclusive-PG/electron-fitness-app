
import User from '../../../scripts/Classes/User/User';
import { usersManager } from './../../Classes/User/UsersManager';
const WrapperLoginForm = document.querySelector<HTMLElement>(".wrapper_create_login_user");
const LoginSection = document.querySelector<HTMLElement>(".create_login_user");

function logoutUser(outerPlace:HTMLElement,activeUser :User = usersManager.getctiveUser){
    outerPlace.innerHTML = ""

    outerPlace.innerHTML = `
    <div class="block_logout_user">
        <div class="logout_user_img_wrapper"><img src="${activeUser.about.image}"/></div>
        <div class="logout_user_name">${activeUser.about.username}</div>
        <div class="logout_user_btn"><i class="fa-solid fa-arrow-right-from-bracket"></i></div>

    </div>
    `    
    document.querySelector(".logout_user_btn").addEventListener("click", () =>{
        WrapperLoginForm.style.display = "flex"
        LoginSection.style.display = "block"
        console.log("click logout")
    })
}

export const logoutUserSection= () =>{
    logoutUser(document.querySelector(".profile_logout_render"))
}