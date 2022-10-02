import { dataCurrentCourse, IExercise } from "../../../types/types";
import { allExercises, Exercise, Exercises } from "../Exercises/Exercises";
import { uuidv1 } from "./../../requiredLib/requiredLib";
//@ts-ignore
import logo from "./../../../assets/images/test.jpg"

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

export class CourseManager {
	protected _allCourses: { abs: Array<CourseBase> };

	public initCourses(data: { abs: Array<CourseBase> }) {
		this._allCourses = data;
	}
	get allCourses() {
		return this._allCourses;
	}
	public currentBaseById(id:string){
		return [...this._allCourses.abs].filter(item=>item.data.id === id)[0];
	}
}

export const courseManager = new CourseManager();

courseManager.initCourses(initAllCourses());

function initAllCourses() {
	const ABSCourseBeginner = new CourseBase({
		name: "ABS Beginner",
		muscleZone: "ABS",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("abs-beginner")) || [],
		lvlDifficulty: 1,
		id: uuidv1(),
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		image:logo
	});
	const ABSCourseIntermediate = new CourseBase({
		name: "ABS Intermediate",
		muscleZone: "ABS",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("abs-intermediate")) || [],
		lvlDifficulty: 2,
		id: uuidv1(),
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		image:logo
	});
	const ABSCourseAdvanced = new CourseBase({
		name: "ABS Advanced",
		muscleZone: "ABS",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("abs-advanced")) || [],
		lvlDifficulty: 3,
		id: uuidv1(),
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		image:logo
	});

	return {
		abs: [ABSCourseBeginner,ABSCourseIntermediate,ABSCourseAdvanced],
	};
}

// allCourses: [ABSCourseAdvanced, ABSCourseBeginner, ABSCourseIntermediate],
// sorted: {
// 	abs:[ABSCourseAdvanced, ABSCourseBeginner, ABSCourseIntermediate]
// },