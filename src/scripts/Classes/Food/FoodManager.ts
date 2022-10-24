import FileSystem from "../FileSystem/FileSystem";
import { FoodItem } from "./FoodItem";
import FoodImage from "./../../../assets/images/breakfast.jpg";
import { FoodItemType } from "../../../types/types";

export default class FoodManager {
	private listFood: Array<FoodItem> = [];


	public initAllFoodItems(listFood: Array<FoodItem>) {
		this.listFood = listFood;
	}
	public addFoodItem(foodItem: FoodItem) {
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
	public removeCurrentFoodItem(idFoodItem:string){
		this.listFood.splice(this.listFood.indexOf(this.currentFoodById(idFoodItem)), 1);
		this.saveFoodItemsList();
	}
	public saveFoodItemsList(){
		let _customFoodItems = this.getListFood.filter(item=>item.getData.isCreateByUser);
		FileSystem.createJSONData(_customFoodItems,FileSystem.PATHS.foodItem)
	}
	get getListFood() {
		return this.listFood;
	}
}

export const foodManager = new FoodManager();




export function initAllFoodItems (){
	
//@ts-ignore
const images = FileSystem.importAll(require.context("./../../../assets/images/foodItems/", false, /\.(png|jpe?g|svg)$/));

let foodItemArray : Array<FoodItemType>= [
	{ name: "Chicken without skin and bones", id: "1", calories: 100, carbs: 0, fat: 2, protein: 23, portion: 115,vitamins:50, image: "/images/chicken.jpg", pricePerKg: 100 ,isCreateByUser:false},
	{ name: "Turkey without skin and bones", id: "2", calories: 120, carbs: 0, fat: 1, protein: 28, portion: 115,vitamins:40, image: "/images/turkey.jpg", pricePerKg: 130 ,isCreateByUser:false},
	{ name: "Boiled beetroot salad", id: "3", calories: 33, carbs: 6.3, fat: 0.3, protein: 1.8, portion: 100,vitamins:30, image: "/images/saladBeetroot.jpg", pricePerKg: 50 ,isCreateByUser:false},
];

let arrayCompleteFoodItemApp :any[] = []
let arrayCompleteFoodItemCustom :any[]= []
foodItemArray.forEach((itemItemArray) => {
	console.log(itemItemArray);
	itemItemArray.image = images.filter((item: any) => item.default.includes(itemItemArray.image))[0].default || FoodImage,
	arrayCompleteFoodItemApp.push(new FoodItem(itemItemArray));
});
try{
FileSystem.loadData(FileSystem.PATHS.foodItem).forEach((el:any) => {
	arrayCompleteFoodItemCustom.push(new FoodItem(el._data))
});
}catch{
	console.log("not found local data | Food")
	
}

return [...arrayCompleteFoodItemApp,...arrayCompleteFoodItemCustom]
}

foodManager.initAllFoodItems(initAllFoodItems());