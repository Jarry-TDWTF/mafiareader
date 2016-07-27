import {
  RECEIVE_GAMES,
  REQUEST_GAMES
} from './actions';

const gamesInitialState = {
  data: undefined,
  fetching: false,
  ready: false,
  error: undefined
};

export function games(state = gamesInitialState, action) {
  switch (action.type) {
    case REQUEST_GAMES:
      return { ...state, fetching: true, ready: false };
    case RECEIVE_GAMES:
      return { ...state,
        fetching: false,
        ready: true,
        data: action.data
      };
    default:
      return state
  }
}