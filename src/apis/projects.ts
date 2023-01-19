import type { projectsType, onSuccessResponseType } from './../utils/types';
import httpAxios from '../utils/axios';
import { onErrorResponse, onSuccessResponse } from '../utils/helpers';

class Projects{
    public async new(data: projectsType){
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

    public async all(){
        // Request to all projects from the server.
        try {
			const response: onSuccessResponseType = await httpAxios.get('/dashboard/projects/');
            const projects: projectsType[] = response.data;
			return projects;
		} catch (error) {
            return onErrorResponse(error);
		};
    };

    public async get(projectID: number){
        // Request to get project detail from the server based on its id.
        try {
			const response: onSuccessResponseType = await httpAxios.get(`project/${projectID}/`);
            const project: projectsType = response.data;
			return project;
		} catch (error) {
            return onErrorResponse(error);
		};
    };
};

const projects = new Projects();
export default projects;