import { writable, get } from 'svelte/store';
import type {
  TestPlanChart,
  RequirementsDocChart,
  Requirements,
} from '../utils/types';

import requirements from '../apis/requirements';

function createRequirementDocStore() {
  const store = writable<Array<RequirementsDocChart>>( [] );
  const { subscribe, update, set } = store;

  async function create( data: TestPlanChart, projectID: number ) {
    return await requirements.new( data, projectID );
  }

  async function all( projectID: number ) {
    const res = await requirements.all( projectID );
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
    all,
    get,
    create,
  };
}

function createRequiremensStore() {
  const store = writable<Array<Requirements>>( [] );
  const { subscribe, update, set } = store;

  async function all( projectID: number, documentID: number ) {
    const res = await requirements.allRequirements( projectID, documentID );
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
    all,
    get,
  };
}

export const requirementsDocStore = createRequirementDocStore();
export const requirementsStore = createRequiremensStore();
