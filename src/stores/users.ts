import { writable, get } from 'svelte/store';
import isAuthenticated from '../apis/authentication/IsAuthenticated';
import type { IAuthStore, UserType, MemberType } from '../utils/types';
import User from '../apis/users';

function createAuthStore() {
  const store = writable<IAuthStore>( {} );
  const { subscribe, update } = store;

  isAuthenticated().then(
    ( res: { refreshToken: string; accessToken: string } ) => {
      if ( res && res.accessToken && res.refreshToken ) {
        updateTokens( res.accessToken, res.refreshToken );
      } else {
        return update( ( s ) => {
          s.access_token = undefined;
          s.refresh_token = undefined;
          return s;
        } );
      }
    },
  );

  function removeSession() {
    localStorage.removeItem( 'accessToken' );
    localStorage.removeItem( 'refreshToken' );

    // return update((s) => {
    // 	s.access_token = undefined;
    // 	s.refresh_token = undefined;
    // 	return s;
    // });
  }

  function updateTokens( accessToken: string, refreshToken: string ): void {
    localStorage.setItem( 'accessToken', accessToken );
    localStorage.setItem( 'refreshToken', refreshToken );

    if ( accessToken ) {
      if ( get( userStore ) === undefined ) {
        User.profile().then( ( data ) => {    
          userStore.set( {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            full_name: data.full_name,
          } );
        } );
      }
    }

    return update( ( s ) => {
      s.access_token = accessToken;
      s.refresh_token = refreshToken;
      return s;
    } );
  }

  return {
    subscribe,
    removeSession,
    updateTokens,
    isAuth(): boolean {
      const { access_token, refresh_token } = get( store );
      return !!access_token && !!refresh_token;
    },
  };
}

function createMembersStore() {
  const store = writable<Array<MemberType>>( [] );
  const { subscribe, set } = store;

  function search() {
    return this.loadMembers();
  }
  async function loadMembers() {
    const res: MemberType[] = await User.loadMembers();
    if ( res ) {
      set( res );
    }
  }
  return {
    subscribe,
    set,
    search,
    loadMembers,
  };
}

export const authStore = createAuthStore();
export const userStore = writable<UserType>( {} );
export const membersStore = createMembersStore();
