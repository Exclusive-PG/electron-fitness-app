
import { courseManager,CourseBase } from './../Classes/Courses/CourseBase';
import { Exercise } from './../Classes/Exercises/Exercises';

const currentCourseSection = document.querySelector(".current_course_section")
const currentCourseWrapperRender = document.querySelector<HTMLElement>(".current_course_wrapper_render");
const closeWinCurrentCourse = document.querySelector<HTMLElement>(".close_win_current_course")

const renderTrainingCourse = (outerPlace: HTMLElement, courses:Array<CourseBase>) => {
	outerPlace.innerHTML = "";

	courses.forEach(({data})=>{
        outerPlace.innerHTML += `
        <div class="course_item" data-course-id=${data.id}>
            <div class="course_name">${data.name}</div>
            <div class="course_wrapper_img"><img src=${data.image} /></div>
        </div>
        `
    })


    document.querySelectorAll(".course_item").forEach((item:HTMLDivElement)=>{
        item.addEventListener("click",()=>{
            if(item.hasAttribute("data-course-id")){
                console.log(item.getAttribute("data-course-id"))
                renderCurrentCourse(currentCourseWrapperRender,courseManager.currentBaseById(item.getAttribute("data-course-id")))
                currentCourseSection.classList.add("active")
            }
        })
    })

};

function renderCurrentCourse(outerPlace:HTMLElement,currentCourse:CourseBase){
    const {data} = currentCourse;
    outerPlace.innerHTML = "";
    
    let renderedExercises = "";
    currentCourse.data.exercises.forEach((item:Exercise)=>{
        renderedExercises+= `
        <div class="item_exercises" id=${item.getData.id}>
            <div>${item.getData.name}</div>
        </div>
        `
    })

    outerPlace.innerHTML = `
    <div class="render_current_course" data-current-course-id="${data.id}">
        <div class="left_block">
            <div class="name_current_course">${data.name}</div>
            <div class="name_current_course">${data.muscleZone}</div>
        </div>
        <div class="right_block">
            <div class="exercises">${renderedExercises}</div>
        </div>
    </div>
    `
    closeWinCurrentCourse.addEventListener("click",()=> currentCourseSection.classList.remove("active"))
}


renderTrainingCourse(document.querySelector(".render_abs_training"),courseManager.allCourses.abs)


