import { writable } from 'svelte/store';
import type { AlertType, NotifacationType } from '../utils/types';

export const notifacationStore = writable<NotifacationType>( {} );
export const alertStore = writable<AlertType>( {} );
export const isError404 = writable( false );
