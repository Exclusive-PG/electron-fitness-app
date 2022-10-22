import { dataUser, EnumGoalUser } from "../../../types/types";
import FileSystem from "../FileSystem/FileSystem";
import User from "./User";
import { fs, path } from "../../../scripts/requiredLib/requiredLib";
import { FoodItem } from "../Food/FoodItem";

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
			this.setActiveUser = this._users[0]
			console.log(this.getctiveUser)
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
	public editMealForActiveUser(idMeal: string, data: string[]){
		let index = this._users.findIndex(item=>item.about.id === this._activeUser.about.id);
		
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
		console.log(this._activeUser.about.food)
		this.saveUsers();
		
	}

	public clearData(){
		this._users = []
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
