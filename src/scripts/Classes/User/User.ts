import { dataCurrentCourse, IExercise } from '../../../types/types';
import { allExercises } from '../Exercises/Exercises';
import { uuidv1 } from './../../requiredLib/requiredLib';
import { CourseBase } from '../Courses/CourseBase';


type dataUser = {
	id:string;
	username: string;
	kcal: number;
	height: number;
	weight: number;
	age: number;
	courses: Array<dataCurrentCourse>;
};

export default class User {
	private _data: dataUser;

	constructor(enterData: dataUser) {
        this._data = enterData;
    }
    get about(){
        return this._data;
    }
	public pushCourse(course:CourseBase):void {
		this._data.courses.push(course.data);
	}

}

const user = new User({username:"Vitaliy", height:180,age:20,courses:[],kcal:2202,weight:80,id:uuidv1()});

const ABSCourse = new CourseBase({name:"ABS Beginner",muscleZone:"ABS",exercises:[allExercises.getExercises[0].getData,allExercises.getExercises[1].getData],lvlDifficulty:1,id:uuidv1()});

user.pushCourse(ABSCourse)
console.log(user.about)