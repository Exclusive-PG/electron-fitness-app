import { IExercise,IDataExercise } from "../../../types/types";
import { uuidv1 } from './../../requiredLib/requiredLib';


class Exercise implements IDataExercise {
	private _data: IExercise;

    constructor(data: IExercise){
        this._data = data;
    }
	get getData(): IExercise {
		return this._data;
	}
	set setData(data: IExercise) {
		this._data = data;
	}
}

export default class Exercises {
	private _list: Array<Exercise> = [];
    
    public pushExercise(exercise: Exercise ):void{
    
        this._list.push(exercise);
    }
    get getExercises(){
        return this._list;
    }
}

export const allExercises = new Exercises();

allExercises.pushExercise(new Exercise({ExecutionTime:20,id:uuidv1(),muscleType:"abs",name:"jumped Jump",RepetitionСount:20,lvlDifficulty:{id:1,name:"Beginner"},caloriesBurned:14,description:"ok"}))
allExercises.pushExercise(new Exercise({ExecutionTime:30,id:uuidv1(),muscleType:"arm",name:"Pass asd",RepetitionСount:40,lvlDifficulty:{id:2,name:"Intermediate"},caloriesBurned:19,description:"ok"}))

