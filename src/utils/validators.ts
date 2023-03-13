import type { InputValidationsType } from './types';

const NUMS_ONLY_REGEX = /^[0-9]+$/i; // Nums only
// disable
const LINK_REGEX =
  // eslint-disable-next-line max-len
  /[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/i; // validate link
const EMAIL_REGEX =
  // eslint-disable-next-line max-len
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VALID_NAME = /^([a-zA-Z]{3,10})$/;
const VALID_PROJECT_NAME = /^(\w[a-z-A-Z]+\s?)*\s*$/;

export function validateEmail( email: string ): InputValidationsType {
  const validated: InputValidationsType = {};
  if ( EMAIL_REGEX.test( email ) ) {
    validated.isValid = true;
    delete validated.errorMessage;
  } else {
    validated.isValid = false;
    validated.errorMessage = 'Please Enter a valid email';
  }
  return validated;
}

export function validateEmptyInput( value: string ): InputValidationsType {
  const validated: InputValidationsType = {};
  if ( value == '' || value == undefined || value == null ) {
    validated.isValid = false;
    validated.errorMessage = 'This field may not be blank.';
  } else {
    validated.isValid = true;
  }
  return validated;
}

export function validatePassword( value: string ): InputValidationsType {
  const validated: InputValidationsType = {};
  if ( value == '' || value == undefined || value == null ) {
    validated.isValid = false;
    validated.errorMessage = 'This field may not be blank.';
  } else if ( value.length < 4 ) {
    validated.isValid = false;
    validated.errorMessage = 'Must be > 4 letters.';
    return validated;
  } else {
    validated.isValid = true;
  }
  return validated;
}

export function validateProjectDescription(
  value: string,
): InputValidationsType {
  const validated: InputValidationsType = {};
  if ( value == '' || value == undefined || value == null ) {
    validated.isValid = false;
    validated.errorMessage = 'This field may not be blank.';
  } else if ( value.length > 500 ) {
    validated.isValid = false;
    validated.errorMessage =
      'Ensure this field has no more than 500 characters.';
  } else {
    validated.isValid = true;
  }
  return validated;
}

export function validateName( name: string ): InputValidationsType {
  const validated: InputValidationsType = {};
  if ( name == '' || name == undefined || name == null ) {
    validated.isValid = false;
    validated.errorMessage = 'This field may not be blank.';
  } else if ( !VALID_NAME.test( name ) ) {
    validated.isValid = false;
    validated.errorMessage = 'You must provide a valid name.';
  } else if ( name.length < 3 ) {
    validated.isValid = false;
    validated.errorMessage = 'Must be > 3 letters.';
  } else {
    validated.isValid = true;
  }
  return validated;
}

export function validateProjectName( name: string ): InputValidationsType {
  const validated: InputValidationsType = {};
  if ( !name ) {
    validated.isValid = false;
    validated.errorMessage = 'This field may not be blank.';
  } else if ( name.length < 4 || name.length > 30 ) {
    validated.isValid = false;
    validated.errorMessage = 'Must be in range (4, 30)';
  } else if ( !VALID_PROJECT_NAME.test( name ) ) {
    validated.isValid = false;
    validated.errorMessage = 'You must provide a valid name.';
  } else {
    validated.isValid = true;
    delete validated.errorMessage;
  }
  return validated;
}

export function validateLink( link: string ): InputValidationsType {
  const validated: InputValidationsType = {};
  if ( !link ) {
    validated.isValid = false;
    validated.errorMessage = 'This field may not be blank.';
    return validated;
  }
  if ( !LINK_REGEX.test( link ) ) {
    validated.isValid = false;
    validated.errorMessage = 'You must provide a valid link.';
    return validated;
  }
  validated.isValid = true;
  delete validated.errorMessage;
  return validated;
}

export function validatePhone( phone: string ) {
  const validated: InputValidationsType = {};
  if ( !phone ) {
    validated.isValid = false;
    validated.errorMessage = 'You must provide a valid phone number.';
    return validated;
  }
  if ( phone.length < 8 || phone.length > 15 ) {
    validated.isValid = false;
    validated.errorMessage = 'Phone number must be > 8 and < 15.';
    return validated;
  }
  if ( !NUMS_ONLY_REGEX.test( phone ) ) {
    validated.isValid = false;
    validated.errorMessage = 'Phone number must includes only numbers.';
    return validated;
  }
  validated.isValid = true;
  delete validated.errorMessage;
  return validated;
}
