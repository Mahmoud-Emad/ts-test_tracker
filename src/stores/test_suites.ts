import type { TestSuiteChart } from './../utils/types';
import { writable } from 'svelte/store';
import TestSuite from '../apis/test_suite';

function createTestSuiteStore() {
  const store = writable<Array<TestSuiteChart>>( [] );
  const { subscribe, update, set } = store;

  async function all( projectID: number ) {
    await TestSuite.all( projectID ).then( ( res ) => {
      console.log( res, update );
    } );
  }

  return {
    subscribe,
    set,
    all,
  };
}

export const testSuiteStore = createTestSuiteStore();
