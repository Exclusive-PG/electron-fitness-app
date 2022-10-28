import { CourseBase } from "../scripts/Classes/Courses/CourseBase";
import { Exercise } from "./../scripts/Classes/Exercises/Exercises";
import { FoodItem } from "./../scripts/Classes/Food/FoodItem";

export interface IExercise {
	id: string;
	name: string;
	muscleType: string;
	RepetitionСount: number;
	ExecutionTime: number;
	lvlDifficulty: { id: 1 | 2 | 3; name: "Beginner" | "Intermediate" | "Advanced" };
	caloriesBurned: number;
	description: string;
	image?: string;
	linkForVideo?: string;
}

export interface IDataExercise {
	get getData(): IExercise;
	set setData(data: IExercise);
}

export type dataCurrentCourse = {
	id: string;
	name: string;
	muscleZone: string;
	exercises: Array<Exercise>;
	lvlDifficulty: number;
	lastTimeExecution: string | Date;
	isCreateByUser: checkIsCreateByUser;
	isUserFollow: boolean;
	image?: string;
};
export type checkIsCreateByUser = {
	state: boolean;
	userId: string;
};
///USER///
export type dataUser = {
	id: string;
	username: string;
	height: number;
	weight: number;
	age: number;
	courses: Array<string> | any[];
	goal: GoalUser;
	lvlActivity: number;
	food: FoodUserData;
	history: Array<any>;
	gender: genderUser;
	test: {
		dailyCalorieIntake: foodUser;
		bodyMassIndex: {
			bmi: number;
			lastUpdate: string;
		};
	};
	image?: string;
	dateRegister: string;
};
export type historyItemType = {
	date:string | Date
	burnedCalories:number
	food:{
		breakfast:historyItemForFoodType
		lunch:historyItemForFoodType
		dinner: historyItemForFoodType
	}
}
export type historyItemForFoodType={
	status:boolean
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
}
export interface GoalUser {
	status: EnumGoalUser;
	txt: "Lose Weight" | "Maintain Weight" | "Gain Weight" | string;
}
export type foodUser = {
	calories: {
		dailyCalorieIntake: number;
		dailyCarbs: number;
		dailyProtein: number;
		dailyFat: number;
		eaten: number;
		burned: number;
	};
	lastUpdate: string;
};
export type genderUser = {
	id: 1 | 2;
	txt: "male" | "female" | string;
};

export enum EnumGoalUser {
	LoseWeight = 0,
	MaintainWeight = 1,
	GainWeight = 2,
}

export type Nutrients = {
	dailyCarbs: number;
	dailyProtein: number;
	dailyFat: number;
};

export type FoodUserData = {
	recommendedCalorie: {
		breakfast: RecommendedMealCalorieIntakeItem;
		lunch: RecommendedMealCalorieIntakeItem;
		dinner: RecommendedMealCalorieIntakeItem;
	};
	breakfast: Array<string>;
	lunch: Array<string>;
	dinner: Array<string>;
};

export type FoodItemType = {
	name: string;
	id: string;
	portion: number;
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
	vitamins:number
	pricePerKg :number;
	isCreateByUser: boolean
	image?: string | any;
};

export type renderPagesType = {
	renderHomePage: Function;
	renderTrainingPage: Function;
	renderFoodPage: Function;
	renderProfilePage: Function;
};

export type enterDataForDCI = {
	gender: "male" | "female" | string;
	age: number;
	weight: number;
	height: number;
	lvlActivy: number;
};
export type EnterDataBodyMassIndex = {
	weight: number;
	height: number;
};
export type allCoursesType = {
	abs: Array<CourseBase>;
	arm: Array<CourseBase>;
	leg: Array<CourseBase>;
	custom: Array<CourseBase> | any[];
};
export type RecommendedMealCalorieIntakeType = {
	breakfast: RecommendedMealCalorieIntakeItem;
	lunch: RecommendedMealCalorieIntakeItem;
	dinner: RecommendedMealCalorieIntakeItem;
};

export type RecommendedMealCalorieIntakeItem = {
	calories: number;
	protein: number;
	carbs: number;
	fat: number;
};
// export let goalOfUserId = [EnumGoalUser.LoseWeight, EnumGoalUser.MaintainWeight, EnumGoalUser.GainWeight]
