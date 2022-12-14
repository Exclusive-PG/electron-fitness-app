import { ipcRenderer } from "electron";
import { dataUser, EnumGoalUser, foodUser } from "../../../types/types";
import FileSystem from "../../Classes/FileSystem/FileSystem";
import User from "../../Classes/User/User";
import { usersManager } from "../../Classes/User/UsersManager";
import { path, uuidv1 } from "../../requiredLib/requiredLib";
import Calculating from "../../Classes/Calc/Calculating";
import { renderUsersList } from "./switchUser";
import { rendererApp } from "../../../renderer";
import { logoutUserSection } from "./logoutUser";

const addNewUserBtn = document.querySelector<HTMLElement>(".add_new_user");
const switchUserBtn = document.querySelector<HTMLElement>(".choose_another_user");
const cancelRegForm = document.querySelector<HTMLElement>(".cancel_reg_new_user");
const WrapperLoginForm = document.querySelector<HTMLElement>(".wrapper_create_login_user");
const LoginSection = document.querySelector<HTMLElement>(".create_login_user");
const FormElement = document.querySelector<HTMLElement>(".form-create-user");
const dropdowns = document.querySelectorAll<HTMLElement>(".dropdown");
const addImageUserBtn = document.querySelector<HTMLElement>(".add_user_image");
const createUserAccountBtn = document.querySelector<HTMLElement>(".create-user-account");
const genderRation = document.querySelectorAll<HTMLElement>(".gender_ratio");
const goalUserInput = document.querySelector<HTMLInputElement>(".goal-user-input");
const activityUserInput = document.querySelector<HTMLInputElement>(".activity-user-input");
const switchUserForm = document.querySelector<HTMLElement>(".form-switch-user");

let avatarUser = {
	isAvatar: false,
	src: "",
};
const validateAndCreateUser = () => {
	let numbers = /^[0-9]+$/;
	let _error = [...document.querySelectorAll(".error-icon"), ...document.querySelectorAll(".error-icon-dropdown")];
	let isValidate = false;
	//let _data: { name: string; age: number; weight: number; height: number; gender: string; goal: string; activity: string } ;
	console.log(_error);
	let _data: dataUser;
	[...document.querySelectorAll(".reg_user_field > input"), ...document.querySelectorAll(".text-box-reg-user")].forEach((item: HTMLInputElement, index: number) => {
		if (item.hasAttribute("data-type")) {
			switch (item.getAttribute("data-type")) {
				case "number": {
					!item.value.match(numbers) ? _error[index].classList.add("active") : _error[index].classList.remove("active");

					return;
				}
				case "string": {
					console.log(index);
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
		let _gender: string;
		let pathForAvatar;
		genderRation.forEach((item: HTMLInputElement) => {
			item.checked && (_gender = item.getAttribute("data-gender"));
		});

		if (avatarUser.isAvatar) {
			pathForAvatar = path.join(FileSystem.PATHS.images, path.basename(avatarUser.src));
			FileSystem.copyData(avatarUser.src, pathForAvatar);
		}

		let lvlActivity = parseInt((document.getElementById("activity") as HTMLInputElement).getAttribute("data-activity"));
		let age = parseInt((document.getElementById("age") as HTMLInputElement).value);
		let height = parseInt((document.getElementById("height") as HTMLInputElement).value);
		let weight = parseInt((document.getElementById("weight") as HTMLInputElement).value);
		let IdUserGoal = usersManager.getIdUserGoal((document.getElementById("goal") as HTMLInputElement).value);
		let dailyCalorieIntake = Calculating.getFullTestDailyCalorieIntake({ age: age, gender: _gender, height: height, lvlActivy: lvlActivity, weight: weight }, IdUserGoal);
		let resultBodyMassIndex = Calculating.getBodyMassIndex({ weight, height });
		let recommendedCalorieIntake = Calculating.calculateFullRecommendedMealCalorieIntake(dailyCalorieIntake._dailyCalories, { breakfast: 30, lunch: 45, dinner: 25 }, IdUserGoal);
		let date = new Date().toDateString();

		let _testDailyCalorieIntake: foodUser = {
			calories: {
				burned: 0,
				eaten: 0,
				dailyCalorieIntake: dailyCalorieIntake._dailyCalories,
				dailyCarbs: dailyCalorieIntake._ratioOfPfc.dailyCarbs,
				dailyFat: dailyCalorieIntake._ratioOfPfc.dailyFat,
				dailyProtein: dailyCalorieIntake._ratioOfPfc.dailyProtein,
			},
			lastUpdate: date,
		};

		_data = {
			username: (document.getElementById("name") as HTMLInputElement).value,
			age,
			weight,
			height,
			id: uuidv1(),
			gender: { txt: _gender, id: _gender === "male" ? 1 : 2 },
			goal: { txt: (document.getElementById("goal") as HTMLInputElement).value, status: IdUserGoal },
			lvlActivity: lvlActivity,
			courses: [],
			food: {
				breakfast: [],
				dinner: [],
				lunch: [],
				recommendedCalorie: { breakfast: recommendedCalorieIntake.breakfast, dinner: recommendedCalorieIntake.dinner, lunch: recommendedCalorieIntake.lunch },
			},
			history: [],
			test: {
				dailyCalorieIntake: _testDailyCalorieIntake,
				bodyMassIndex: {
					bmi: resultBodyMassIndex,
					lastUpdate: date,
				},
			},
			image: pathForAvatar,
			dateRegister: date,
		};

		usersManager.addNewUser(new User(_data));
		usersManager.saveUsers();
		renderUsersList();
		usersManager.getctiveUser && acceptedRegisterUser();
	}
};

const showTitleDropdown = (value: string, input: HTMLInputElement): void => {
	input.value = value;
};
const addDataSet = (value: string, input: HTMLInputElement): void => {
	input.setAttribute("data-activity", value);
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
			addDataSet(item.getAttribute("data-activity"), activityUserInput);
		});
	});
	dropdowns.forEach((item: HTMLElement) => {
		item.addEventListener("click", () => item.classList.toggle("active"));
	});
};

export function acceptedRegisterUser() {
	cancelRegLogin();
	//setTimeout(() => {
		WrapperLoginForm.style.display = "none";
		LoginSection.style.display = "none";
		usersManager.initHistoryItem()
		rendererApp.renderAllPages();
		logoutUserSection();
		//usersManager.addHistoryBurnedCalories(100)
//	}, 1000);
}

function cancelRegLogin() {
	WrapperLoginForm.classList.remove("active");
	FormElement.classList.remove("active");
	cancelRegForm.classList.remove("active");
	switchUserBtn.style.display = "flex";
	addNewUserBtn.style.display = "flex";
	LoginSection.style.display="block"
	switchUserForm.classList.remove("active");
	addImageUserBtn.innerHTML = `<i class="fa-solid fa-user-plus fa-2x "></i>`;
	avatarUser = {
		isAvatar: false,
		src: "",
	};
}

export const addUserController = () => {
	initEvents();
	ipcRenderer.on("upload_file", (event, arg) => {
		console.log(arg.filePath);
		addImageUserBtn.innerHTML = `<img src="${arg.filePath}" height="80px" width="80px" alt="" class="image_user">`;
		avatarUser = {
			isAvatar: true,
			src: arg.filePath,
		};
	});
	createUserAccountBtn.addEventListener("click", validateAndCreateUser);

	cancelRegForm.addEventListener("click", cancelRegLogin);

	document.querySelector(".add_user_image").addEventListener("click", () => {
		ipcRenderer.send("upload_file");
	});
	addNewUserBtn.addEventListener("click", () => {
		WrapperLoginForm.classList.add("active");
		FormElement.classList.add("active");
		cancelRegForm.classList.add("active");
		switchUserBtn.style.display = "none";
	});
};
