import httpAxios from '../utils/axios';
import { onErrorResponse, onSuccessResponse } from '../utils/helpers';
import type {
  onSuccessResponseType,
  RequirementsDocChart,
} from '../utils/types';

class Requirements {
  public async new( data: RequirementsDocChart, projectID: number ) {
    // Create a new requirement document inside an exact project.
    try {
      const response: onSuccessResponseType<RequirementsDocChart> =
        await httpAxios.post( `/requirements/${projectID}/`, data );
      const docCreated: RequirementsDocChart = response.data;
      onSuccessResponse( response );
      return docCreated;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  public async all( projectID: number ) {
    // Request to all project requirement documents from the server.
    try {
      const response: onSuccessResponseType<RequirementsDocChart[]> =
        await httpAxios.get( `/requirements/projects/${projectID}/get-all/` );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  //   public async get( projectID: number, testPlanID: number ) {
  //     // Request to get test plan details from the server.
  //     try {
  //       const response: onSuccessResponseType<TestPlanChart> =
  //         await httpAxios.get( `/test_plan/${projectID}/actions/${testPlanID}/` );
  //       return response.data;
  //     } catch ( error ) {
  //       return onErrorResponse( error );
  //     }
  //   }
}

const requirements = new Requirements();
export default requirements;
