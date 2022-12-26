import type { projectsType } from './../utils/types';
import httpAxios from "../utils/axios";
import { onErrorResponse, onSuccessResponse } from "../utils/helpers";
import type { onSuccessResponseType } from "../utils/types";
import { recentProjectsStore } from '../utils/stores';

class Dashboard{
    public async recentProjectsUpdated(count: number){
        // Load last projects updated based on its count.
        try {
			const response: onSuccessResponseType = await httpAxios.get(`project/recent/?count=${count}`);
            const projects: projectsType[] = response.data;
            recentProjectsStore.set(projects);
			return recentProjectsStore;
		} catch (error) {
            return onErrorResponse(error);
		};
    }
}


const dashboard = new Dashboard();
export default dashboard;