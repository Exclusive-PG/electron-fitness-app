import { hello, sum } from "./hello";
const { expect,assert} = require("chai");
import "mocha";

describe("Hello function", () => {
	it("should return hello world", () => {
		const result: string = hello();
		expect(result).to.equal("Hello world!");
	});
});

describe("Sum function", () => {
	it("should return type <number>", () => {
		const result: number = sum(2, -2);
		expect(result).to.be.a('number');
	});

	it("should return 4", () => {
		const result: number = sum(2, 2);
		expect(result).to.equal(4);
	});
});
