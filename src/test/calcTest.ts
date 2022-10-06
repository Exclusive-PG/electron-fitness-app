import { EnumGoalUser } from "../types/types";
import Calculating from "../scripts/Classes/Calc/Calculating";


export const CalcDailyCalorieIntakeMALE_TEST1 = Calculating.determineDailyCalorieIntake({ age: 21, gender: "male", height: 173, weight: 63, lvlActivy: 0 });
export const CalcDailyCalorieIntakeMALE_TEST2 = Calculating.determineDailyCalorieIntake({ age: 21, gender: "male", height: 173, weight: 63, lvlActivy: 1 });
export const CalcDailyCalorieIntakeMALE_TEST3 = Calculating.determineDailyCalorieIntake({ age: 21, gender: "male", height: 173, weight: 63, lvlActivy: 2 });
export const CalcDailyCalorieIntakeMALE_TEST4 = Calculating.determineDailyCalorieIntake({ age: 21, gender: "male", height: 173, weight: 63, lvlActivy: 3 });
export const CalcDailyCalorieIntakeMALE_TEST5 = Calculating.determineDailyCalorieIntake({ age: 21, gender: "male", height: 173, weight: 63, lvlActivy: 4 });

export const CalcDailyCalorieIntakeFEMALE_TEST1 = Calculating.determineDailyCalorieIntake({ age: 25, gender: "female", height: 164, weight: 54, lvlActivy: 0 });
export const CalcDailyCalorieIntakeFEMALE_TEST2 = Calculating.determineDailyCalorieIntake({ age: 25, gender: "female", height: 164, weight: 54, lvlActivy: 1 });
export const CalcDailyCalorieIntakeFEMALE_TEST3 = Calculating.determineDailyCalorieIntake({ age: 25, gender: "female", height: 164, weight: 54, lvlActivy: 2 });
export const CalcDailyCalorieIntakeFEMALE_TEST4 = Calculating.determineDailyCalorieIntake({ age: 25, gender: "female", height: 164, weight: 54, lvlActivy: 3 });
export const CalcDailyCalorieIntakeFEMALE_TEST5 = Calculating.determineDailyCalorieIntake({ age: 25, gender: "female", height: 164, weight: 54, lvlActivy: 4 });

export const determineRatioOfPFC_TEST1 = Calculating.determineRatioOfPFC(2500,EnumGoalUser.LoseWeight)
export const determineRatioOfPFC_TEST2 = Calculating.determineRatioOfPFC(2500,EnumGoalUser.MaintainWeight)
export const determineRatioOfPFC_TEST3 = Calculating.determineRatioOfPFC(2500,EnumGoalUser.GainWeight)

export const getBodyMassIndex_TEST1 = Calculating.getBodyMassIndex({weight:63,height:164})
export const getBodyMassIndex_TEST2 = Calculating.getBodyMassIndex({weight:80,height:180})
export const getBodyMassIndex_TEST3 = Calculating.getBodyMassIndex({weight:75,height:175})