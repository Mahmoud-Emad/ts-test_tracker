import type { InputValidationsType } from "./types";

const NUMS_ONLY_REGEX = /^[0-9]+$/i; // Nums only
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const VALID_NAME = /^([a-zA-Z]{2,10})$/

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
    if (!VALID_NAME.test(name)) {
        validated.isValid = false;
        validated.errorMessage = "You must provide a valid name.";
        return validated;
    };
    validated.isValid = true;
    delete validated.errorMessage;
    return validated;
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