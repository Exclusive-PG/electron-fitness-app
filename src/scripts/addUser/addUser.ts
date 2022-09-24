import { ipcRenderer } from "electron";
import { dataUser, EnumGoalUser, foodUser } from "../../types/types";
import User from "../Classes/User/User";
import { usersManager } from "../Classes/User/UsersManager";
import { uuidv1 } from "../requiredLib/requiredLib";
import Calculating from './../Classes/Calc/Calculating';


const addNewUserBtn = document.querySelector<HTMLElement>(".add_new_user");
const cancelRegForm = document.querySelector<HTMLElement>(".cancel_reg_new_user");
const WrapperLoginForm = document.querySelector<HTMLElement>(".wrapper_create_login_user");
const FormElement = document.querySelector<HTMLElement>(".forms");
const dropdowns = document.querySelectorAll<HTMLElement>(".dropdown");
const addImageUserBtn = document.querySelector<HTMLElement>(".add_user_image");
const createUserAccountBtn = document.querySelector<HTMLElement>(".create-user-account");
const genderRation = document.querySelectorAll<HTMLElement>(".gender_ratio");
const goalUserInput = document.querySelector<HTMLInputElement>(".goal-user-input");
const activityUserInput = document.querySelector<HTMLInputElement>(".activity-user-input");

const validateAndCreateUser = () => {
	let numbers = /^[0-9]+$/;
	let _error = [...document.querySelectorAll(".error-icon"), ...document.querySelectorAll(".error-icon-dropdown")];
	let isValidate = false;
	//let _data: { name: string; age: number; weight: number; height: number; gender: string; goal: string; activity: string } ;
	let _data:dataUser
	[...document.querySelectorAll(".reg_user_field > input"), ...document.querySelectorAll(".text-box-reg-user")].forEach((item: HTMLInputElement, index: number) => {
		if (item.hasAttribute("data-type")) {
			switch (item.getAttribute("data-type")) {
				case "number": {
					!item.value.match(numbers) ? _error[index].classList.add("active") : _error[index].classList.remove("active");

					return;
				}
				case "string": {
					item.value === "" ? _error[index].classList.add("active") : _error[index].classList.remove("active");
					return;
				}
			}
		}
	});

	_error.every((item) => {
		if (item.classList.contains("active")) {
			isValidate = false;
			return;
		} else {
			isValidate = true;
			return true;
		}
	});


	if (isValidate) {
		const goalInput = (document.getElementById("goal") as HTMLInputElement).value
		let _gender: string;
		genderRation.forEach((item: HTMLInputElement) => {
			item.checked && (_gender = item.getAttribute("data-gender"));
		});
		let lvlActivity = parseInt((document.getElementById("activity") as HTMLInputElement).getAttribute("data-activity"));
		let age =  parseInt((document.getElementById("age") as HTMLInputElement).value)
		let height = parseInt((document.getElementById("height") as HTMLInputElement).value)
		let weight = parseInt((document.getElementById("weight") as HTMLInputElement).value)
		let dailyCalorieIntake = Calculating.determineDailyCalorieIntake({age:age,gender:_gender,height:height,lvlActivy:lvlActivity,weight:weight})
		console.log(dailyCalorieIntake)
		console.log(usersManager.getIdUserGoal(goalInput))
		let _food:foodUser= {
			calories:{
				burned:0,
				eaten:0,
				dailyCalorieIntake:dailyCalorieIntake,
				dailyCarbs:Calculating.determineRatioOfPFC(dailyCalorieIntake,usersManager.getIdUserGoal(goalInput)).dailyCarbs,
				dailyFat:Calculating.determineRatioOfPFC(dailyCalorieIntake,usersManager.getIdUserGoal(goalInput)).dailyFat,
				dailyProtein:Calculating.determineRatioOfPFC(dailyCalorieIntake,usersManager.getIdUserGoal(goalInput)).dailyProtein,

			}
		}

		_data = {
			age : age,
			courses : [],
			food:_food,
			gender:{txt:_gender,id:_gender=== "male" ? 1 : 2},
			goal : {txt:(document.getElementById("goal") as HTMLInputElement).value,status:usersManager.getIdUserGoal((document.getElementById("goal") as HTMLInputElement).value)},
			height: height,
			id:uuidv1(),
			lvlActivity: lvlActivity,
			username: (document.getElementById("name") as HTMLInputElement).value,
			weight : weight
		} 
		 usersManager.addNewUser(new User(_data))
		 console.log(usersManager.users)
	}
	// goalUserInput.value === "" ? document.querySelectorAll("") : console.log(goalUserInput.value)
	// activityUserInput.value === "" ? console.log("activity empty") : console.log(activityUserInput.value)
};

const showTitleDropdown = (value: string, input: HTMLInputElement): void => {
	input.value = value;
};
const addDataSet = (value: string, input: HTMLInputElement): void => {
	input.setAttribute("data-activity",value);
};
const initEvents = () => {
	document.querySelectorAll(".goal-user > div").forEach((item: HTMLElement) => {
		item.addEventListener("click", () => {
			showTitleDropdown(item.getAttribute("data-value"), goalUserInput);
		});
	});
	document.querySelectorAll(".activity-user > div").forEach((item: HTMLElement) => {
		item.addEventListener("click", () => {
			showTitleDropdown(item.getAttribute("data-value"), activityUserInput);
			addDataSet(item.getAttribute("data-activity"),activityUserInput)
		})
	});
	dropdowns.forEach((item: HTMLElement) => {
		item.addEventListener("click", () => item.classList.toggle("active"));
	});

	genderRation.forEach((item: any) => {
		item.addEventListener("click", () => {
			if (item.checked) {
				console.log(item.getAttribute("data-gender"));
			}
		});
	});
};

initEvents();

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

document.querySelector(".add_user_image").addEventListener("click", () => {
	ipcRenderer.send("upload_file");
});

createUserAccountBtn.addEventListener("click", validateAndCreateUser);

///upload_file event
ipcRenderer.on("upload_file", (event, arg) => {
	console.log(arg.filePath);

	addImageUserBtn.innerHTML = `<img src="${arg.filePath}" height="80px" width="80px" alt="" class="image_user">`;
});
