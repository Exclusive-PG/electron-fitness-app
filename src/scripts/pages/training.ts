import AppController from "../Classes/AppController/AppController";
import { courseManager } from "../Classes/Courses/CourseManager";
import { uuidv4 } from "../requiredLib/requiredLib";
import { CourseBase } from "./../Classes/Courses/CourseBase";
import { allExercises, Exercise, Exercises } from "./../Classes/Exercises/Exercises";
import customImg from "./../../assets/images/custom.jpg";
import { usersManager } from "../Classes/User/UsersManager";
import { CourseManager } from "./../Classes/Courses/CourseManager";
const currentCourseSection = document.querySelector(".current_course_section");
const currentCourseWrapperRender = document.querySelector<HTMLElement>(".current_course_wrapper_render");
const closeWinCurrentCourse = document.querySelector<HTMLElement>(".close_win_current_course");
const formCreateCourse = document.querySelector<HTMLElement>(".form_create_course");
const activeCustomCourse = document.querySelector<HTMLElement>(".active_custom_course");
const cancelCreateCourseBtn = document.querySelector<HTMLElement>(".cancel_create_course");
const nameCustomCourseInput = document.getElementById("nameCourse") as HTMLInputElement;
const muscleTypeInput = document.getElementById("muscle_type") as HTMLInputElement;

const renderTrainingCourse = (outerPlace: HTMLElement, headlineForSection: string, courses: Array<CourseBase>, hotReload: boolean = false) => {
	if (courses.length === 0 && !hotReload) return;
	let renderedCourseItem = "";
	courses.forEach(({ data }) => {
		if ((data.isCreateByUser.state && data.isCreateByUser.userId === usersManager.getctiveUser.about.id) || !data.isCreateByUser.state) {
			renderedCourseItem += `
        <div class="course_item" data-course-id=${data.id}>
            <div class="course_name">${data.name}</div>
            <div class="course_wrapper_img"><img src=${data.image} /></div>
        </div>
        `;
		}
	});
	outerPlace.innerHTML = `<h2 class="hd_training">${courses.length !== 0 ? headlineForSection : ""}</h2>
                            <div class="course_items_wrapper">${renderedCourseItem}</div>
`;

	document.querySelectorAll(".course_item").forEach((item: HTMLDivElement) => {
		item.addEventListener("click", () => {
			if (item.hasAttribute("data-course-id")) {
				renderCurrentCourse(currentCourseWrapperRender, courseManager.currentBaseById(item.getAttribute("data-course-id")));
				currentCourseSection.classList.add("active");
			}
		});
	});
};

function renderCurrentCourse(outerPlace: HTMLElement, currentCourse: CourseBase) {
	const { data } = currentCourse;
	outerPlace.innerHTML = "";

	let renderedExercises = "";
	currentCourse.data.exercises.forEach((item: Exercise, index: number) => {
		renderedExercises += `
        <div class="item_current_exercises" data-id-exercise=${item.getData.id}>
            <h1 class="item_current_name_exercises"><label for="faq-3">${index + 1}. ${item.getData.name}</label></h1>
        </div>
        `;
	});

	outerPlace.innerHTML = `
    <div class="render_current_course" data-current-course-id="${data.id}">
        <div class="left_block">
        
            <div class="img_name_current_course"><img src="${data.image}" 
            /></div>
            <div class="wrapper_for_subtitle_img">
                <div class="name_current_course">${data.name}</div>
                <div class="current_diffic_course">${data.lvlDifficulty !== 0 && renderlvlDifficulty(data.lvlDifficulty, 3)}</div>
            </div>
            <div class="name_current_course">Muscle type: ${data.muscleZone}</div>
            <div class="data_about_current_course">${currentCourse.getAllTimeExercises()} minutes</div>
            ${
							CourseManager.isCurrentUserCourse(currentCourse, usersManager.getctiveUser) &&
							`<div class="controls_for_custom_course">
				<div class="delete_my_custom_course" data-id-for-delete=${data.id}><i class="fa-regular fa-trash-can"></i></div>
				<div class="edit_my_custom_course" data-id-for-edit=${data.id}><i class="fa-regular fa-pen-to-square"></i></div>
				</div>`
						}
        </div>
        <div class="right_block">
            <div class="exercises">${renderedExercises}</div>
            <div class="current_exercise_info_render">
                <div class="close_current_exercise"><i class="fa-solid fa-xmark fa-2x" style="color:#fff"></i></div>
                <div class="render_current_exercise"></div>
            </div>
        </div>
    </div>
    `;
	if (CourseManager.isCurrentUserCourse(currentCourse, usersManager.getctiveUser)) {
		document.querySelector(".delete_my_custom_course").addEventListener("click", () => {
			console.log("delete");
			courseManager.removeCustomCourse(document.querySelector(".delete_my_custom_course").getAttribute("data-id-for-delete"));
			renderTrainingCourse(document.querySelector(".render_custom_training"), "Your custom courses", courseManager.allCourses.custom, true);
			closeWinCurrentCourse.click();
		});
		document.querySelector(".edit_my_custom_course").addEventListener("click", () => {
			console.log("edit");
			formCreateCourse.classList.add("active");
			currentCourseSection.classList.remove("active");
			document.querySelector<HTMLElement>(".container_switcher").style.display = "none";
			setTimeout(() => {
				let _idCourseForEdit = document.querySelector(".edit_my_custom_course").getAttribute("data-id-for-edit");
				editCustomCourse(document.querySelector<HTMLElement>(".render_all_exercises"), allExercises, courseManager.currentBaseById(_idCourseForEdit));
			}, 400);
		});
	}

	document.querySelectorAll(".item_current_exercises").forEach((item) => {
		item.addEventListener("click", () => {
			document.querySelector(".current_exercise_info_render").classList.add("active");
			if (item.hasAttribute("data-id-exercise")) {
				let _exercise = currentCourse.currentExerciseById(item.getAttribute("data-id-exercise"));
				let _render = `
                <div class="current-overview-exercise">
                    <div class="current-overview-exercise-name"><h2>${_exercise.getData.name}</h2></div>
                    <div class="current-overview-exercise-descr">${_exercise.getData.description}</div>
                    ${
											_exercise.getData.linkForVideo !== "" && AppController.isOnline
												? `<div class="current-overview-exercise-video">${renderYTplayer(_exercise.getData.linkForVideo)}</div>`
												: ""
										}
                    
                    <div class="current-overview-exercise-lvl-diffic">Lvl Difficulty: ${_exercise.getData.lvlDifficulty.name}</div>
                    ${
											_exercise.getData.ExecutionTime !== 0
												? `<div class="current-overview-exercise-execution">Execution Time: ${_exercise.getData.ExecutionTime} sec</div>`
												: `<div class="current-overview-exercise-execution">Repetition Сount: ${_exercise.getData.RepetitionСount} times</div>`
										}
                    <div class="current-overview-exercise-calories">Burns Сalories: ${_exercise.getData.caloriesBurned} cal</div>
                </div>
                `;
				document.querySelector(".render_current_exercise").innerHTML = _render;
			}
		});
	});

	closeWinCurrentCourse.addEventListener("click", () => currentCourseSection.classList.remove("active"));

	document.querySelector(".close_current_exercise").addEventListener("click", () => {
		document.querySelector(".current_exercise_info_render").classList.remove("active");
		document.querySelector(".render_current_exercise").innerHTML = "";
	});
}

function renderlvlDifficulty(lvlDifficulty: number, maxLvlDifficulty: number): string {
	let _iconCurrentCourseDiffic = `<i class="fa-solid fa-bolt" style="color:#2ECC71;"></i>`;
	let _iconCurrentCourseTotal = `<i class="fa-solid fa-bolt" style="color:#FF595E;"></i>`;

	return `
    ${_iconCurrentCourseDiffic.repeat(lvlDifficulty)}${_iconCurrentCourseTotal.repeat(maxLvlDifficulty - lvlDifficulty)}
    `;
}

function renderYTplayer(ytLink: string) {
	return `
<iframe width="600" height="350" src="https://www.youtube.com/embed/${ytLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>;
`;
}
function checkId(id: string, array: Exercise[]) {
	let _validate = false;
	array.every((item) => {
		if (item.getData.id === id) {
			_validate = false;
		} else {
			_validate = true;
			return true;
		}
	});
	return !_validate;
}
function createCustomCourse(outputPlace: HTMLElement, exercises: Exercises) {
	document.querySelector(".render_btn_controls_form").innerHTML = `<button class="btn btn-fill create-custom-course active"><span>create</span></button>`;
	let arrayCurrentExercise: any[] = [];
	outputPlace.innerHTML = "";
	exercises.getExercises.forEach(({ getData }) => {
		outputPlace.innerHTML += `
            <div class="exercise_item_create_course" data-id-exercise-create-course="${getData.id}">
            <div class="exercise_item_name">${getData.name}</div>
            <div class="exercise_item_diff">${renderlvlDifficulty(getData.lvlDifficulty.id, 3)}</div>
            <div class="exercise_item_muscletype">${getData.muscleType}</div>
            </div>
        `;
	});
	document.querySelectorAll(".exercise_item_create_course").forEach((item) => {
		item.addEventListener("click", () => {
			item.classList.toggle("active");
			let _idExercise = item.getAttribute("data-id-exercise-create-course");
			let element = exercises.findById(_idExercise);
			let index = arrayCurrentExercise.map((e) => e.getData.id).indexOf(_idExercise);
			console.log(index);
			item.classList.contains("active") ? arrayCurrentExercise.push(element) : index > -1 && arrayCurrentExercise.splice(index, 1);
			console.log(_idExercise);
		});
	});

	document.querySelector(".create-custom-course").addEventListener("click", validateForCreate);

	function validateForCreate() {
		{
			let _validate = false;
			let _errors = [...document.querySelectorAll(".error-icon-create-course")];

			[nameCustomCourseInput, muscleTypeInput].forEach((item, index) => {
				item.value === "" ? _errors[index].classList.add("active") : _errors[index].classList.remove("active");
			});
			console.log(arrayCurrentExercise);
			arrayCurrentExercise.length === 0 ? _errors[2].classList.add("active") : _errors[2].classList.remove("active");
			_errors.every((item) => {
				if (item.classList.contains("active")) {
					_validate = false;
					return;
				} else {
					_validate = true;
					return true;
				}
			});
			if (!_validate) return;

			let createdCourse = new CourseBase({
				id: uuidv4(),
				exercises: arrayCurrentExercise,
				isCreateByUser: { state: true, userId: "70995e80-3fc5-11ed-8ce0-edfdd542509d" },
				isUserFollow: false,
				lastTimeExecution: new Date().toLocaleString(),
				lvlDifficulty: Exercises.averageLvlDiffuculty(arrayCurrentExercise),
				muscleZone: muscleTypeInput.value.toLowerCase(),
				name: nameCustomCourseInput.value,
				image: customImg,
			});
			courseManager.pushCustomCourse(createdCourse);
			renderTrainingCourse(document.querySelector(".render_custom_training"), "Your custom courses", courseManager.allCourses.custom);
			console.log(courseManager.allCourses);
			readyForCreate();
		}
	}
}
function editCustomCourse(outputPlace: HTMLElement, exercises: Exercises, customCourse: CourseBase) {
	document.querySelector(".render_btn_controls_form").innerHTML = `<button class="btn btn-fill edit-custom-course active"><span>edit</span></button>`;
	document.querySelector(".hd_create_course").textContent = "Edit Course";
	nameCustomCourseInput.value = customCourse.data.name;
	muscleTypeInput.value = customCourse.data.muscleZone.charAt(0).toUpperCase() + customCourse.data.muscleZone.slice(1);
	let arrayCurrentExerciseEdit: Exercise[] = [];
	customCourse.data.exercises.forEach(item=>{
		arrayCurrentExerciseEdit.push(item)
	})
	outputPlace.innerHTML = "";

	customCourse.data.exercises.forEach((item) => {
		console.log(item.getData.id);
	});
	// render list of exercises
	exercises.getExercises.forEach((itemExercise) => {
		const { getData } = itemExercise;

		outputPlace.innerHTML += `
            <div class="exercise_item_edit_course ${checkId(itemExercise.getData.id, customCourse.data.exercises) ? "active" : ""}" data-id-exercise-edit-course="${getData.id}">
            <div class="exercise_item_name">${getData.name}</div>
            <div class="exercise_item_diff">${renderlvlDifficulty(getData.lvlDifficulty.id, 3)}</div>
            <div class="exercise_item_muscletype">${getData.muscleType}</div>
            </div>
        `;
	});
	console.log(document.querySelectorAll(".exercise_item_edit_course"));
	// add event for every exercise item
	document.querySelectorAll(".exercise_item_edit_course").forEach((item) => {
		item.addEventListener("click", () => {
			item.classList.toggle("active");
			let _idExercise = item.getAttribute("data-id-exercise-edit-course");
			let element = exercises.findById(_idExercise);
			let index = arrayCurrentExerciseEdit.map((e) => e.getData.id).indexOf(_idExercise);
			console.log(index);
			item.classList.contains("active") ? arrayCurrentExerciseEdit.push(element) : index > -1 && arrayCurrentExerciseEdit.splice(index, 1);
			console.log(_idExercise);
			console.log(arrayCurrentExerciseEdit);
		});
	});

	//TO DO
	document.querySelector(".edit-custom-course").addEventListener("click", () => {
		let _validate = false;
		let _errors = [...document.querySelectorAll(".error-icon-create-course")];

		[nameCustomCourseInput, muscleTypeInput].forEach((item, index) => {
			item.value === "" ? _errors[index].classList.add("active") : _errors[index].classList.remove("active");
		});
		arrayCurrentExerciseEdit.length === 0 ? _errors[2].classList.add("active") : _errors[2].classList.remove("active");
		_errors.every((item) => {
			if (item.classList.contains("active")) {
				_validate = false;
				return;
			} else {
				_validate = true;
				return true;
			}
		});
		console.log(arrayCurrentExerciseEdit);

		if (!_validate) return;

		courseManager.editCustomCourse(customCourse.data.id, { editExercises: arrayCurrentExerciseEdit, muscleType: muscleTypeInput.value, name: nameCustomCourseInput.value });
		renderTrainingCourse(document.querySelector(".render_custom_training"), "Your custom courses", courseManager.allCourses.custom);
		readyForCreate();
		arrayCurrentExerciseEdit = [];
		console.log(courseManager.allCourses);
	});
}
function readyForCreate() {
	console.log("ready");
	formCreateCourse.classList.remove("active");
	document.querySelector<HTMLElement>(".container_switcher").style.display = "block";
	setTimeout(() => {
		createCustomCourse(document.querySelector<HTMLElement>(".render_all_exercises"), allExercises);
	}, 400);
}
function renderTrainingPage() {
	renderTrainingCourse(document.querySelector(".render_abs_training"), "Abs courses", courseManager.allCourses.abs);
	renderTrainingCourse(document.querySelector(".render_arm_training"), "Arm courses", courseManager.allCourses.arm);
	renderTrainingCourse(document.querySelector(".render_leg_training"), "Leg courses", courseManager.allCourses.leg);
	renderTrainingCourse(document.querySelector(".render_custom_training"), "Your custom courses", courseManager.allCourses.custom);
	createCustomCourse(document.querySelector<HTMLElement>(".render_all_exercises"), allExercises);

	activeCustomCourse.addEventListener("click", () => {
		formCreateCourse.classList.add("active");
		document.querySelector<HTMLElement>(".container_switcher").style.display = "none";
	});
	cancelCreateCourseBtn.addEventListener("click", () => {
		console.log("click");
		if (document.querySelector(".hd_create_course").textContent === "Edit Course") readyForCreate();
		formCreateCourse.classList.remove("active");
		document.querySelector<HTMLElement>(".container_switcher").style.display = "block";
		console.log(courseManager.allCourses);
	});

	// show title for dropdown element
	const showTitleDropdown = (value: string, input: HTMLInputElement): void => {
		input.value = value;
	};
	// add event for dropdown
	document.querySelectorAll(".muscle_type_wrapper > div").forEach((item: HTMLElement) => {
		item.addEventListener("click", () => {
			showTitleDropdown(item.getAttribute("data-value"), document.querySelector(".muscle_type_input"));
		});
	});
}

renderTrainingPage();
