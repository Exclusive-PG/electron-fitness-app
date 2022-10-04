import { FoodItem } from "./FoodItem";


export default class FoodManager {
    private listFood: Array<FoodItem>
    
    public initAllFoodItems(listFood:Array<FoodItem>){
        this.listFood = listFood
    }
    public pushFoodItem(foodItem:FoodItem){
        this.listFood.push(foodItem)
    }
}