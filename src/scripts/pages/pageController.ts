
import { renderHomePage } from './home';
import User from './../Classes/User/User';

export const renderApp = (currentUser:User) =>{
    renderHomePage(currentUser)
}