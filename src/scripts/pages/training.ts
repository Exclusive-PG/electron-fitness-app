import AppController from "../Classes/AppController/AppController";
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

    document.querySelectorAll(".item_current_exercises").forEach((item)=>{
        item.addEventListener("click",()=>{
            document.querySelector(".current_exercise_info_render").classList.add("active")
            if(item.hasAttribute("data-id-exercise")){
                let _exercise = currentCourse.currentExerciseById(item.getAttribute("data-id-exercise"));
                let _render = `
                <div class="current-overview-exercise">
                    <div class="current-overview-exercise-name"><h2>${_exercise.getData.name}</h2></div>
                    <div class="current-overview-exercise-descr">${_exercise.getData.description}</div>
                    ${(_exercise.getData.linkForVideo !== "" && AppController.isOnline) ? 
                    `<div class="current-overview-exercise-video">${renderYTplayer(_exercise.getData.linkForVideo)}</div>` : ""}
                    
                    <div class="current-overview-exercise-lvl-diffic">Lvl Difficulty: ${_exercise.getData.lvlDifficulty.name}</div>
                    ${(_exercise.getData.ExecutionTime !== 0) ? 
                        `<div class="current-overview-exercise-execution">Execution Time: ${_exercise.getData.ExecutionTime} sec</div>` :
                        `<div class="current-overview-exercise-execution">Repetition Сount: ${_exercise.getData.RepetitionСount} times</div>`
                    }
                    <div class="current-overview-exercise-calories">Burns Сalories: ${_exercise.getData.caloriesBurned} cal</div>
                </div>
                `
               document.querySelector(".render_current_exercise").innerHTML = _render;
            }
        })
    })

	closeWinCurrentCourse.addEventListener("click", () => currentCourseSection.classList.remove("active"));

    document.querySelector(".close_current_exercise").addEventListener("click",()=>{
        document.querySelector(".current_exercise_info_render").classList.remove("active")
        document.querySelector(".render_current_exercise").innerHTML = "";
    })
 
}

function renderlvlDifficulty(lvlDifficulty: number, maxLvlDifficulty: number): string {
	let _iconCurrentCourseDiffic = `<i class="fa-solid fa-bolt" style="color:#2ECC71;"></i>`;
	let _iconCurrentCourseTotal = `<i class="fa-solid fa-bolt" style="color:#FF595E;"></i>`;

	return `
    ${_iconCurrentCourseDiffic.repeat(lvlDifficulty)}${_iconCurrentCourseTotal.repeat(maxLvlDifficulty - lvlDifficulty)}
    `;
}

function renderYTplayer(ytLink:string){
return `
<iframe width="600" height="350" src="https://www.youtube.com/embed/${ytLink}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>;
`
}



renderTrainingCourse(document.querySelector(".render_abs_training"), courseManager.allCourses.abs);
renderTrainingCourse(document.querySelector(".render_arm_training"), courseManager.allCourses.arm);
renderTrainingCourse(document.querySelector(".render_leg_training"), courseManager.allCourses.leg);