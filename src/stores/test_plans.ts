import type { TestPlanChart, TestPlanSection } from '../utils/types';
import { writable } from 'svelte/store';
import testPlans from '../apis/testPlan';

function createTestPlansStore() {
  const store = writable<Array<TestPlanChart>>( [] );
  const { subscribe, update, set } = store;

  async function all( projectID: number ) {
    const res = await testPlans.all( projectID );
    if ( res ) {
      return update( ( s ) => {
        s = res;
        return s;
      } );
    }
  }

  async function get( projectID: number, planID: number ) {
    const res = await testPlans.get( projectID, planID );
    if ( res ) {
      return update( ( s ) => {
        s = [ res ];
        return s;
      } );
    }
  }

  async function create( data: TestPlanChart, projectID: number ) {
    return await testPlans.new( data, projectID ).then( ( rsp ) => {
      if ( rsp ) {
        return update( ( s: TestPlanChart[] ) => {
          s.splice( 0, 0, rsp );
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
    await testPlans.new( data, projectID );
    return this.all( projectID );
  }

  return {
    subscribe,
    set,
    sections,
    create,
  };
}

export const testPlansStore = createTestPlansStore();
export const testPlanSectionsStore = createTestPlanSectionsStore();
