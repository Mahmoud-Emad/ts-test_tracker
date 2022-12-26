import type { InputValidationsType } from "./types";

const ALPHA_ONLY_REGEX = /^[a-z]+$/i; // Alphabets only
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export function validateEmail (email: string): InputValidationsType{
    let validated: InputValidationsType = {};    
    if (EMAIL_REGEX.test(email)){
        validated.isValid = true;
        delete validated.errorMessage;
    } else {
        validated.isValid = false;
        validated.errorMessage = "Please Enter a valid email"
    }
    return validated;
};

export function validateEmptyInput (value: string): InputValidationsType{
    let validated: InputValidationsType = {};
    if (value == "" || value == undefined || value == null){
        validated.isValid = false;
        validated.errorMessage = "This field is required"       
    } else {
        validated.isValid = true;
    }
    return validated;
};

export function validateName(name: string): InputValidationsType {
    let validated: InputValidationsType = {};
    if(name){        
        if (name.length < 2) {
            validated.isValid = false;
            validated.errorMessage = "Name must be at least 2 characters";
            return validated;
        };
        if (!isNaN(+name[0]) || specialChars.test(name)){
            validated.isValid = false;
            validated.errorMessage = "Name can only include alphanumeric characters.";
            return validated;
        };
        if (!ALPHA_ONLY_REGEX.test(name)){
            validated.isValid = false;
            validated.errorMessage = "Name can only include alphanumeric characters.";
            return validated;
        };
        if (name.length > 20){
            validated.isValid = false;
            validated.errorMessage = "Name must be at most 20 characters.";
            return validated;
        };
        
        validated.isValid = true;
        delete validated.errorMessage;
        return validated;
    };
    return validated;
};