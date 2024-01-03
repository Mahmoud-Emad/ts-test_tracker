import { projectsStore } from './../stores/projects';
import type {
  ProjectsType,
  onSuccessResponseType,
  UserType,
} from './../utils/types';
import { ToastEnum, NotifacationTypeEnum } from './../utils/types';
import httpAxios from '../utils/axios';
import {
  createNewNotifacation,
  onErrorResponse,
  onSuccessResponse,
} from '../utils/helpers';

class Projects {
  public async new( data: ProjectsType ) {
    // Load last projects updated based on its count.
    try {
      const response: onSuccessResponseType<ProjectsType> =
        await httpAxios.post( '/dashboard/projects/', data );
      const project: ProjectsType = response.data.results;
      onSuccessResponse( response );
      return project;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  public async all() {
    // Request to all projects from the server.
    try {
      const response: onSuccessResponseType<ProjectsType[]> =
        await httpAxios.get( '/dashboard/projects/' );        
      const projects: ProjectsType[] = response.data.results;
      return projects;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  public async get( projectID: number ) {
    // Request to get project detail from the server based on its id.
    try {
      const response: onSuccessResponseType<ProjectsType> = await httpAxios.get(
        `project/${projectID}/`,
      );
      const project: ProjectsType = response.data.results;
      return project;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
  public async delete( project: ProjectsType, deletedBy: UserType ) {
    // Request to delete a project from the database,
    // must provide all project data to create a notifacation when redirect to home page.
    // Should provide the action by[USER] => UserType.

    try {
      const response: onSuccessResponseType<ProjectsType> =
        await httpAxios.delete( `project/${project.id}/` );
      createNewNotifacation(
        ToastEnum.danger.toString(),
        `Success deleted project ${project.title} by ${deletedBy.full_name}`,
        'Project has ben deleted!',
        5000,
        NotifacationTypeEnum.RequestDeleted,
      );
      return response;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
  public async addORRemoveMember( projectID: number, memberID: number ) {
    // Request to add member inside an exact project.
    try {
      const response: onSuccessResponseType<ProjectsType> = await httpAxios.put(
        `project/${projectID}/members/${memberID}/`,
      );
      const project: ProjectsType = response.data.results;
      onSuccessResponse( response );
      return project;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
  public async update( data: ProjectsType ) {
    // Request to update a project with requested data.
    try {
      const response: onSuccessResponseType<ProjectsType> = await httpAxios.put(
        `project/${data.id}/`,
        data,
      );
      const project: ProjectsType = response.data.results;
      if ( project ) {
        projectsStore.set( [ project ] );
      }
      onSuccessResponse( response );
      return projectsStore;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
}

const projects = new Projects();
export default projects;
