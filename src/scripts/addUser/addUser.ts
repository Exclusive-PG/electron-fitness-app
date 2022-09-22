
import { ipcRenderer } from "electron";
import { os } from "../requiredLib/requiredLib";

const {dialog } = require('electron');

const addNewUserBtn = document.querySelector<HTMLElement>(".add_new_user");
const cancelRegForm = document.querySelector<HTMLElement>(".cancel_reg_new_user");
const WrapperLoginForm = document.querySelector<HTMLElement>(".wrapper_create_login_user");
const FormElement = document.querySelector<HTMLElement>(".forms");
const dropdowns = document.querySelectorAll<HTMLElement>(".dropdown");

addNewUserBtn.addEventListener("click", () => {
	WrapperLoginForm.classList.add("active");
	FormElement.classList.add("active");
	cancelRegForm.classList.add("active");
});

cancelRegForm.addEventListener("click", () => {
	WrapperLoginForm.classList.remove("active");
	FormElement.classList.remove("active");
	cancelRegForm.classList.remove("active");
});

const showTitleDropdown = (value: string,input:HTMLInputElement): void => {
	input.value = value;
    
};

document.querySelectorAll(".goal-user > div").forEach((item:HTMLElement)=>{
    item.addEventListener("click",()=>showTitleDropdown(item.getAttribute("data-value"),document.querySelector<HTMLInputElement>(".goal-user-input")))
})
document.querySelectorAll(".activity-user > div").forEach((item:HTMLElement)=>{
    item.addEventListener("click",()=>showTitleDropdown(item.getAttribute("data-value"),document.querySelector<HTMLInputElement>(".activity-user-input")))
})
dropdowns.forEach((item:HTMLElement)=>{
    item.addEventListener("click",()=> item.classList.toggle("active"))
})

document.querySelectorAll(".gender_ratio").forEach((item:any)=>{
        item.addEventListener("click",()=>{
            if(item.checked){
                console.log(item.getAttribute("data-gender"))
            }
        })
})

// document.querySelector<HTMLInputElement>(".FileUpload").addEventListener("change",()=>{
// console.log(document.querySelector<HTMLInputElement>(".FileUpload").files[0].path)
// })

document.querySelector(".upload_img_user").addEventListener("click",()=>{
    ipcRenderer.send("upload_file");
})
			ipcRenderer.on("upload_file", (event, arg) => {
                console.log(arg.filePath)
                document.querySelector<HTMLImageElement>(".image_user").src = arg.filePath
			});