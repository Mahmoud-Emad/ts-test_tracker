import { writable, get } from 'svelte/store';
import type { TestPlanChart, RequirementsDocChart } from '../utils/types';

import Requirements from '../apis/requirements';
import requirements from '../apis/requirements';

function createRequirementDocStore() {
  const store = writable<Array<RequirementsDocChart>>( [] );
  const { subscribe, update, set } = store;

  async function create( data: TestPlanChart, projectID: number ) {
    return await requirements.new( data, projectID );
  }

  async function all( projectID: number ) {
    const res = await Requirements.all( projectID );
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

export const requirementsDocStore = createRequirementDocStore();
