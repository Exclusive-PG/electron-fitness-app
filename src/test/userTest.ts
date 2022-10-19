
import { dataUser, EnumGoalUser } from '../types/types';
import User from './../scripts/Classes/User/User';
import { UsersManager } from './../scripts/Classes/User/UsersManager';


const data1 : dataUser = {
    username: "Dmitry",
    age:21,
    weight:63,
    height:173,
    id: "1234567890",
    gender: { txt: "male", id: 1 },
    goal: { txt: "", status: EnumGoalUser.MaintainWeight },
    lvlActivity: 3,
    courses: [],
    food: {breakfast:[],dinner:[],lanch:[],recommendedCalorie:{breakfast:{calories:400,carbs:20,fat:20,protein:50},dinner:{calories:400,carbs:20,fat:20,protein:50},lanch:{calories:400,carbs:20,fat:20,protein:50}}},
    history: [],
    test: {
        dailyCalorieIntake: {calories:{burned:0,dailyCalorieIntake:2350,dailyCarbs:110,dailyProtein:120,dailyFat:54,eaten:0},lastUpdate:new Date().toDateString()},
        bodyMassIndex: {
            bmi: 21,
            lastUpdate : new Date().toDateString()
        },
    },
    image: "",
    dateRegister: new Date().toDateString(),
};

const data2 : dataUser = {
    username: "Ivan",
    age:22,
    weight:80,
    height:164,
    id: "545253151",
    gender: { txt: "male", id: 1 },
    goal: { txt: "", status: EnumGoalUser.LoseWeight },
    lvlActivity: 1,
    courses: [],
    food: {breakfast:[],dinner:[],lanch:[],recommendedCalorie:{breakfast:{calories:400,carbs:20,fat:20,protein:50},dinner:{calories:400,carbs:20,fat:20,protein:50},lanch:{calories:400,carbs:20,fat:20,protein:50}}},
    history: [],
    test: {
        dailyCalorieIntake: {calories:{burned:0,dailyCalorieIntake:1800,dailyCarbs:130,dailyProtein:100,dailyFat:34,eaten:0},lastUpdate:new Date().toDateString()},
        bodyMassIndex: {
            bmi: 30,
            lastUpdate : new Date().toDateString()
        },
    },
    image: "",
    dateRegister: new Date().toDateString(),
};





export const UserTest1 = new User(data1)
export const UserTest2 = new User(data2)
export const UserManagerTest = new UsersManager();
UserManagerTest.clearData();

