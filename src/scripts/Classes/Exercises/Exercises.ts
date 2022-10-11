import { IExercise, IDataExercise } from "../../../types/types";
import { path, uuidv1 } from "./../../requiredLib/requiredLib";
import FileSystem from "./../FileSystem/FileSystem";

export class Exercise implements IDataExercise {
	private _data: IExercise;

	constructor(data: IExercise) {
		this._data = data;
	}
	get getData(): IExercise {
		return this._data;
	}
	set setData(data: IExercise) {
		this._data = data;
	}
}

export class Exercises {
	private _list: Array<Exercise> = [];

	constructor() {
		FileSystem.loadData(path.join("data", "exercises.json")).forEach((item: any) => {
			this.pushExercise(new Exercise(item));
		});
	}

	public pushExercise(exercise: Exercise): void {
		this._list.push(exercise);
	}
	public findById(id: string) {
		return this._list.filter((item) => item.getData.id === id)[0];
	}
	public static averageLvlDiffuculty(data: Array<Exercise>): number {
		let sumLvlDifficulty = data.reduce((acc, item) => {
			return acc + item.getData.lvlDifficulty.id;
		}, 0);
		return Math.round(sumLvlDifficulty / data.length);
	}
	public static initExercises(data: any[] | Array<IExercise> ):Array<Exercise>{
		let tempArray:any[] = [];
		 data.forEach(item=>{
			 tempArray.push(new Exercise(item._data));
		})
		return tempArray;
	}
	get getExercises() {
		return this._list;
	}
}

export const allExercises = new Exercises();

// const arrayExercisesABSBeginner: Array<IExercise> = [
// 	{
// 		ExecutionTime: 20,
// 		id: "abs-beginner-01",
// 		muscleType: "abs",
// 		name: "Jumping Jacks",
// 		RepetitionСount: 0,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
// 	{
// 		ExecutionTime: 0,
// 		id: "abs-beginner-02",
// 		muscleType: "abs",
// 		name: "Abdominal Crunches",
// 		RepetitionСount: 16,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
// 	{
// 		ExecutionTime: 0,
// 		id: "abs-beginner-03",
// 		muscleType: "abs",
// 		name: "Twist",
// 		RepetitionСount: 20,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 2,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
// 	{
// 		ExecutionTime: 0,
// 		id: "abs-beginner-04",
// 		muscleType: "abs",
// 		name: "Mountain Climber",
// 		RepetitionСount: 16,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
// 	{
// 		ExecutionTime: 0,
// 		id: "abs-beginner-05",
// 		muscleType: "abs",
// 		name: "Heel Touch",
// 		RepetitionСount: 20,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 8,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-beginner-06",
// 		muscleType: "abs",
// 		name: "Leg Raises",
// 		RepetitionСount: 14,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 8,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 30,
// 		id: "abs-beginner-07",
// 		muscleType: "abs",
// 		name: "Plank",
// 		RepetitionСount: 0,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 30,
// 		id: "abs-beginner-08",
// 		muscleType: "abs",
// 		name: "Spine Lumbar Twist Stretch Left",
// 		RepetitionСount: 0,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 30,
// 		id: "abs-beginner-09",
// 		muscleType: "abs",
// 		name: "Spine Lumbar Twist Stretch Right",
// 		RepetitionСount: 0,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 30,
// 		id: "abs-beginner-10",
// 		muscleType: "abs",
// 		name: "Cobra Stretch",
// 		RepetitionСount: 0,
// 		lvlDifficulty: { id: 1, name: "Beginner" },
// 		caloriesBurned: 2,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
// ];
// const arrayExercisesABSIntermediate: Array<IExercise> = [
// 	{
// 		ExecutionTime: 30,
// 		id: "abs-intermediate-01",
// 		muscleType: "abs",
// 		name: "Jumping Jacks",
// 		RepetitionСount: 0,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
// 	{
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-02",
// 		muscleType: "abs",
// 		name: "Abdominal Crunches",
// 		RepetitionСount: 20,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
// 	{
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-03",
// 		muscleType: "abs",
// 		name: "Heel Touch",
// 		RepetitionСount: 26,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-04",
// 		muscleType: "abs",
// 		name: "Crossover Crunch",
// 		RepetitionСount: 20,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-05",
// 		muscleType: "abs",
// 		name: "Mountain Climber",
// 		RepetitionСount: 20,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-06",
// 		muscleType: "abs",
// 		name: "Side Bridges Left",
// 		RepetitionСount: 12,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-07",
// 		muscleType: "abs",
// 		name: "Side Bridges Right",
// 		RepetitionСount: 12,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-08",
// 		muscleType: "abs",
// 		name: "Butt Bridge",
// 		RepetitionСount: 20,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-09",
// 		muscleType: "abs",
// 		name: "Bycicle Crunches",
// 		RepetitionСount: 20,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-10",
// 		muscleType: "abs",
// 		name: "V-UP",
// 		RepetitionСount: 20,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-11",
// 		muscleType: "abs",
// 		name: "Push-Up & Rotation",
// 		RepetitionСount: 20,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-intermediate-12",
// 		muscleType: "abs",
// 		name: "Leg Raises",
// 		RepetitionСount: 16,
// 		lvlDifficulty: { id: 2, name: "Intermediate" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
// ];
// const arrayExercisesABSAdvanced: Array<IExercise> = [
// 	{
// 		ExecutionTime: 60,
// 		id: "abs-advanced-01",
// 		muscleType: "abs",
// 		name: "Jumping Jacks",
// 		RepetitionСount: 0,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-02",
// 		muscleType: "abs",
// 		name: "Sit-Ups",
// 		RepetitionСount: 30,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-03",
// 		muscleType: "abs",
// 		name: "Side Bridged Left",
// 		RepetitionСount: 30,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-04",
// 		muscleType: "abs",
// 		name: "Side Bridged Right",
// 		RepetitionСount: 30,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-05",
// 		muscleType: "abs",
// 		name: "V-Up",
// 		RepetitionСount: 25,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-06",
// 		muscleType: "abs",
// 		name: "Push-Up & Rotation",
// 		RepetitionСount: 36,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-07",
// 		muscleType: "abs",
// 		name: "Twist",
// 		RepetitionСount: 48,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-08",
// 		muscleType: "abs",
// 		name: "Abdominal Crunches",
// 		RepetitionСount: 36,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-09",
// 		muscleType: "abs",
// 		name: "Butt Bridge",
// 		RepetitionСount: 30,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 3,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-10",
// 		muscleType: "abs",
// 		name: "Hell Touch",
// 		RepetitionСount: 34,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-11",
// 		muscleType: "abs",
// 		name: "Hell Touch",
// 		RepetitionСount: 34,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-12",
// 		muscleType: "abs",
// 		name: "Mountain Climber",
// 		RepetitionСount: 36,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 0,
// 		id: "abs-advanced-13",
// 		muscleType: "abs",
// 		name: "Crossover Crunch",
// 		RepetitionСount: 30,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 5,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 90,
// 		id: "abs-advanced-14",
// 		muscleType: "abs",
// 		name: "Plank",
// 		RepetitionСount: 0,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
//     {
// 		ExecutionTime: 40,
// 		id: "abs-advanced-15",
// 		muscleType: "abs",
// 		name: "Cobra Stretch",
// 		RepetitionСount: 0,
// 		lvlDifficulty: { id: 3, name: "Advanced" },
// 		caloriesBurned: 4,
// 		description: "ok",
//         image:"",
//         linkForVideo:""
// 	},
// ];

//FileSystem.createJSONData([...arrayExercisesABSBeginner,...arrayExercisesABSIntermediate,...arrayExercisesABSAdvanced],path.join("data","exercises.json"));
