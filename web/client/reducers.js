import {
  RECEIVE_GAMES,
  REQUEST_GAMES,
  SELECT_GAME,
  REQUEST_GAME_INFO,
  RECEIVE_GAME_INFO
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
  posts: [],
  topics: {}
};

export function currentGame(state = currentGameInitialState, action) {
  switch (action.type) {
    case RECEIVE_GAMES:
      return {...state, id:action.data[0].id, name:action.data[0].name};
    case SELECT_GAME:
      return {...state, id:action.data.id, name:action.data.name};
    case REQUEST_GAME_INFO:
      return {...state, fetching:true, ready: false};
    case RECEIVE_GAME_INFO:
      return { ...state,
        fetching: false,
        ready: true,
        posts: action.data.posts,
        topics: action.data.topics
      };
    default:
      return state;
    }
};