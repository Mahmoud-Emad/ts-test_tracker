import type { onSuccessResponseType } from './../utils/types';
import axios from '../utils/axios';
import { onErrorResponse, onSuccessResponse } from '../utils/helpers';

class User{
    public async profile(){
        try{
            const response: onSuccessResponseType = await axios.get("/dashboard/user/");
            return response.data;
        } catch (error) {
            onErrorResponse(error)
        };
    };

    public async loadMembers(){
        try{
            const response: onSuccessResponseType = await axios.get("/members/all/");
            return response.data;
        } catch (error) {
            onErrorResponse(error)
        };
    };
};

const user = new User();
export default user;