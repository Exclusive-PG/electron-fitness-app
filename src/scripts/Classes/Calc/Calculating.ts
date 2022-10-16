import { Nutrients, EnumGoalUser, GoalUser, enterDataForDCI, EnterDataBodyMassIndex } from "../../../types/types";


export default class Calculating {
	static readonly PercentRatio = {
		PROTEIN: 4,
		FAT: 9,
		GARBS: 4,
	};
	public static determineDailyCalorieIntake(data: enterDataForDCI) {
		let result: number = 0;

		data.gender === "female" ? (result = 10 * data.weight + 6.25 * data.height - 5 * data.age - 161) : (result = 10 * data.weight + 6.25 * data.height - 5 * data.age + 5);

		return Math.round(result * this.getCoefLvlActivity(data.lvlActivy));
	}

	public static determineRatioOfPFC(dailyCalorieIntake: number, goalUser: EnumGoalUser): Nutrients {
		switch (goalUser) {
			case EnumGoalUser.LoseWeight: {
				return this.calcRationOfPFC({ protein: 0.3, fats: 0.2, carbs: 0.5 }, dailyCalorieIntake);
			}
			case EnumGoalUser.MaintainWeight: {
				return this.calcRationOfPFC({ protein: 0.3, fats: 0.3, carbs: 0.4 }, dailyCalorieIntake);
			}

			case EnumGoalUser.GainWeight: {
				return this.calcRationOfPFC({ protein: 0.35, fats: 0.3, carbs: 0.55 }, dailyCalorieIntake);
			}
		}
	}
	private static calcRationOfPFC(coef: { protein: number; fats: number; carbs: number }, dailyCalorieIntake: number): Nutrients {
		let _ratio: Nutrients = {
			dailyProtein: 0,
			dailyFat: 0,
			dailyCarbs: 0,
		};
		const { protein, fats, carbs } = coef;
		_ratio.dailyProtein = Math.round((dailyCalorieIntake * protein) / this.PercentRatio.PROTEIN);
		_ratio.dailyFat = Math.round((dailyCalorieIntake * fats) / this.PercentRatio.FAT);
		_ratio.dailyCarbs = Math.round((dailyCalorieIntake * carbs) / this.PercentRatio.GARBS);
		return _ratio;
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
	public static getFullTestDailyCalorieIntake(data: enterDataForDCI, goalUser: EnumGoalUser) {
		let _dailyCalories = this.determineDailyCalorieIntake(data);
		let _ratioOfPfc: Nutrients = this.determineRatioOfPFC(_dailyCalories, goalUser);

		return {
			_dailyCalories,
			_ratioOfPfc,
		};
	}
	public static getBodyMassIndex(data: EnterDataBodyMassIndex) {
		return Math.round(data.weight / Math.pow(data.height / 100, 2));
	}
}

