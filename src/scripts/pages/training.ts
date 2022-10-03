import { courseManager, CourseBase } from "./../Classes/Courses/CourseBase";
import { Exercise } from "./../Classes/Exercises/Exercises";

const currentCourseSection = document.querySelector(".current_course_section");
const currentCourseWrapperRender = document.querySelector<HTMLElement>(".current_course_wrapper_render");
const closeWinCurrentCourse = document.querySelector<HTMLElement>(".close_win_current_course");

const renderTrainingCourse = (outerPlace: HTMLElement, courses: Array<CourseBase>) => {
	outerPlace.innerHTML = "";

	courses.forEach(({ data }) => {
		outerPlace.innerHTML += `
        <div class="course_item" data-course-id=${data.id}>
            <div class="course_name">${data.name}</div>
            <div class="course_wrapper_img"><img src=${data.image} /></div>
        </div>
        `;
	});

	document.querySelectorAll(".course_item").forEach((item: HTMLDivElement) => {
		item.addEventListener("click", () => {
			if (item.hasAttribute("data-course-id")) {
				console.log(item.getAttribute("data-course-id"));
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
        <div class="item_current_exercises" id=${item.getData.id}>
            <h1 class="item_current_name_exercises"><label for="faq-3">${index + 1}. ${item.getData.name}</label></h1>
        </div>
        `;
	});

	outerPlace.innerHTML = `
    <div class="render_current_course" data-current-course-id="${data.id}">
        <div class="left_block">
        
            <div class="img_name_current_course"><img src=${data.image}/></div>
            <div class="wrapper_for_subtitle_img">
                <div class="name_current_course">${data.name}</div>
                <div class="current_diffic_course">${data.lvlDifficulty !== 0 && renderlvlDifficulty(data.lvlDifficulty, 3)}</div>
            </div>
            <div class="name_current_course">Muscle type: ${data.muscleZone}</div>
            <div class="data_about_current_course">${currentCourse.getAllTimeExercises()} minutes</div>
            
        </div>
        <div class="right_block">
            <div class="exercises">${renderedExercises}</div>
        </div>
    </div>
    `;

	closeWinCurrentCourse.addEventListener("click", () => currentCourseSection.classList.remove("active"));
}

function renderlvlDifficulty(lvlDifficulty: number, maxLvlDifficulty: number): string {
	let _iconCurrentCourseDiffic = `<i class="fa-solid fa-bolt" style="color:#2ECC71;"></i>`;
	let _iconCurrentCourseTotal = `<i class="fa-solid fa-bolt" style="color:#FF595E;"></i>`;

	return `
    ${_iconCurrentCourseDiffic.repeat(lvlDifficulty)}${_iconCurrentCourseTotal.repeat(maxLvlDifficulty - lvlDifficulty)}
    `;
}

renderTrainingCourse(document.querySelector(".render_abs_training"), courseManager.allCourses.abs);
