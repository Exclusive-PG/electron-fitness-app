import { Exercise } from './../scripts/Classes/Exercises/Exercises';

export interface IExercise {
	id: string;
	name: string;
	muscleType: string;
	RepetitionСount: number;
	ExecutionTime: number;
    lvlDifficulty : {id:1|2|3, name:"Beginner"|"Intermediate"|"Advanced"},
	caloriesBurned:number
	description:string
    image?:string;
	linkForVideo?:string
}

export interface IDataExercise {
	get getData(): IExercise;
	set setData(data: IExercise);
}

export type dataCurrentCourse = {
    id:string;
	name: string;
	muscleZone: string;
	exercises: Array<Exercise> ;
    lvlDifficulty:number;
	lastTimeExecution : string | Date;
	isCreateByUser: boolean
	image?:string
};

///USER///
export type dataUser = {
	id: string;
	username: string;
	height: number;
	weight: number;
	age: number;
	courses: Array<dataCurrentCourse> | any[];
	goal: GoalUser;
	lvlActivity: number;
	food: Array<any>;
	history : Array<any>;
	gender:genderUser;
	test:{
		dailyCalorieIntake : foodUser
		bodyMassIndex : {
			bmi:number
			lastUpdate : string
		},

	}
	image?:string
	dateRegister : string
};

export interface GoalUser  {
	status:  EnumGoalUser
	txt: "Lose Weight" | "Maintain Weight" | "Gain Weight" | string;
};
export type foodUser = {
	calories: {
		dailyCalorieIntake: number;
		dailyCarbs: number;
		dailyProtein: number;
		dailyFat: number;
		eaten: number;
		burned: number;
	};
	lastUpdate : string
};
export type genderUser = {
	id:1|2,
	txt:"male"|"female"|string
}

export enum EnumGoalUser{
	LoseWeight = 0,
	MaintainWeight = 1,
	GainWeight = 2
}

export type Nutrients = {
	dailyCarbs:number,
	dailyProtein:number,
	dailyFat:number
}
// export let goalOfUserId = [EnumGoalUser.LoseWeight, EnumGoalUser.MaintainWeight, EnumGoalUser.GainWeight]