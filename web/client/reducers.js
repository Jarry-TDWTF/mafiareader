import {
  RECEIVE_GAMES,
  REQUEST_GAMES,
  SELECT_GAME,
  REQUEST_POSTS,
  RECEIVE_POSTS
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
      return state;
  }
}

const currentGameInitialState = {
  fetching: false,
  ready: false,
  id: undefined,
  name: "",
  posts: []
};

export function currentGame(state = currentGameInitialState, action) {
  switch (action.type) {
    case SELECT_GAME:
      return {...state, id:action.data.id, name:action.data.name};
    case REQUEST_POSTS:
      return {...state, fetching:true, ready: false};
    case RECEIVE_POSTS:
      return { ...state,
        fetching: false,
        ready: true,
        posts: action.data
      };
    default:
      return state;
    }
};