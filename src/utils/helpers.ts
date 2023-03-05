import {v4 as uuidv4} from 'uuid';
import { notifacationStore, alertStore } from './stores';
import { useParams } from 'svelte-navigator';
import { NotifacationType, AlertType, ToastEnum, onSuccessResponseType, onErrorResponseType, RouteType, NotifacationTypeEnum } from './types';

export const generateUUID = () => {
    // Generate a random uuid
    return uuidv4();
}

export function createNewNotifacation(
    className: string, message: string, title: string, timeOut: number, requestType: NotifacationTypeEnum): NotifacationType{
    // Create new notifacation obj
    const createdNotifacation: NotifacationType = {
        className: className,
        message: message,
        isOpen: true,
        timeOut: timeOut,
        title: title,
        requestType: requestType
    };
    notifacationStore.set(createdNotifacation);
    return createdNotifacation;
};

export function clearNotifacationStore(): NotifacationType{
    // clear notifacation store by setting push to false
    const createdNotifacation: NotifacationType = {};
    notifacationStore.set(createdNotifacation)
    return createdNotifacation
};

export function createAlertMessage(className: string, title: string, message: string, error: {}, close: boolean): AlertType{
    const alert :AlertType = {
        isOpen: true,
        className: className,
        message: message,
        title: title,
        error: error,
        close: close
    };
    alertStore.set(alert)
    return alert
};

export function clearAlertMessage(): AlertType{
    // Update clearAlertMessage store by setting isOpen to false
    const alert :AlertType = {
        isOpen: false,
    };
    alertStore.set(alert)
    return alert
};

export function onErrorResponse(error: onErrorResponseType){
    clearNotifacationStore();
    clearAlertMessage();
    let errorMessage: string;
    if(error.response.data && error.response.data.message){
        errorMessage = error.response.data.message;
    };

    if (error.response.status === 401){
        createAlertMessage(
            "danger",
            error.response.statusText,
            errorMessage || "Please check your email/password.",
            error.response.data.error || {},
            false
        );
    } else if(error.response.status === 400){
        createAlertMessage(
            "danger",
            error.response.statusText,
            errorMessage || "Please make sure that you entred a valid data.",
            error.response.data.error || {},
            false
        );
    } else if (error.response.status === 500){
        createNewNotifacation(
            ToastEnum.danger.toString(),
            "Internal server error!.",
            "Oh snap!",
            0,
            NotifacationTypeEnum.RequestServerError
        );
    } else if (error.response.status === 0){
        createNewNotifacation(
            ToastEnum.danger.toString(),
            "Internal server error!.",
            "Oh snap!",
            0,
            NotifacationTypeEnum.RequestNetworkError
        );
    } else if (error.response.status === 403){
        createAlertMessage(
            "danger", 
            "Unauthorized", 
            "You don't have permission to perform this action.", 
            {}, 
            false
        );
    } else {
        createNewNotifacation(
            ToastEnum.danger.toString(),
            error.message,
            error.name,
            0,
            NotifacationTypeEnum.RequestServerError
        );
    };  
};

export function onSuccessResponse(response: onSuccessResponseType){
    clearNotifacationStore();
    clearAlertMessage();
    if(!response.data.message){
        response.message = "Success!";
    } else {
        response.message = response.data.message;
    };

    if (response.status === 200){
        createAlertMessage(
            "success",
            "Success response",
            response.message,
            {},
            true
        );
    } else if (response.status === 201){
        createAlertMessage(
            "success",
            "Created successfully",
            response.message,
            {},
            true
        );
    };
};

export const updateThem = () => {
    if (!localStorage.getItem("mode")){
        localStorage.setItem("mode", "light");
    };
};

export function setTheme(mode: string){
    if(mode === "light"){
        window.document.body.classList.add('light');
        window.document.body.classList.remove('dark');
    } else if(mode === "dark"){
        window.document.body.classList.add('dark');
        window.document.body.classList.remove('light');
    } else {
        updateThem();
    };
};

export const getRoute = (routes: RouteType[], currentRoute: string): boolean => {
    const keys: Array<string> = [];
    const fParam = currentRoute.split("/")[2];
    const sParam = currentRoute.split("/")[4];
    if (!currentRoute.endsWith('/')){
        currentRoute = currentRoute + '/'
    };
 
    for (let route of routes) {
        if(route.path.includes(":id") && fParam != undefined){
            if (route.path.includes(":details") && sParam != undefined){
                route.path = route.path.replace(":details", sParam)
            };
            route.path = route.path.replace(":id", fParam)
        };
        keys.push(route.path)
    };
    return !keys.includes(currentRoute);
};