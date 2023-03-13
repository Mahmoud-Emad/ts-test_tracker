import { writable, get } from 'svelte/store';
import isAuthenticated from '../apis/authentication/IsAuthenticated';
import Dashboard from '../apis/dashboard';
import Projects from '../apis/projects';
import TestPlans from '../apis/testPlan';
import type {
  AlertType,
  IAuthStore,
  NotifacationType,
  ProjectsType,
  UserType,
  MemberType,
  ProjectActivity,
  TestPlanChart,
  TestPlanSection,
} from './types';
import User from '../apis/users';
import testPlans from '../apis/testPlan';

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

function createMembersStore() {
  const store = writable<Array<MemberType>>( [] );
  const { subscribe, set } = store;

  function search() {
    return this.loadMembers();
  }
  async function loadMembers() {
    const res: MemberType[] = await User.loadMembers();
    if ( res ) {
      set( res );
    }
  }
  return {
    subscribe,
    set,
    search,
    loadMembers,
  };
}

function createTestPlansStore() {
  const store = writable<Array<TestPlanChart>>( [] );
  const { subscribe, update, set } = store;

  async function all( projectID: number ) {
    const res = await TestPlans.all( projectID );
    if ( res ) {
      return update( ( s ) => {
        s = res;
        return s;
      } );
    }
  }

  async function get( projectID: number, planID: number ) {
    const res = await TestPlans.get( projectID, planID );
    if ( res ) {
      return update( ( s ) => {
        s = [ res ];
        return s;
      } );
    }
  }

  async function create( data: TestPlanChart, projectID: number ) {
    await TestPlans.new( data, projectID );
    return this.all( projectID );
  }

  return {
    subscribe,
    set,
    all,
    get,
    create,
  };
}

function createTestPlanSectionsStore() {
  const store = writable<Array<TestPlanSection>>( [] );
  const { subscribe, update, set } = store;

  async function sections( projectID: number, planID: number ) {
    const plan = await testPlans.get( projectID, planID );
    if ( plan ) {
      return update( ( s ) => {
        s = plan.temps;
        return s;
      } );
    }
  }

  async function create( data: TestPlanChart, projectID: number ) {
    await TestPlans.new( data, projectID );
    return this.all( projectID );
  }

  return {
    subscribe,
    set,
    sections,
    create,
  };
}

function createAuthStore() {
  const store = writable<IAuthStore>( {} );
  const { subscribe, update } = store;

  isAuthenticated().then(
    ( res: { refreshToken: string; accessToken: string } ) => {
      if ( res && res.accessToken && res.refreshToken ) {
        updateTokens( res.accessToken, res.refreshToken );
      } else {
        return update( ( s ) => {
          s.access_token = undefined;
          s.refresh_token = undefined;
          return s;
        } );
      }
    },
  );

  function removeSession() {
    localStorage.removeItem( 'accessToken' );
    localStorage.removeItem( 'refreshToken' );

    // return update((s) => {
    // 	s.access_token = undefined;
    // 	s.refresh_token = undefined;
    // 	return s;
    // });
  }

  function updateTokens( accessToken: string, refreshToken: string ): void {
    localStorage.setItem( 'accessToken', accessToken );
    localStorage.setItem( 'refreshToken', refreshToken );

    if ( accessToken ) {
      if ( get( userStore ) === undefined ) {
        User.profile().then( ( data ) => {
          userStore.set( {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            full_name: data.full_name,
          } );
        } );
      }
    }

    return update( ( s ) => {
      s.access_token = accessToken;
      s.refresh_token = refreshToken;
      return s;
    } );
  }

  return {
    subscribe,
    removeSession,
    updateTokens,
    isAuth(): boolean {
      const { access_token, refresh_token } = get( store );
      return !!access_token && !!refresh_token;
    },
  };
}

export const authStore = createAuthStore();
export const userStore = writable<UserType>( {} );
export const membersStore = createMembersStore();
export const notifacationStore = writable<NotifacationType>( {} );
export const alertStore = writable<AlertType>( {} );
export const projectsStore = createProjectsStore();
export const testPlansStore = createTestPlansStore();
export const recentProjectsStore = createRecentProjectsStore();
export const projectsActivitiesStore = createActivitiesStore();
export const testPlanSectionsStore = createTestPlanSectionsStore();
export const isError404 = writable( false );
