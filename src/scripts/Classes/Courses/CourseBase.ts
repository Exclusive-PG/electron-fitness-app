import { dataCurrentCourse , IExercise } from "../../../types/types";
import { allExercises } from "../Exercises/Exercises";
import { uuidv1 } from './../../requiredLib/requiredLib';


export class CourseBase {
	protected _dataCourse: dataCurrentCourse;

	constructor(dataCourse: dataCurrentCourse){
		this._dataCourse = dataCourse;
	}
    public pushExercise(exercise: IExercise):void {
        this._dataCourse.exercises.push(exercise);
    }
    get data():dataCurrentCourse{
        return this._dataCourse;
    }
}




// const ABSCourse = new CourseBase({name:"ABS Beginner",muscleZone:"ABS",exercises:[allExercises.getExercises[0].getData,allExercises.getExercises[1].getData],lvlDifficulty:1,id:uuidv1()});

// console.log(ABSCourse.data)