import type { TestSuiteChart } from './../utils/types';
import { writable } from 'svelte/store';
import TestSuite from '../apis/test_suite';
import { alertStore } from './utils';

function createTestSuiteStore() {
  const store = writable<Array<TestSuiteChart>>( [] );
  const { subscribe, update, set } = store;

  async function all( projectID: number ) {
    await TestSuite.all( projectID ).then( ( res ) => {
      console.log( res, update );
    } );
  }

  async function create( projectID: number, testSuite: TestSuiteChart ) {
    await TestSuite.create( projectID, testSuite ).then( ( res: TestSuiteChart ) => {
      if ( res ) {
        console.log( res );
        return update( ( s ) => {
          s.splice( 0, 0, res );
          return s;
        } );
      }
    } );
  }
  async function edit(
    projectID: number,
    suiteID: number,
    testSuite: TestSuiteChart,
  ) {
    await TestSuite.update( projectID, suiteID, testSuite ).then(
      ( res: TestSuiteChart ) => {
        if ( res ) {
          return update( ( s ) => {
            const indx = s.findIndex( ( item ) => item.id === suiteID );
            s[indx] = res;
            return s;
          } );
        }
      },
    );
  }
  async function remove( projectID: number, suiteID: number ) {
    await TestSuite.delete( projectID, suiteID ).then( () => {
      return update( ( s ) => {
        s = s.filter( ( item ) => item.id !== suiteID );
        alertStore.set( {
          isOpen: true,
          message: 'Test Suite Deleted Successfully.',
          className: 'danger',
        } );
        return s;
      } );
    } );
  }

  return {
    subscribe,
    set,
    all,
    edit,
    create,
    remove,
  };
}

export const testSuiteStore = createTestSuiteStore();
