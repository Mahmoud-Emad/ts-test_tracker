import { writable } from 'svelte/store';
import Dashboard from '../apis/dashboard';
import Projects from '../apis/projects';
import type { ProjectActivity, ProjectsType } from '../utils/types';

function createProjectsStore() {
  const store = writable<Array<ProjectsType>>( [] );
  const { subscribe, update, set } = store;

  async function reload() {
    const res = await Projects.all();
    if ( res ) {
      return update( ( s: ProjectsType[] ) => {
        s = res;
        return s;
      } );
    }
  }

  async function create( project: ProjectsType ) {
    const res = await Projects.new( project );
    if ( res ) {
      return update( ( s: ProjectsType[] ) => {
        s.splice( 0, 0, res );
        return s;
      } );
    }
  }

  async function recentProjectsUpdated( count: number ) {
    const res = await Dashboard.recentProjectsUpdated( count );
    if ( res ) {
      return update( ( s ) => {
        s = res;
        return s;
      } );
    }
  }
  return {
    subscribe,
    set,
    reload,
    create,
    recentProjectsUpdated,
  };
}

function createActivitiesStore() {
  const store = writable<Array<ProjectActivity>>( [] );
  const { subscribe, update, set } = store;

  async function reload() {
    const res = await Dashboard.recentProjectsActivity( 5 );
    if ( res ) {
      return update( ( s ) => {
        s = res;
        return s;
      } );
    }
  }
  return {
    subscribe,
    set,
    reload,
  };
}

function createRecentProjectsStore() {
  const store = writable<Array<ProjectsType>>( [] );
  const { subscribe, update, set } = store;

  async function reload( count: number ) {
    const res = await Dashboard.recentProjectsUpdated( count );
    if ( res ) {
      return update( ( s ) => {
        s = res;
        return s;
      } );
    }
  }
  return {
    subscribe,
    set,
    reload,
  };
}

export const projectsActivitiesStore = createActivitiesStore();
export const recentProjectsStore = createRecentProjectsStore();
export const projectsStore = createProjectsStore();
