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
      return update( ( s ) => {
        s = res;
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
    recentProjectsUpdated,
  };
}

function createActivitiesStore() {
  const store = writable<Array<ProjectActivity>>( [] );
  const { subscribe, update, set } = store;

  async function reload() {
    const res = await Dashboard.loadLast5ProjectsActivity();
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

  function search( count: number ) {
    return this.reload( count );
  }

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
    search,
    reload,
  };
}

export const projectsActivitiesStore = createActivitiesStore();
export const recentProjectsStore = createRecentProjectsStore();
export const projectsStore = createProjectsStore();
