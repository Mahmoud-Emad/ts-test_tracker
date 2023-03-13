import type { ProjectActivity, ProjectsType } from './../utils/types';
import httpAxios from '../utils/axios';
import { onErrorResponse } from '../utils/helpers';
import type { onSuccessResponseType } from '../utils/types';

class Dashboard {
  public async recentProjectsUpdated( count: number ) {
    // Load last projects updated based on its count.
    try {
      const response: onSuccessResponseType<ProjectsType[]> =
        await httpAxios.get( `project/recent/?count=${count}` );
      const projects: ProjectsType[] = response.data;
      return projects;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  public async loadLast5ProjectsActivity() {
    // Load last projects updated based on its count.
    try {
      const response: onSuccessResponseType<ProjectActivity[]> =
        await httpAxios.get( '/project/last-5-projects/activity/' );
      const activities: ProjectActivity[] = response.data;
      return activities;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
}

const dashboard = new Dashboard();
export default dashboard;
