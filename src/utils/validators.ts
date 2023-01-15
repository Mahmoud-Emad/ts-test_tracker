import type { InputValidationsType } from "./types";

const ALPHA_ONLY_REGEX = /^[A-Za-z]*$/; // Alphabets only
const NUMS_ONLY_REGEX = /^[0-9]+$/i; // Nums only
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
        if (!ALPHA_ONLY_REGEX.test(String(name))){
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
    } else {
        validated.isValid = false;
        validated.errorMessage = "You must provide a valid name.";
        return validated;
    };
};

export function validatePhone(phone: string){
    let validated: InputValidationsType = {};
    if(!phone){
        validated.isValid = false;
        validated.errorMessage = "You must provide a valid phone number.";
        return validated;
    };
    if (phone.length < 8 || phone.length > 15){
        validated.isValid = false;
        validated.errorMessage = "Phone number must be > 8 and < 15.";
        return validated;
    };
    if (!NUMS_ONLY_REGEX.test(phone)){
        validated.isValid = false;
        validated.errorMessage = "Phone number must includes only numbers.";
        return validated;
    };
    validated.isValid = true;
    delete validated.errorMessage;
    return validated;
}