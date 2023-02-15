import { projectsStore } from './../utils/stores';
import { projectsType, onSuccessResponseType, UserType, ToastEnum, NotifacationTypeEnum } from './../utils/types';
import httpAxios from '../utils/axios';
import { createNewNotifacation, onErrorResponse, onSuccessResponse } from '../utils/helpers';

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
    public async delete(project: projectsType, deletedBy: UserType){
        // Request to delete a project from the database, 
        // must provide all project data to create a notifacation when redirect to home page.
        // Should provide the action by[USER] => UserType.

        try {
			const response: onSuccessResponseType = await httpAxios.delete(`project/${project.id}/`);
            createNewNotifacation(
                ToastEnum.danger.toString(),
                `Success deleted project ${project.title} by ${deletedBy.full_name}`,
                "Project has ben deleted!",
                5000,
                NotifacationTypeEnum.RequestDeleted
            );
			return response;
		} catch (error) {
            return onErrorResponse(error);
		};
    };
    public async addORRemoveMember(projectID: number, memberID: number){
        // Request to add member inside an exact project.
        try{
            const response: onSuccessResponseType = await httpAxios.put(`project/${projectID}/members/${memberID}/`,);
            const project: projectsType = response.data;
            if(project){
                projectsStore.set([project])
            };
            onSuccessResponse(response)
            return projectsStore;
		} catch (error) {
            return onErrorResponse(error);
		};
    };
    public async update(data: projectsType){
        // Request to update a project with requested data.
        try{
            const response: onSuccessResponseType = await httpAxios.put(`project/${data.id}/`, data);
            const project: projectsType = response.data;
            if(project){
                projectsStore.set([project])
            };
            onSuccessResponse(response)
            return projectsStore;
		} catch (error) {
            return onErrorResponse(error);
		};
    };
};

const projects = new Projects();
export default projects;