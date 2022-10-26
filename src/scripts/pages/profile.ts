import User from "../Classes/User/User";
import { usersManager } from "../Classes/User/UsersManager";

function renderCurrentProfile(outerPlace: HTMLElement, activeUser: User) {
	outerPlace.innerHTML = "";
	outerPlace.innerHTML = `
    <div class="block_data_user">
        <header class="header_data_user">
            <div class="wrapper_img_data_user"><img src="${activeUser.about.image}"/></div>
            <div class="name_data_user">${activeUser.about.username}</div>
            <div class="id_data_user"><b>ID:</b> ${activeUser.about.id}</div>
        </header>
        <section class="detail_data_user">
            <div class="">Age: ${activeUser.about.age} year</div>
            <div class="">Gender: ${activeUser.about.gender.txt}</div>
            <div class="">Height: ${activeUser.about.height} cm</div>
            <div class="">Weight: ${activeUser.about.weight} cm</div>
            <div class="">Following courses: ${activeUser.about.courses.length} </div>
            
        </section>
        <footer>
            <div class="date_register_current_user">Date register account: ${activeUser.about.dateRegister}</div>
        </footer>
    </div>
`;
}


export const renderProfilePage = (activeUser: User = usersManager.getctiveUser) => {
	renderCurrentProfile(document.querySelector(".render_zone_for_current_user_data"), activeUser);
};
