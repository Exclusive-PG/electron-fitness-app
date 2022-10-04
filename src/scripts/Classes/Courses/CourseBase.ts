import { dataCurrentCourse, IExercise } from "../../../types/types";
import { allExercises, Exercise, Exercises } from "../Exercises/Exercises";
import { uuidv1 } from "./../../requiredLib/requiredLib";
//@ts-ignore
import absImg from "./../../../assets/images/abs.jpg";
//@ts-ignore
import armImg from "./../../../assets/images/arm.jpg";
//@ts-ignore
import feetImg from "./../../../assets/images/feet.jpg";


export class CourseBase {
	protected _dataCourse: dataCurrentCourse;

	constructor(dataCourse: dataCurrentCourse) {
		this._dataCourse = dataCourse;
	}
	public currentExerciseById(id: string): Exercise {
		return this._dataCourse.exercises.filter((item) => item.getData.id === id)[0];
	}
	public getAllTimeExercises(): number {
		let totalExecutonTime =  this._dataCourse.exercises.reduce((acc,item)=>{
			return acc + item.getData.ExecutionTime
		 },0);

		return Math.round(((this._dataCourse.exercises.length * 120 + (this._dataCourse.exercises.length - 1) * 30) - totalExecutonTime)/60)
	}
	

	get data(): dataCurrentCourse {
		return this._dataCourse;
	}
}

export class CourseManager {
	protected _allCourses: { abs: Array<CourseBase> , arm: Array<CourseBase> , leg : Array<CourseBase>};

	public initCourses(data: { abs: Array<CourseBase> , arm: Array<CourseBase> , leg : Array<CourseBase>}) {
		this._allCourses = data;
	}
	get allCourses() {
		return this._allCourses;
	}
	public currentBaseById(id: string) {
		return [...this._allCourses.abs,...this._allCourses.arm,...this._allCourses.leg].filter((item) => item.data.id === id)[0];
	}
}

export const courseManager = new CourseManager();

courseManager.initCourses(initAllCourses());

function initAllCourses() {
	const ABSCourseBeginner = new CourseBase({
		name: "ABS Beginner",
		muscleZone: "Abs",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("abs-beginner")) || [],
		lvlDifficulty: 1,
		id: "efd92720-431a-11ed-8958-5f188e7ae6b8",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		isUserFollow:false,
		image: absImg,
	});
	const ABSCourseIntermediate = new CourseBase({
		name: "ABS Intermediate",
		muscleZone: "Abs",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("abs-intermediate")) || [],
		lvlDifficulty: 2,
		id: "efd92721-432b-11ed-8958-5f188e7ae6b8",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		isUserFollow:false,
		image: absImg,
	});
	const ABSCourseAdvanced = new CourseBase({
		name: "ABS Advanced",
		muscleZone: "Abs",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("abs-advanced")) || [],
		lvlDifficulty: 3,
		id: "efd92722-433c-11ed-8958-5f188e7ae6b8",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		isUserFollow:false,
		image: absImg,
	});
	//ARM
	const ArmCourseBeginner = new CourseBase({
		name: "ARM Beginner",
		muscleZone: "Arm",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("arm-beginner")) || [],
		lvlDifficulty: 1,
		id: "efd92723-423c-12ed-8960-5f188e7ae6b1",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		isUserFollow:false,
		image: armImg,
	});
	const ArmCourseIntermediate = new CourseBase({
		name: "ARM Intermediate",
		muscleZone: "Arm",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("arm-intermediate")) || [],
		lvlDifficulty: 3,
		id: "efd92724-424c-12ed-8960-5f188e7ae6b2",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		isUserFollow:false,
		image: armImg,
	});
	const ArmCourseAdvanced = new CourseBase({
		name: "ARM Advanced",
		muscleZone: "Arm",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("arm-advanced")) || [],
		lvlDifficulty: 3,
		id: "efd92725-425c-12ed-8960-5f188e7ae6b3",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		isUserFollow:false,
		image: armImg,
	});
	//FEET
	const LegCourseBeginner = new CourseBase({
		name: "Leg Beginner",
		muscleZone: "Leg",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("leg-beginner")) || [],
		lvlDifficulty: 3,
		id: "efd92725-426c-13ed-8960-5f188e7ae6b4",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		isUserFollow:false,
		image: feetImg,
	});
	const LegCourseIntermediate = new CourseBase({
		name: "Leg Intermediate",
		muscleZone: "Leg",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("leg-intermediate")) || [],
		lvlDifficulty: 3,
		id: "efd92725-427c-14ed-8960-5f188e7ae6b5",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		isUserFollow:false,
		image: feetImg,
	});
	const LegCourseAdvanced = new CourseBase({
		name: "Leg Advanced",
		muscleZone: "Leg",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("leg-advanced")) || [],
		lvlDifficulty: 3,
		id: "efd92725-428c-15ed-8960-5f188e7ae6b6",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: false,
		isUserFollow:false,
		image: feetImg,
	});
	console.log(ABSCourseAdvanced.getAllTimeExercises());
	return {
		abs: [ABSCourseBeginner, ABSCourseIntermediate, ABSCourseAdvanced],
		arm: [ArmCourseBeginner, ArmCourseIntermediate, ArmCourseAdvanced],
		leg: [LegCourseBeginner, LegCourseIntermediate, LegCourseAdvanced],
	};
}

