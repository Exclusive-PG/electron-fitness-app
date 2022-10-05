const { expect, assert } = require("chai");
import "mocha";
import { UserManagerTest, UserTest1, UserTest2 } from "./userTest";

describe("UserManager function", () => {
	it("should return an array of users 2", () => {
		UserManagerTest.addNewUser(UserTest1);
		UserManagerTest.addNewUser(UserTest2);
		expect(UserManagerTest.users).to.have.lengthOf(2);
		UserManagerTest.clearData();
	});
	it("should return an active user with current id", () => {
		let _testId = "1234567890";
		UserManagerTest.setActiveUser = UserTest1;
		expect(UserManagerTest.getctiveUser.about.id).to.equal(_testId);
	});
	it("should return id user goal - Lose Weight | id = 0", () => {
		let _testGoal = "Lose Weight";
		expect(UserManagerTest.getIdUserGoal(_testGoal)).to.equal(0);
	});

	it("should return id user goal - Maintain Weight | id = 1", () => {
		let _testGoal = "Maintain Weight";
		expect(UserManagerTest.getIdUserGoal(_testGoal)).to.equal(1);
	});
	it("should return id user goal - Gain Weight | id = 2", () => {
		let _testGoal = "Gain Weight";
		expect(UserManagerTest.getIdUserGoal(_testGoal)).to.equal(2);
	});
	it("should return a zero users list ", () => {
		UserManagerTest.clearData();
		expect(UserManagerTest.users).to.have.lengthOf(0);
	});
	it("should return an object (User) ", () => {
		UserManagerTest.setActiveUser = UserTest1;
		expect(UserManagerTest.getctiveUser).to.be.an("object");
	});
});

describe("UserManager function", () => {});
