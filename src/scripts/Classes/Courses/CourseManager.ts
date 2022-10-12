import { CourseBase } from "./CourseBase";
import absImg from "./../../../assets/images/abs.jpg";
import armImg from "./../../../assets/images/arm.jpg";
import feetImg from "./../../../assets/images/feet.jpg";
import customImg from "./../../../assets/images/custom.jpg";
import { allExercises, Exercise, Exercises } from "../Exercises/Exercises";
import FileSystem from "../FileSystem/FileSystem";
import { dataCurrentCourse } from "../../../types/types";
import User from "../User/User";

type allCoursesType = {
	abs: Array<CourseBase>;
	arm: Array<CourseBase>;
	leg: Array<CourseBase>;
	custom: Array<CourseBase> | any[];
};

export class CourseManager {
	protected _allCourses: allCoursesType;

	public initCourses(data: allCoursesType) {
		this._allCourses = data;
		console.log(this._allCourses);
	}
	public pushCustomCourse(course: CourseBase) {
		this._allCourses.custom.push(course);
		FileSystem.createJSONData(this._allCourses.custom, FileSystem.PATHS.customCourses);
	}
	public static loadCustomCourses() {
		try {
			let LoadedDataCustomCourse = FileSystem.loadData(FileSystem.PATHS.customCourses);
			let arrayCustomCourse: Array<CourseBase> = [];

			LoadedDataCustomCourse.forEach(({ _dataCourse }: any) => {
				let courseItem = new CourseBase({
					name: _dataCourse.name,
					id: _dataCourse.id,
					exercises: Exercises.initExercises(_dataCourse.exercises),
					isCreateByUser: _dataCourse.isCreateByUser,
					isUserFollow: _dataCourse.isUserFollow,
					lastTimeExecution: _dataCourse.lastTimeExecution,
					lvlDifficulty: _dataCourse.lvlDifficulty,
					muscleZone: _dataCourse.muscleZone,
					image: customImg,
				});
				arrayCustomCourse.push(courseItem);
			});
			return arrayCustomCourse;
		} catch (e) {
			return [];
		}
	}
	public static isCurrentUserCourse(idCourse: CourseBase, user: User): boolean {
		return idCourse.data.isCreateByUser && idCourse.data.isCreateByUser.userId === user.about.id;
	}
	public removeCustomCourse(idCourse: string) {
		this._allCourses.custom.splice(this._allCourses.custom.indexOf(this.currentBaseById(idCourse)), 1);
		FileSystem.createJSONData(this._allCourses.custom,FileSystem.PATHS.customCourses);
		console.log(this._allCourses.custom)
	}
	public editCustomCourse(idCourse:string,dataEdit:{name:string,muscleType:string,editExercises:Array<Exercise>}){
		let index:number = this._allCourses.custom.findIndex(item=>item.data.id === idCourse);
		this._allCourses.custom[index].setData = dataEdit;
		FileSystem.createJSONData(this._allCourses.custom,FileSystem.PATHS.customCourses);
		console.log(index)
	}
	get allCourses() {
		return this._allCourses;
	}
	public currentBaseById(id: string) {
		return [...this._allCourses.abs, ...this._allCourses.arm, ...this._allCourses.leg, ...this.allCourses.custom].filter((item) => item.data.id === id)[0];
	}
}

export const courseManager = new CourseManager();

courseManager.initCourses(initAllCourses());

function initAllCourses(): allCoursesType {
	const ABSCourseBeginner = new CourseBase({
		name: "ABS Beginner",
		muscleZone: "Abs",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("abs-beginner")) || [],
		lvlDifficulty: 1,
		id: "efd92720-431a-11ed-8958-5f188e7ae6b8",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: { state: false, userId: null },
		isUserFollow: false,
		image: absImg,
	});
	const ABSCourseIntermediate = new CourseBase({
		name: "ABS Intermediate",
		muscleZone: "Abs",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("abs-intermediate")) || [],
		lvlDifficulty: 2,
		id: "efd92721-432b-11ed-8958-5f188e7ae6b8",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: { state: false, userId: null },
		isUserFollow: false,
		image: absImg,
	});
	const ABSCourseAdvanced = new CourseBase({
		name: "ABS Advanced",
		muscleZone: "Abs",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("abs-advanced")) || [],
		lvlDifficulty: 3,
		id: "efd92722-433c-11ed-8958-5f188e7ae6b8",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: { state: false, userId: null },
		isUserFollow: false,
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
		isCreateByUser: { state: false, userId: null },
		isUserFollow: false,
		image: armImg,
	});
	const ArmCourseIntermediate = new CourseBase({
		name: "ARM Intermediate",
		muscleZone: "Arm",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("arm-intermediate")) || [],
		lvlDifficulty: 3,
		id: "efd92724-424c-12ed-8960-5f188e7ae6b2",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: { state: false, userId: null },
		isUserFollow: false,
		image: armImg,
	});
	const ArmCourseAdvanced = new CourseBase({
		name: "ARM Advanced",
		muscleZone: "Arm",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("arm-advanced")) || [],
		lvlDifficulty: 3,
		id: "efd92725-425c-12ed-8960-5f188e7ae6b3",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: { state: false, userId: null },
		isUserFollow: false,
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
		isCreateByUser: { state: false, userId: null },
		isUserFollow: false,
		image: feetImg,
	});
	const LegCourseIntermediate = new CourseBase({
		name: "Leg Intermediate",
		muscleZone: "Leg",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("leg-intermediate")) || [],
		lvlDifficulty: 3,
		id: "efd92725-427c-14ed-8960-5f188e7ae6b5",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: { state: false, userId: null },
		isUserFollow: false,
		image: feetImg,
	});
	const LegCourseAdvanced = new CourseBase({
		name: "Leg Advanced",
		muscleZone: "Leg",
		exercises: allExercises.getExercises.filter((item) => item.getData.id.includes("leg-advanced")) || [],
		lvlDifficulty: 3,
		id: "efd92725-428c-15ed-8960-5f188e7ae6b6",
		lastTimeExecution: new Date().toLocaleString(),
		isCreateByUser: { state: false, userId: null },
		isUserFollow: false,
		image: feetImg,
	});

	return {
		abs: [ABSCourseBeginner, ABSCourseIntermediate, ABSCourseAdvanced],
		arm: [ArmCourseBeginner, ArmCourseIntermediate, ArmCourseAdvanced],
		leg: [LegCourseBeginner, LegCourseIntermediate, LegCourseAdvanced],
		custom: CourseManager.loadCustomCourses(),
	};
}
