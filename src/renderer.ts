
import "@fortawesome/fontawesome-free/js/all";
import './assets/styles/index.scss';
import "./scripts/Classes/User/User"
import "./scripts/Classes/Courses/CourseBase"
import './scripts/Classes/Exercises/Exercises';
import './scripts/Classes/Calc/Calculating';
import AppController from './scripts/Classes/AppController/AppController';
import "./scripts/controllers/user-controller/switcherPages/switcherPages"
import "./scripts/controllers/user-controller/addUser"
import "./scripts/controllers/user-controller/switchUser"
import "./scripts/Classes/FileSystem/FileSystem"
import Renderer from './scripts/Classes/Renderer/Renderer';
import { renderHomePage } from './scripts/pages/home';
import { renderTrainingPage } from './scripts/pages/training';
import { renderFoodPage } from './scripts/pages/food';


export const rendererApp = new Renderer(renderHomePage,renderTrainingPage,renderFoodPage,null);






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
