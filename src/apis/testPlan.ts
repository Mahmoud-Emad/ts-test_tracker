import httpAxios from '../utils/axios';
import { onErrorResponse, onSuccessResponse } from '../utils/helpers';
import type { onSuccessResponseType, TestPlanChart } from '../utils/types';

class TestPlans{
    public async new(data: TestPlanChart, projectID: number){
        // Create a new test plan inside an exact project.
        try {
			const response: onSuccessResponseType = await httpAxios.post(`/test_plan/${projectID}/`, data);
            const testPlanCreated: TestPlanChart = response.data;
            onSuccessResponse(response)
			return testPlanCreated;
		} catch (error) {
            return onErrorResponse(error);
		};
    };

    public async all(projectID: number){
        // Request to all project test plans from the server.
        try {
			const response: onSuccessResponseType = await httpAxios.get(`/test_plan/${projectID}/`);
            return response.data;
		} catch (error) {
            return onErrorResponse(error);
		};
    };
    public async get(projectID: number, testPlanID: number){
        // Request to get test plan details from the server.
        try {
			const response: onSuccessResponseType = await httpAxios.get(`/test_plan/${projectID}/actions/${testPlanID}/`);
            return response.data;
		} catch (error) {
            return onErrorResponse(error);
		};
    };
};

const testPlans = new TestPlans();
export default testPlans;