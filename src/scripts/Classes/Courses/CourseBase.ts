import { dataCurrentCourse } from "../../../types/types";
import { Exercise } from "../Exercises/Exercises";

export class CourseBase {
	protected _dataCourse: dataCurrentCourse;
	
	constructor(dataCourse: dataCurrentCourse) {
		this._dataCourse = dataCourse;
		
	}
	public currentExerciseById(id: string): Exercise {
		return this._dataCourse.exercises.filter((item) => item.getData.id === id)[0];
	}
	public getAllTimeExercisesWithBreakes(): number {
		let totalExecutonTime = this._dataCourse.exercises.reduce((acc, item) => {
			return acc + item.getData.ExecutionTime;
		}, 0);

		return this.calculateAllTimeExercisesWithBreaks(totalExecutonTime);
	}
	private calculateAllTimeExercisesWithBreaks(inputTotalExecutonTime: number): number {
		return Math.round((this._dataCourse.exercises.length * 120 + (this._dataCourse.exercises.length - 1) * 30 - inputTotalExecutonTime) / 60);
	}

	set setData(editData: { name: string; muscleType: string; editExercises: Array<Exercise> }) {
		this._dataCourse.name = editData.name;
		this._dataCourse.muscleZone = editData.muscleType;
		this._dataCourse.exercises = editData.editExercises;
	}

	get data(): dataCurrentCourse {
		return this._dataCourse;
	}
}
