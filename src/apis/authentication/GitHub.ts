import type { gitHubLogin, TokensType } from './../../utils/types';
import httpAxios from '../../utils/axios';
import { onSuccessResponse, onErrorResponse } from '../../utils/helpers';
import type { onSuccessResponseType } from '../../utils/types';


class GitHub{
    //TODO: add it to env file
    private clientId = "cbe847a6d887c0ed34a2";
    private clientSecret = "3f5bc3a66178d5b3796c48eeab6def901f1c5f64";

    public async gitHubToken(code: string){
        // Call the server api to get github token.
        try {
            const data: gitHubLogin = {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code
            };
            console.log(data);
            const response: onSuccessResponseType = await httpAxios.post("/auth/github/access_token/", data);
            console.log(response);
            onSuccessResponse(response);
            return response.data.access_token;
        } catch (error) {
            return onErrorResponse(error);
        }
    };

    public async getUser(accessToken: string){
        try{
            const response: onSuccessResponseType = await httpAxios.post("/auth/github/user/", {
                access_token: accessToken
            });
            onSuccessResponse(response);
            const tokensType: TokensType = {"access_token": response.data.access_token, "refresh_token": response.data.refresh_token}
			return tokensType;
        } catch (error) {
            return onErrorResponse(error);
        }
    };
};

const gitHubAPI = new GitHub();
export default gitHubAPI;