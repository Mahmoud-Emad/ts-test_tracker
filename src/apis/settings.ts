import type { onSuccessResponseType, UserType } from "../utils/types";
import httpAxios from "../utils/axios";
import { onErrorResponse, onSuccessResponse } from "../utils/helpers";


class SettingsService{
    public async update(payload: UserType){
        // Load last projects updated based on its count.
        try {
            const response: onSuccessResponseType = await httpAxios.put("auth/settings/", payload);
            onSuccessResponse(response);
			return response;
		} catch (error) {
            return onErrorResponse(error);
		};
    }
}


const settings = new SettingsService();
export default settings;