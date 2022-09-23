import { ipcRenderer } from "electron";

const addNewUserBtn = document.querySelector<HTMLElement>(".add_new_user");
const cancelRegForm = document.querySelector<HTMLElement>(".cancel_reg_new_user");
const WrapperLoginForm = document.querySelector<HTMLElement>(".wrapper_create_login_user");
const FormElement = document.querySelector<HTMLElement>(".forms");
const dropdowns = document.querySelectorAll<HTMLElement>(".dropdown");
const addImageUserBtn = document.querySelector<HTMLElement>(".add_user_image");
const createUserAccountBtn = document.querySelector<HTMLElement>(".create-user-account");

addNewUserBtn.addEventListener("click", () => {
	WrapperLoginForm.classList.add("active");
	FormElement.classList.add("active");
	cancelRegForm.classList.add("active");
});

cancelRegForm.addEventListener("click", () => {
	WrapperLoginForm.classList.remove("active");
	FormElement.classList.remove("active");
	cancelRegForm.classList.remove("active");
	addImageUserBtn.innerHTML = `<i class="fa-solid fa-user-plus fa-2x "></i>`;
});

createUserAccountBtn.addEventListener("click",()=>{
    let numbers = /^[0-9]+$/;
    document.querySelectorAll(".reg_user_field > input").forEach((item:HTMLInputElement,index:number)=>{
        switch(item.getAttribute("data-type")){
            case "number":{
              !item.value.match(numbers) ? document.querySelectorAll(".error-icon")[index].classList.add("active") : document.querySelectorAll(".error-icon")[index].classList.remove("active")
                
                return;
            }
            case "string":{
               item.value === "" ? document.querySelectorAll(".error-icon")[index].classList.add("active") : document.querySelectorAll(".error-icon")[index].classList.remove("active")
                return;
            }
        }
    
    })
})
const showTitleDropdown = (value: string, input: HTMLInputElement): void => {
	input.value = value;
};

document.querySelector(".add_user_image").addEventListener("click", () => {
	ipcRenderer.send("upload_file");
});

///upload_file event
ipcRenderer.on("upload_file", (event, arg) => {
	console.log(arg.filePath);

	addImageUserBtn.innerHTML = `<img src="${arg.filePath}" height="80px" width="80px" alt="" class="image_user">`;
});

const initEvents = () => {
	document.querySelectorAll(".goal-user > div").forEach((item: HTMLElement) => {
		item.addEventListener("click", () => showTitleDropdown(item.getAttribute("data-value"), document.querySelector<HTMLInputElement>(".goal-user-input")));
	});
	document.querySelectorAll(".activity-user > div").forEach((item: HTMLElement) => {
		item.addEventListener("click", () => showTitleDropdown(item.getAttribute("data-value"), document.querySelector<HTMLInputElement>(".activity-user-input")));
	});
	dropdowns.forEach((item: HTMLElement) => {
		item.addEventListener("click", () => item.classList.toggle("active"));
	});

	document.querySelectorAll(".gender_ratio").forEach((item: any) => {
		item.addEventListener("click", () => {
			if (item.checked) {
				console.log(item.getAttribute("data-gender"));
			}
		});
	});
};

initEvents();
