import FileSystem from "../FileSystem/FileSystem";
import { FoodItem } from "./FoodItem";
import FoodImage from "./../../../assets/images/breakfast.jpg";
import { FoodItemType } from "../../../types/types";

export default class FoodManager {
	private listFood: Array<FoodItem>;

	constructor() {
		try {
			FileSystem.loadData(FileSystem.PATHS.foodItem).forEach((item: any) => {
				this.pushFoodItem(new FoodItem(item));
			});
		} catch {
			this.listFood = [];
			console.log("file with data not found | FOOD");
		}
	}

	public initAllFoodItems(listFood: Array<FoodItem>) {
		this.listFood = listFood;
	}
	public pushFoodItem(foodItem: FoodItem) {
		this.listFood.push(foodItem);
	}
	public currentFoodById(id: string) {
		return this.listFood.filter((item) => item.getData.id === id)[0];
	}
	public calculateTotalNutriens(id: Array<string>): { protein: number; fats: number; carbs: number; calories: number,portion:number } {
		let nutriens = {
			protein: 0,
			fats: 0,
			carbs: 0,
			calories: 0,
			portion:0
		};

		this.listFood.forEach((item) => {
			if (id.includes(item.getData.id)) {
				nutriens.calories += item.getData.calories;
				nutriens.fats += item.getData.fat;
				nutriens.carbs += item.getData.carbs;
				nutriens.protein += item.getData.protein;
				nutriens.portion += item.getData.portion
			}
		});
		return nutriens;
	}
	get getListFood() {
		return this.listFood;
	}
}

export const foodManager = new FoodManager();

function importAll(r: any) {
	return r.keys().map(r);
}

//@ts-ignore
const images = importAll(require.context("./../../../assets/images/foodItems/", false, /\.(png|jpe?g|svg)$/));
console.log(images);

let foodItemArray : Array<FoodItemType>= [
	{ name: "Chicken without skin and bones", id: "1", calories: 100, carbs: 0, fat: 2, protein: 23, portion: 115, image: "/images/chicken.jpg", pricePerKg: 100 ,isCreateByUser:false},
	{ name: "Turkey without skin and bones", id: "2", calories: 120, carbs: 0, fat: 1, protein: 28, portion: 115, image: "/images/turkey.jpg", pricePerKg: 130 ,isCreateByUser:false},
	{ name: "Boiled beetroot salad", id: "3", calories: 33, carbs: 6.3, fat: 0.3, protein: 1.8, portion: 100, image: "/images/saladBeetroot.jpg", pricePerKg: 50 ,isCreateByUser:false},
];

foodItemArray.forEach((itemItemArray) => {
	console.log(itemItemArray);
	// let _itemFood: FoodItemType;
	// _itemFood = {
	// 	calories: itemItemArray.calories,
	// 	carbs: itemItemArray.carbs,
	// 	fat: itemItemArray.fat,
	// 	id: itemItemArray.id,
	// 	name: itemItemArray.name,
	// 	portion: itemItemArray.portion,
	// 	pricePerKg: itemItemArray.pricePerKg,
	// 	protein: itemItemArray.protein,
	// 	image: images.filter((item: any) => item.default.includes(itemItemArray.image))[0].default || FoodImage,
	// 	isCreateByUser:itemItemArray.isCreateByUser
	// };
	itemItemArray.image = images.filter((item: any) => item.default.includes(itemItemArray.image))[0].default || FoodImage,
	foodManager.pushFoodItem(new FoodItem(itemItemArray));
});
