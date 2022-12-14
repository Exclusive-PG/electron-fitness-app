import { dataUser, EnumGoalUser, historyItemForFoodType, historyItemType } from "../../../types/types";
import FileSystem from "../FileSystem/FileSystem";
import User from "./User";
import { fs, path } from "../../../scripts/requiredLib/requiredLib";
import { FoodItem } from "../Food/FoodItem";
import AppController from "../AppController/AppController";

export class UsersManager {
	private _users: User[] = [];
	private _activeUser: User;
	constructor() {
		try {
			let _dataUser: Array<any> = FileSystem.loadData(FileSystem.PATHS.users) || [];
			this._users = [];
			_dataUser.forEach((user) => {
				this._users.push(new User(user._data));
			});
			this.setActiveUser = this._users[0];
			console.log(this.getctiveUser);
			//console.log(this._users);
		} catch (e) {
			console.log((e as Error).message);
		}
	}

	public addNewUser(user: User) {
		this.setActiveUser = user;
		this._users.push(user);
		//console.log(this._users);
	}
	public getIdUserGoal(userGoal: string) {
		switch (userGoal) {
			case "Lose Weight": {
				return EnumGoalUser.LoseWeight;
			}
			case "Maintain Weight": {
				return EnumGoalUser.MaintainWeight;
			}
			case "Gain Weight": {
				return EnumGoalUser.GainWeight;
			}
		}
	}

	public saveUsers() {
		let _pathFile = FileSystem.PATHS.users;
		FileSystem.createJSONData(this._users, _pathFile);
	}
	public editMealForActiveUser(idMeal: string, data: string[]) {
		let index = this._users.findIndex((item) => item.about.id === this._activeUser.about.id);

		switch (idMeal) {
			case "1": {
				this._users[index].about.food.breakfast = data;
				console.log("breakfast user");
				break;
			}
			case "2": {
				this._users[index].about.food.lunch = data;
				console.log("lunch user");
				break;
			}
			case "3": {
				this._users[index].about.food.dinner = data;
				console.log("dinner user");
				break;
			}
		}
		console.log(this._activeUser.about.food);
		this.saveUsers();
	}
	public removeCurrentUser() {
		let index = this._users.indexOf(this._activeUser);
		console.log(index);
		this._users.splice(index, 1);
		this.saveUsers();
	}
	public initHistoryItem() {
		let isItemToday = false;
		let _obj = {
			date: AppController.dateTime(),
			burnedCalories: 0,
			food: {
				breakfast: { calories: 0, carbs: 0, fat: 0, protein: 0, status: false },
				lunch: { calories: 0, carbs: 0, fat: 0, protein: 0, status: false },
				dinner: { calories: 0, carbs: 0, fat: 0, protein: 0, status: false },
			},
		};

		if (this._activeUser.about.history.length === 0) {
			this._activeUser.about.history.push(_obj);
			this.saveUsers();
			return;
		}

		isItemToday = this._activeUser.about.history.every((item: historyItemType) => {
			if (item.date === AppController.dateTime()) return false;
			else return true;
		});

		isItemToday && this._activeUser.about.history.push(_obj);
		console.log(this._activeUser.about.history);
		this.saveUsers();
	}
	public addHistoryBurnedCalories(burnedCalories: number) {
		this._activeUser.about.history.forEach((item: historyItemType) => {
			if (item.date === AppController.dateTime()) {
				item.burnedCalories += burnedCalories;
			}
		});
		this.saveUsers();
	}
	public getCurrentHistoryItem(): historyItemType {
		return this._activeUser.about.history.find((item: historyItemType) => item.date === AppController.dateTime());
	}

	public editHistoryItemMealForActiveUser(idMeal: string, data: historyItemForFoodType) {
		let index = this._activeUser.about.history.findIndex((item: historyItemType) => item.date === AppController.dateTime());
		console.log(this._activeUser.about.history[index]);
		switch (idMeal) {
			case "1":
				this._activeUser.about.history[index].food.breakfast = data;
				break;

			case "2":
				this._activeUser.about.history[index].food.lunch = data;
				break;

			case "3":
				this._activeUser.about.history[index].food.dinner = data;
				break;
		}
		console.log(this._activeUser.about.history);
		this.saveUsers();
	}

	public getShareHistory() {
		let totalBurnedCalories: number = 0,
			totalEatenCalories: number = 0,
			totalProtein: number = 0,
			totalFats: number = 0,
			totalCarbs: number = 0,
			followingCourses:number = this._activeUser.about.courses.length,
			lvlActivity:string = this._activeUser.getCurrentUserActivity()
		this._activeUser.about.history.forEach((item: historyItemType) => {
			totalBurnedCalories += item.burnedCalories;
			totalEatenCalories += item.food.breakfast.calories + item.food.lunch.calories + item.food.dinner.calories;
			totalProtein+= item.food.breakfast.protein + item.food.lunch.protein + item.food.dinner.protein;
			totalFats+= item.food.breakfast.fat + item.food.lunch.fat + item.food.dinner.fat;
			totalCarbs+= item.food.breakfast.carbs + item.food.lunch.carbs + item.food.dinner.carbs;
		});
		return {
			date: {
				from: this._activeUser.about.history[0].date,
				to: this._activeUser.about.history[this._activeUser.about.history.length - 1].date,
			},
			result: {
				totalBurnedCalories,
				totalEatenCalories,
				totalProtein,
				totalFats,
				totalCarbs,
				followingCourses,
				lvlActivity

			},
		};
	}

	public clearData() {
		this._users = [];
	}
	get users() {
		return this._users;
	}
	get getctiveUser() {
		return this._activeUser;
	}
	set setActiveUser(activeUserInput: User) {
		this._activeUser = activeUserInput;
		//console.log("Active user", this._activeUser);
	}
}

export const usersManager = new UsersManager();
