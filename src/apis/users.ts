import type {
  MemberType,
  onSuccessResponseType,
  UserType,
} from './../utils/types';
import axios from '../utils/axios';
import { onErrorResponse, onSuccessResponse } from '../utils/helpers';

class User {
  public async profile() {
    try {
      const response: onSuccessResponseType<UserType> = await axios.get(
        '/dashboard/user/',
      );
      return response.data;
    } catch ( error ) {
      onErrorResponse( error );
    }
  }

  public async loadMembers() {
    try {
      const response: onSuccessResponseType<MemberType[]> = await axios.get(
        '/members/all/',
      );
      return response.data;
    } catch ( error ) {
      onErrorResponse( error );
    }
  }

  public async inviteNewMember( memberData: MemberType ) {
    try {
      const response: onSuccessResponseType<MemberType> = await axios.post(
        '/dashboard/members/',
        memberData,
      );
      onSuccessResponse( response );
      return response.data;
    } catch ( error ) {
      onErrorResponse( error );
    }
  }
  public async getMember( id: number ) {
    try {
      const response: onSuccessResponseType<MemberType> = await axios.get(
        `members/${id}/`,
      );
      return response.data;
    } catch ( error ) {
      onErrorResponse( error );
    }
  }
}

const user = new User();
export default user;
