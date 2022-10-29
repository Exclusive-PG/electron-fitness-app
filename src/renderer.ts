import "@fortawesome/fontawesome-free/js/all";
import "./assets/styles/index.scss";
import "./scripts/Classes/Exercises/Exercises";
import AppController from "./scripts/Classes/AppController/AppController";
import Renderer from "./scripts/Classes/Renderer/Renderer";
import { renderHomePage } from "./scripts/pages/home";
import { renderTrainingPage } from "./scripts/pages/training";
import { renderFoodPage } from "./scripts/pages/food";
import { addUserController } from "./scripts/controllers/user-controller/addUser";
import { switchUserControllers } from "./scripts/controllers/user-controller/switchUser";
import { switcherPagesController } from "./scripts/controllers/pages-controllers/switcherPages";
import { renderPagesType } from "./types/types";
import FileSystem from "./scripts/Classes/FileSystem/FileSystem";
import { Exercises } from "./scripts/Classes/Exercises/Exercises";
import { CourseManager, initAllCourses } from "./scripts/Classes/Courses/CourseManager";
import "./scripts/Classes/Food/FoodManager";
import "./scripts/mmdo/simplexTable";
import { renderProfilePage } from "./scripts/pages/profile";
import { fs } from "./scripts/requiredLib/requiredLib";

const linkForExercises = "https://github.com/Exclusive-PG/electron-fitness-app/releases/download/exercises/exercises.json"
export let allExercises:Exercises;
export let rendererApp:Renderer
export let courseManager:CourseManager

FileSystem.createDirectory(FileSystem.PATHS.images);
FileSystem.createDirectory(FileSystem.PATHS.imagesFood);
AppController.watchInternetConnection();
const controllersUI = [addUserController, switchUserControllers, switcherPagesController];
const pages: renderPagesType = { renderFoodPage, renderHomePage, renderTrainingPage, renderProfilePage };

if (!fs.existsSync(FileSystem.PATHS.exercises)) {
	if (AppController.isOnline) {
		AppController.downloadContent(linkForExercises).then((response) => {
			console.log(response.data);
			FileSystem.createJSONData(response.data, FileSystem.PATHS.exercises);
            initApp();
		});
	}
    else{
        alert("No internet connection, unable to download data")
        //FileSystem.createJSONData([],FileSystem.PATHS.exercises)
        //initApp();
    }
}else initApp()

function initApp(){
    allExercises = new Exercises();
    rendererApp = new Renderer();
    courseManager = new CourseManager();
    
    courseManager.initCourses(initAllCourses());
    rendererApp.initRenderPages(pages);
    rendererApp.initControllers(controllersUI);
    rendererApp.startControllers();
    rendererApp.renderAllPages();
}


// let data = 200
// document.getElementById("tweet").addEventListener("click", ()=>{
//     shell.openExternal(`https://twitter.com/intent/tweet?text=Hello form Fitness App .My height is ${data}cm&hashtags=sport,workout,health`)
// })
//console.log(AppController.isOnline())
// AppController.watchInternetConnection()

// window.addEventListener("keypress",(e)=>{
// 	e.code === "Space" && AppController.stopWatchingInternetConnection()
// })
