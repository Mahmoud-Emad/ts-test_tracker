import type { RegisterResponse, ProfileResponse } from "./response";

export type InputValidationsType = {
    isValid?: boolean,
    errorMessage?: string,
};

export type loginCredentials = {
    email?: string,
    password?: string
};

export type registerCredentials = {
    first_name?: string,
    last_name?: string,
    email?: string,
    password?: string
};

export interface IAuthStore{
    access_token?: string,
    refresh_token?: string,
};

export type UserType = {
    email?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    id?: number;
    permission?: string; 
};

export type TokensType = {
    access_token: string;
    refresh_token: string;
};

export enum ToastEnum{
    primary = "primary",
    secondary = "secondary",
    success = "success",
    danger = "danger",
    warning = "warning",
    info = "info",
    light = "light",
    dark = "dark"
};

export type NotifacationType = {
    push?: boolean,
    message?: string,
    hint?: string,
    className?: string,
    title?: string,
    timeOut?: number
};

export type AlertType = {
    className?: string,
    title?: string,
    message?: string,
    isOpen?: boolean,
    error?: Object
};

export type onSuccessResponseType = {
    status: number,
    statusText: string,
    data: RegisterResponse & ProfileResponse,
    headers: Object,
    request: Object,
    message: string
};

export type onErrorResponseType = {
    response: {
        status: number;
        statusText: string,
        data?: {
            message?: string,
            error?: Object,
            data?: Object,
        };
    };
    message: string;
    name: string;
};

export type loginDataType = {
    refresh_token?: string;
    access_token?: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    full_name?: string;
    id?: number;
    data?: {access_token: string};
};

export type gitHubLogin = {
    client_id: string,
    client_secret: string,
    code: string
};
