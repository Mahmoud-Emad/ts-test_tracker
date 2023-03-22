import httpAxios from '../utils/axios';
import { onErrorResponse, onSuccessResponse } from '../utils/helpers';
import type {
  onSuccessResponseType,
  RequirementsDocChart,
  RequirementsType,
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

  public async allRequirements( projectID: number, documentID: number ) {
    // Request to all project document requirement from the server.
    try {
      const response: onSuccessResponseType<RequirementsType[]> =
        await httpAxios.get(
          `requirements/projects/${projectID}/details/${documentID}/`,
        );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
  public async createNewRequirementSection(
    projectID: number,
    documentID: number,
    data: RequirementsType,
  ) {
    // Request to all project document requirement from the server.
    try {
      const response: onSuccessResponseType<RequirementsType> =
        await httpAxios.post(
          `requirements/projects/${projectID}/requirement/${documentID}/`,
          data,
        );
      onSuccessResponse( response );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  public async deleteDocument( projectID: number, docID: number ) {
    // Request to delete project requirement documents from the server.
    try {
      const response: onSuccessResponseType<RequirementsDocChart[]> =
        await httpAxios.delete(
          `/requirements/projects/${projectID}/details/${docID}/`,
        );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  public async updateDocument(
    projectID: number,
    docID: number,
    document: RequirementsDocChart,
  ) {
    // Request to update project requirement documents from the server.
    try {
      const response: onSuccessResponseType<RequirementsDocChart[]> =
        await httpAxios.put(
          `/requirements/projects/${projectID}/details/${docID}/`,
          document,
        );
      onSuccessResponse( response );
      return response.data;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
}

const requirements = new Requirements();
export default requirements;
