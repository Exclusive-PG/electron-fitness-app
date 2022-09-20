export interface IExercise {
	id: string;
	name: string;
	muscleType: string;
	RepetitionСount: number;
	ExecutionTime: number;
    lvlDifficulty : {id:1|2|3, name:"Beginner"|"Intermediate"|"Advanced"},
	caloriesBurned:number
    image?:string;
}

export interface IDataExercise {
	get getData(): IExercise;
	set setData(data: IExercise);
}

export type dataCurrentCourse = {
    id:string;
	name: string;
	muscleZone: string;
	exercises: Array<IExercise>;
    lvlDifficulty:number;
};