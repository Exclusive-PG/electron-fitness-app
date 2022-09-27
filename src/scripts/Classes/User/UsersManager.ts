import { dataUser, EnumGoalUser } from "../../../types/types";
import FileSystem from "../FileSystem/FileSystem";
import User from "./User";
import { fs, path } from "../../../scripts/requiredLib/requiredLib";

export class UsersManager {
	private _users: User[] = [];
	private _activeUser:User;
    constructor(){
        try {
			let _dataUser : Array<any> = FileSystem.loadData(FileSystem.PATHS.users) || [];
			this._users = []
			_dataUser.forEach((user)=>{
				this._users.push(new User(user._data))
			})
			console.log(this._users);

		} catch (e) {
			console.log((e as Error).message);
		}
    }

	public addNewUser(user: any) {
		this._users.push(user);
		console.log(this._users)
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

	get users() {
		return this._users;
	}
	get getctiveUser(){
		return this._activeUser;
	}
	set setActiveUser(activeUserInput : User){
		this._activeUser = activeUserInput
		console.log("Active user",this._activeUser)
	}
}

export const usersManager = new UsersManager();
