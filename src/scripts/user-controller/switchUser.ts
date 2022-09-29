import User from "../Classes/User/User";
import { usersManager } from "../Classes/User/UsersManager";
import { acceptedRegisterUser } from "./addUser";

const switchUserBtn = document.querySelector<HTMLElement>(".choose_another_user");
const addNewUserBtn = document.querySelector<HTMLElement>(".add_new_user");
const WrapperLoginForm = document.querySelector<HTMLElement>(".wrapper_create_login_user");
const cancelRegForm = document.querySelector<HTMLElement>(".cancel_reg_new_user");
const switchUserForm = document.querySelector<HTMLElement>(".form-switch-user");

switchUserBtn.addEventListener("click", () => {
	WrapperLoginForm.classList.add("active");
	addNewUserBtn.style.display = "none";
	cancelRegForm.classList.add("active");
	switchUserForm.classList.add("active");
});

const renderUsers = (outWrapper: HTMLElement, data: Array<User>) => {
	outWrapper.innerHTML = "";
	data.forEach((user) => {
		outWrapper.innerHTML += `<div class="user-item" data-id="${user.about.id}">
         <div class="user-img">${user.about.image ?  `<img src="${user.about.image}"/>` : '<i class="fa-solid fa-user fa-2x"></i>' }</div>
            <div class="wrapper_txt_data_user">
                <div class="user-name">${user.about.username}</div>
                <div class="user-age">${user.about.age} year</div>
            </div>
        </div>`;
	});

	document.querySelectorAll(".user-item").forEach((item: HTMLElement) => {
		item.addEventListener("click", () => {
			if (item.hasAttribute("data-id")) {
				console.log(item.getAttribute("data-id"));
                
                let currentUser = usersManager.users.filter((user) => {
					if(user.about.id === item.getAttribute("data-id")){
                        return user;
                    }
				});
				usersManager.setActiveUser = currentUser[0]
				acceptedRegisterUser();
				
			}
		});
	});
};

renderUsers(document.querySelector(".render_switch_users"), usersManager.users);

export const renderUsersList = () => {
	renderUsers(document.querySelector(".render_switch_users"), usersManager.users);
};
