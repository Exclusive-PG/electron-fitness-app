import { Nutrients, EnumGoalUser, GoalUser } from "../../../types/types";

type enterDataForDCI = {
	gender: "male" | "female" | string;
	age: number;
	weight: number;
	height: number;
	lvlActivy: number;
};
type EnterDataBodyMassIndex = {
	weight:number;
	height:number
}
export default class Calculating {
	static readonly PercentRatio = {
		PROTEIN: 4,
		FAT: 9,
		GARBS: 4,
	};
	public static determineDailyCalorieIntake(data: enterDataForDCI) {
		let result: number = 0;

		data.gender === "female" ? (result = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161) : (result = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5);

		return Math.round(result) * this.getCoefLvlActivity(data.lvlActivy);
	}

	public static determineRatioOfPFC(dailyCalorieIntake: number, goalUser: EnumGoalUser): Nutrients {
		let _ratio: Nutrients = {
			dailyProtein: 0,
			dailyFat: 0,
			dailyCarbs: 0,
		};
		switch (goalUser) {
			case EnumGoalUser.LoseWeight: {
				_ratio.dailyProtein = Math.round((dailyCalorieIntake * 0.3) / this.PercentRatio.PROTEIN);
				_ratio.dailyFat = Math.round((dailyCalorieIntake * 0.2) / this.PercentRatio.FAT);
				_ratio.dailyCarbs = Math.round((dailyCalorieIntake * 0.5) / this.PercentRatio.GARBS);
				return _ratio;
			}
			case EnumGoalUser.MaintainWeight: {
				_ratio.dailyProtein = Math.round((dailyCalorieIntake * 0.3) / this.PercentRatio.PROTEIN);
				_ratio.dailyFat = Math.round((dailyCalorieIntake * 0.3) / this.PercentRatio.FAT);
				_ratio.dailyCarbs = Math.round((dailyCalorieIntake * 0.4) / this.PercentRatio.GARBS);
				return _ratio;
			}

			case EnumGoalUser.GainWeight: {
				_ratio.dailyProtein = Math.round((dailyCalorieIntake * 0.35) / this.PercentRatio.PROTEIN);
				_ratio.dailyFat = Math.round((dailyCalorieIntake * 0.3) / this.PercentRatio.FAT);
				_ratio.dailyCarbs = Math.round((dailyCalorieIntake * 0.55) / this.PercentRatio.GARBS);
				return _ratio;
			}
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
	public static getFullTestDailyCalorieIntake(data:enterDataForDCI,goalUser:EnumGoalUser){
		let _dailyCalories = this.determineDailyCalorieIntake(data);
		let _ratioOfPfc:Nutrients = this.determineRatioOfPFC(_dailyCalories,goalUser);
		
		return{
			_dailyCalories,
			_ratioOfPfc
		}
	}
	public static getBodyMassIndex(data:EnterDataBodyMassIndex){
		
		return (data.weight)/(Math.pow((data.height/100),2))
	}
}





// let res = Calculating.determineDailyCalorieIntake({ age: 21, weight: 65, height: 172, gender: "female", lvlActivy: 2 });
// console.log(res);

// let loseRatio = Calculating.determineRatioOfPFC(res, EnumGoalUser.LoseWeight);
// console.log("LoseWeight", loseRatio);

// let MaintainRatio = Calculating.determineRatioOfPFC(res, EnumGoalUser.MaintainWeight);
// console.log("MaintainWeight", MaintainRatio);

// let gainRatio = Calculating.determineRatioOfPFC(res, EnumGoalUser.GainWeight);
// console.log("GainWeight", gainRatio);
