import { dataUser, EnumGoalUser } from "../../../types/types";
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
	public FollowCourse(courseId: string): void {
		this._data.courses.push(courseId);
	}
	public UnfollowCourse(courseId: string): void {
		const index = this._data.courses.indexOf(courseId);
		console.log(index)
		index > -1 &&  this._data.courses.splice(index, 1); 
	}
	public hasCurrentCourse(idCourse: string): boolean {
		return this._data.courses.some((id) => id === idCourse);
	}
}
