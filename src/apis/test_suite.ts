import httpAxios from '../utils/axios';
import { onErrorResponse } from '../utils/helpers';
import type { onSuccessResponseType, TestSuiteChart } from '../utils/types';

class TestSuite {
  public async all( projectID: number ) {
    // Request to all project test plans from the server.
    try {
      const response: onSuccessResponseType<TestSuiteChart[]> =
        await httpAxios.get( `/test_suite/${projectID}/` );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
}

const testSuite = new TestSuite();
export default testSuite;
