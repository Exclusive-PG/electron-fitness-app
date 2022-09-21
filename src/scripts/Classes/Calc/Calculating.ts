import { EnumGoalUser, GoalUser } from "../../../types/types";

type enterDataForDCI = {
	gender: "male" | "female";
	age: number;
	weight: number;
	height: number;
	lvlActivy: number;
};

export default class Calculating {
	public static determineDailyCalorieIntake(data: enterDataForDCI) {
		let result: number = 0;

		data.gender === "female"
			? (result = (10 * data.weight + 6.25 * data.height - 5 * data.age - 161) * this.getCoefLvlActivity(data.lvlActivy))
			: (result = (10 * data.weight + 6.25 * data.height - 5 * data.age + 5) * this.getCoefLvlActivity(data.lvlActivy));

		return Math.round(result);
	}

	public static determineRatioOfPFC(dailyCalorieIntake: number, goalUser: EnumGoalUser) {
		switch (goalUser) {
			case EnumGoalUser.LoseWeight:
				return console.log("lose W");
			case EnumGoalUser.MaintainWeight:
				return console.log("main W");
			case EnumGoalUser.GainWeight:
				return console.log("gain W");
		}
	}

	public static getCoefLvlActivity(lvlActivity: number) {
		switch (lvlActivity) {
			case 0:
				return 1.2;
			case 1:
				return 1.375;
			case 2:
				return 1.55;
			case 3:
				return 1.725;
			case 4:
				return 1.9;
		}
	}
}

let res = Calculating.determineDailyCalorieIntake({ age: 21, weight: 65, height: 172, gender: "female", lvlActivy: 2 });
console.log(res);
let ratio = Calculating.determineRatioOfPFC(2000,EnumGoalUser.GainWeight)
