export const REQUEST_GAMES = 'REQUEST_GAMES';
export const RECEIVE_GAMES = 'RECEIVE_GAMES';

export const SELECT_GAME = 'SELECT_GAME';
export const REQUEST_GAME_INFO = 'REQUEST_GAME_INFO';
export const RECEIVE_GAME_INFO = 'RECEIVE_GAME_INFO';

function httpGetAsync(theUrl, callback)
{
  var xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
      callback(JSON.parse(xmlHttp.responseText));
  };

  xmlHttp.open("GET", theUrl, true); // true for asynchronous
  xmlHttp.send(null);
}

export const setCurrentGame = (game) => ({
  type: SELECT_GAME,
  data: game
});

export const requestGames = () => ({
  type: REQUEST_GAMES
});

export const receiveGames = (data) => ({
  type: RECEIVE_GAMES,
  data
});

export const fetchGames = () => {
  return (dispatch, getState) => {
    dispatch(requestGames());
    httpGetAsync('games/',(data) => {
      dispatch(receiveGames(data));
      dispatch(fetchGameInfo(data[0].id));
    });
  };
};

export const requestPosts = () => ({
  type: REQUEST_GAME_INFO
});

export const receiveGameInfo = (data) => ({
  type: RECEIVE_GAME_INFO,
  data
});

export const fetchGameInfo = (gameId) => {
  return (dispatch, getState) => {
    dispatch(requestPosts());
    httpGetAsync(`games/${gameId}`,(data) => {
      dispatch(receiveGameInfo(data));
    });
  };
};