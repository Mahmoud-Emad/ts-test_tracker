import type { ProjectActivity, projectsType } from './../utils/types';
import httpAxios from "../utils/axios";
import { onErrorResponse, onSuccessResponse } from "../utils/helpers";
import type { onSuccessResponseType } from "../utils/types";

class Dashboard{
    public async recentProjectsUpdated(count: number){
        // Load last projects updated based on its count.
        try {
			const response: onSuccessResponseType = await httpAxios.get(`project/recent/?count=${count}`);
            const projects: projectsType[] = response.data;
			return projects;
		} catch (error) {
            return onErrorResponse(error);
		};
    };
    public async loadLast5ProjectsActivity(){
        // Load last projects updated based on its count.
        try {
			const response: onSuccessResponseType = await httpAxios.get("/project/last-5-projects/activity/");
            const activities: ProjectActivity[] = response.data;
			return activities;
		} catch (error) {
            return onErrorResponse(error);
		};
    };
    public async newProject(data: projectsType){
        // Load last projects updated based on its count.
        try {
			const response: onSuccessResponseType = await httpAxios.post(`/dashboard/projects/`, data);
            const project: projectsType = response.data;
            onSuccessResponse(response)
			return project;
		} catch (error) {
            return onErrorResponse(error);
		};
    };

}


const dashboard = new Dashboard();
export default dashboard;