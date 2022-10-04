import { FoodItemType } from "../../../types/types";

export class FoodItem {
	private _data: FoodItemType;

	constructor(data: FoodItemType) {
		this._data = data;
	}
	get getData() {
		return this._data;
	}
}
