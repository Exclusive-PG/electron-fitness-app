import { dataUser } from "../../../types/types";
import { FoodItem } from "./../Food/FoodItem";

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
		console.log(index);
		index > -1 && this._data.courses.splice(index, 1);
	}
	public hasCurrentCourse(idCourse: string): boolean {
		return this._data.courses.some((id) => id === idCourse);
	}
	public getCurrentMeal(idMeal: string) {
		switch (idMeal) {
			case "1":
				return this._data.food.breakfast;

			case "2":
				return this._data.food.lunch;

			case "3":
				return this._data.food.dinner;
		}
	}
}
