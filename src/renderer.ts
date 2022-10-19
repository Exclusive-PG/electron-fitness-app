
import "@fortawesome/fontawesome-free/js/all";
import './assets/styles/index.scss';
import './scripts/Classes/Exercises/Exercises';
import AppController from './scripts/Classes/AppController/AppController';
import Renderer from './scripts/Classes/Renderer/Renderer';
import { renderHomePage } from './scripts/pages/home';
//import { renderTrainingPage } from './scripts/pages/training';
import { renderFoodPage } from './scripts/pages/food';
import { addUserController } from "./scripts/controllers/user-controller/addUser";
import { switchUserControllers } from "./scripts/controllers/user-controller/switchUser";
import { switcherPagesController } from "./scripts/controllers/pages-controllers/switcherPages";
import { renderPagesType } from './types/types';
import FileSystem from './scripts/Classes/FileSystem/FileSystem';
import { Exercises } from "./scripts/Classes/Exercises/Exercises";
import { CourseManager, initAllCourses } from "./scripts/Classes/Courses/CourseManager";

FileSystem.createDirectory(FileSystem.PATHS.images);
AppController.watchInternetConnection();
const controllersUI = [addUserController,switchUserControllers,switcherPagesController]
const pages:renderPagesType = {renderFoodPage,renderHomePage,renderTrainingPage:()=>console.log("Hello from Profile Page"),renderProfilePage:()=>console.log("Hello from Profile Page")}

export const allExercises = new Exercises();
export const rendererApp = new Renderer();
export const courseManager = new CourseManager();

courseManager.initCourses(initAllCourses());
rendererApp.initRenderPages(pages)
rendererApp.initControllers(controllersUI)
rendererApp.startControllers();
rendererApp.renderAllPages();





// const axios = require('axios'); 

// let getData = () => {
//   axios.get('https://github.com/Exclusive-PG/exclusive-ytdownloader-official-site/releases/download/release/link.txt')
//   .then(function (response:any) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error:any) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//   });
// }


//getData()
// let data = 200
// document.getElementById("tweet").addEventListener("click", ()=>{
//     shell.openExternal(`https://twitter.com/intent/tweet?text=Hello form Fitness App .My height is ${data}cm&hashtags=sport,workout,health`)      
// })
//console.log(AppController.isOnline())
// AppController.watchInternetConnection()

// window.addEventListener("keypress",(e)=>{
// 	e.code === "Space" && AppController.stopWatchingInternetConnection()
// })
