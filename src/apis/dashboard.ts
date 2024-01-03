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
      const projects: ProjectsType[] = response.data.results;
      return projects;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  public async recentProjectsActivity( count: number ) {
    // Load last projects updated based on its count.
    try {
      const response: onSuccessResponseType<ProjectActivity[]> =
        await httpAxios.get( `/project/recent/activity/?count=${count}` );
      const activities: ProjectActivity[] = response.data.results;
      return activities;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
}

const dashboard = new Dashboard();
export default dashboard;
