import { writable, get } from 'svelte/store';
import type { RequirementsDocChart, RequirementsType } from '../utils/types';

import requirements from '../apis/requirements';
import { alertStore } from './utils';

function createRequirementDocStore() {
  const store = writable<Array<RequirementsDocChart>>( [] );
  const { subscribe, update, set } = store;

  async function create( data: RequirementsDocChart, projectID: number ) {
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
  const store = writable<Array<RequirementsType>>( [] );
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

  async function create(
    projectID: number,
    documentID: number,
    data: RequirementsType,
  ) {
    return await requirements.createNewRequirementSection(
      projectID,
      documentID,
      data,
    );
  }

  async function remove( projectID: number, documentID: number, reqID: number ) {
    await requirements
      .removeRequirementSection( projectID, documentID, reqID )
      .then( () => {
        return update( ( s ) => {
          s = s.filter( ( item ) => item.id !== reqID );
          alertStore.set( {
            isOpen: true,
            message: 'The requirement was deleted successfully.',
            className: 'danger',
            close: false,
          } );
          return s;
        } );
      } );
  }

  async function edit(
    projectID: number,
    documentID: number,
    reqID: number,
    data: RequirementsType,
  ) {
    await requirements
      .updateRequirementSection( projectID, documentID, reqID, data )
      .then( ( res ) => {
        if ( res ) {
          return update( ( s ) => {
            const indx = s.findIndex( ( item ) => item.id === reqID );
            s[indx] = res;
            return s;
          } );
        }
      } );
  }

  return {
    subscribe,
    set,
    all,
    get,
    remove,
    create,
    edit,
  };
}

export const requirementsDocStore = createRequirementDocStore();
export const requirementsStore = createRequiremensStore();
