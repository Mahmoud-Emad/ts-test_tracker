import type { TokensType } from './../../utils/types';
import type {
  loginCredentials,
  onSuccessResponseType,
  registerCredentials,
  UserType,
} from '../../utils/types';
import httpAxios from '../../utils/axios';
import { onErrorResponse, onSuccessResponse } from '../../utils/helpers';
import { userStore } from '../../utils/store';

class Authentication {
  async refresh( refresh: string ) {
    // Request for getting a refresh token when token expires.
    try {
      return await httpAxios.post( '/auth/token/refresh/', { refresh: refresh } );
    } catch ( error ) {
      throw new Error( error );
    }
  }

  async login( credentials: loginCredentials ) {
    // Request for getting an access token to user with his credentials.
    try {
      const response: onSuccessResponseType<UserType & TokensType> =
        await httpAxios.post( 'auth/login/', credentials );
      onSuccessResponse( response );
      const user: UserType = {
        email: response.data.email,
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        id: response.data.id,
        full_name: response.data.full_name,
      };
      userStore.set( user );
      const tokensType: TokensType = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };
      return tokensType;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  async register( credentials: registerCredentials ) {
    // Request for getting an access token to user with his credentials.
    try {
      const response: onSuccessResponseType<TokensType> = await httpAxios.post(
        'auth/signup/',
        credentials,
      );
      onSuccessResponse( response );
      const tokensType: TokensType = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };
      return tokensType;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }

  async invitation( signature: string ) {
    // Request to register new user that came with an invitation from email,
    // must include a signature to continue the process.
    try {
      const response: onSuccessResponseType<TokensType> = await httpAxios.get(
        `auth/invitation/?signature=${signature}`,
        {},
      );
      onSuccessResponse( response );
      // const tokensType:
      // TokensType = {"access_token": response.data.access_token, "refresh_token": response.data.refresh_token}
      // return tokensType;
    } catch ( error ) {
      return onErrorResponse( error );
    }
  }
}

const authenticationAPI = new Authentication();
export default authenticationAPI;
