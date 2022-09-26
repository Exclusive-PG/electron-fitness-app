import { EnumGoalUser } from "../../../types/types";
import FileSystem from "../FileSystem/FileSystem";
import User from "./User";
import { fs, path } from "../../../scripts/requiredLib/requiredLib";

export class UsersManager {
	private _users: User[] = [];

    constructor(){
        try {
			this._users = this.loadData(FileSystem.PATHS.users) || [];
			console.log(this._users);

		} catch (e) {
			console.log((e as Error).message);
		}
    }

	public addNewUser(user: User) {
		this._users.push(user);
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
	public loadData(pathToFile: string, ext: string = ".json") {
		let _loadData;
		if (fs.existsSync(pathToFile) && path.extname(pathToFile) === ext) {
			_loadData = JSON.parse(fs.readFileSync(pathToFile, { encoding: "utf-8" }));
		}

		return _loadData;
	}
	public saveUsers() {
		let _pathFile = FileSystem.PATHS.users;
        FileSystem.createJSONData(this._users, _pathFile);
        
	}

	get users() {
		return this._users;
	}
}

export const usersManager = new UsersManager();
