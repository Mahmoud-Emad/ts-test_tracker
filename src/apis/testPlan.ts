import type { TestPlanSection } from './../utils/types';
import httpAxios from '../utils/axios';
import { onErrorResponse, onSuccessResponse } from '../utils/helpers';
import type { onSuccessResponseType, TestPlanChart } from '../utils/types';

class TestPlans {
  public async new( data: TestPlanChart, projectID: number ) {
    // Create a new test plan inside an exact project.
    try {
      const response: onSuccessResponseType<TestPlanChart> =
        await httpAxios.post( `/test_plan/${projectID}/`, data );
      const testPlanCreated: TestPlanChart = response.data;
      onSuccessResponse( response );
      return testPlanCreated;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  public async all( projectID: number ) {
    // Request to all project test plans from the server.
    try {
      const response: onSuccessResponseType<TestPlanChart[]> =
        await httpAxios.get( `/test_plan/${projectID}/` );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
  public async deleteSection(
    projectID: number,
    planID: number,
    sectionTitle: string,
  ) {
    // Request to all project test plans from the server.
    try {
      const response: onSuccessResponseType<TestPlanChart[]> =
        await httpAxios.delete(
          `/test_plan/${projectID}/${planID}/temps/${sectionTitle}/`,
        );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
  public async updateSection(
    projectID: number,
    planID: number,
    title: string,
    section: TestPlanSection,
  ) {
    // Request to all project test plans from the server.
    try {
      const response: onSuccessResponseType<TestPlanChart[]> =
        await httpAxios.put(
          `/test_plan/${projectID}/${planID}/temps/${title}/`,
          section,
        );
      onSuccessResponse( response );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
  public async get( projectID: number, testPlanID: number ) {
    // Request to get test plan details from the server.
    try {
      const response: onSuccessResponseType<TestPlanChart> =
        await httpAxios.get( `/test_plan/${projectID}/actions/${testPlanID}/` );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
}

const testPlans = new TestPlans();
export default testPlans;
