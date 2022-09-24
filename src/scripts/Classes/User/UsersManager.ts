
import { EnumGoalUser } from '../../../types/types';
import User from './User';

export class UsersManager {
    private _users : User[] = [];

    public addNewUser(user:User){
        this._users.push(user)
    }
    public getIdUserGoal(userGoal:string){
        switch(userGoal){
            case "Lose Weight":{
                return EnumGoalUser.LoseWeight
            }
            case "Maintain Weight" :{
                return EnumGoalUser.MaintainWeight
            }
            case "Gain Weight":{
                return EnumGoalUser.GainWeight
            }
        }
    }
    get users(){
        return this._users;
    }
}


export const usersManager = new UsersManager();