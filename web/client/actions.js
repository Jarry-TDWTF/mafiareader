import {asyncFetch} from './utils'

export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';

const actions = {
  request: REQUEST_GAMES,
  receive: RECEIVE_GAMES,
  updateRequest: ()=>{},
  updateReceive: ()=>{},
  createRequest: ()=>{},
  createReceive: ()=>{},
  error: ()=>{}
};

const callbacks = {
  shouldFetch: (state) => (!state.games.data || !state.games.data.length)
};

const games = asyncFetch(actions, 'customers', callbacks);

export const fetchGames = games.fetch;