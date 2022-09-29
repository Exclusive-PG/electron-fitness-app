import { dataCurrentCourse, IExercise } from "../../../types/types";
import { allExercises, Exercise, Exercises } from "../Exercises/Exercises";
import { uuidv1 } from "./../../requiredLib/requiredLib";

export class CourseBase {
	protected _dataCourse: dataCurrentCourse;

	constructor(dataCourse: dataCurrentCourse) {
		this._dataCourse = dataCourse;
	}
	public pushExercise(exercise: Exercise): void {
		this._dataCourse.exercises.push(exercise.getData);
	}
	get data(): dataCurrentCourse {
		return this._dataCourse;
	}
}


const ABSCourseBeginner = new CourseBase({
	name: "ABS Beginner",
	muscleZone: "ABS",
	exercises:  allExercises.getExercises.filter(item => item.getData.id.includes("abs-beginner")) || [],
	lvlDifficulty: 1,
	id: uuidv1(),
	lastTimeExecution: new Date().toLocaleString()
});
const ABSCourseIntermediate = new CourseBase({
	name: "ABS Intermediate",
	muscleZone: "ABS",
	exercises: allExercises.getExercises.filter(item => item.getData.id.includes("abs-intermediate")) || [],
	lvlDifficulty: 2,
	id: uuidv1(),
	lastTimeExecution: new Date().toLocaleString()
});
const ABSCourseAdvanced = new CourseBase({
	name: "ABS Advanced",
	muscleZone: "ABS",
	exercises: allExercises.getExercises.filter(item => item.getData.id.includes("abs-advanced")) || [],
	lvlDifficulty: 2,
	id: uuidv1(),
	lastTimeExecution: new Date().toLocaleString()
});

console.log(ABSCourseBeginner.data);
console.log(ABSCourseIntermediate.data)
console.log(ABSCourseAdvanced.data)