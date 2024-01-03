import httpAxios from '../utils/axios';
import { onErrorResponse, onSuccessResponse } from '../utils/helpers';
import type { onSuccessResponseType, TestSuiteChart } from '../utils/types';

class TestSuite {
  public async all( projectID: number ) {
    // Request to all project test suites from the server.
    try {
      const response: onSuccessResponseType<TestSuiteChart[]> =
        await httpAxios.get( `/test_suite/${projectID}/` );
      return response.data.results;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  public async create( projectID: number, testSuite: TestSuiteChart ) {
    // Request to create a test suite from the server.
    try {
      const response: onSuccessResponseType<TestSuiteChart> =
        await httpAxios.post( `/test_suites/${projectID}/`, testSuite );
      onSuccessResponse( response );
      return response.data.results;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
  public async update(
    projectID: number,
    suiteID: number,
    testSuite: TestSuiteChart,
  ) {
    // Request to update a test suite from the server.
    try {
      const response: onSuccessResponseType<TestSuiteChart> =
        await httpAxios.put(
          `/test_suites/${projectID}/actions/${suiteID}/`,
          testSuite,
        );
      onSuccessResponse( response );
      return response.data.results;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
  public async delete( projectID: number, suiteID: number ) {
    // Request to update a test suite from the server.
    try {
      const response: onSuccessResponseType<TestSuiteChart> =
        await httpAxios.delete( `/test_suites/${projectID}/actions/${suiteID}/` );
      return response.data.results;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
}

const testSuite = new TestSuite();
export default testSuite;
