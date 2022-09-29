import {  dataUser, EnumGoalUser } from "../../../types/types";
import { allExercises } from "../Exercises/Exercises";
import { uuidv1 } from "./../../requiredLib/requiredLib";
import { CourseBase } from "../Courses/CourseBase";


export default class User {
	private _data: dataUser;

	constructor(enterData: dataUser) {
		this._data = enterData;
	}
	get about() {
		return this._data;
	}
	public pushCourse(course: CourseBase): void {
		this._data.courses.push(course.data);
	}
}

// const user = new User({
// 	username:"Vitaliy",
// 	height:180,
// 	age:20,
// 	courses:[],
// 	weight:80,
// 	id:uuidv1(),
// 	goal:{status:EnumGoalUser.LoseWeight , txt:"Lose Weight"},
// 	lvlActivity:1,
// 	food:{
// 		calories:{
// 			burned:0,
// 			eaten:0,
// 			dailyCalorieIntake:2500,
// 			dailyCarbs:278,
// 			dailyProtein:110,
// 			dailyFat:75
// 		}
// 	},
// 	gender:{
// 		id:1,
// 		txt:"male"
// 	}

// });
