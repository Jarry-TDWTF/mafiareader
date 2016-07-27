import isoFetch from 'isomorphic-fetch';

function isBrowser() {
  return typeof __IS_BROWSER__ !== typeof undefined;
}

function getBrowserUrl(url) {
  return `${location.protocol}//${location.host}/${url}`;
}

function apiFetch(url, options) {
  const finalUrl = isBrowser() ? getBrowserUrl(url) : `http://localhost:3000/${url}`; //TODO: add url
  return isoFetch(finalUrl, options);
}

const defaultCallbacks = {
  shouldFetch: () => true,
  decorateResponse: (response) => response
};

function getRequestOptions(method, params) {
  const options = { method };

  if (method === 'POST' || method === 'PUT') {
    if (params.file) {
      options.body = new FormData();

      Object.keys(params).forEach((key) => {
        if (key !== 'file') {
          options.body.append(key, params[key]);
        } else {
          options.body.append(params[key].name, params[key].file);
        }
      });
    } else {
      options.headers = new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json'
      });
      options.body = JSON.stringify(params);
    }
  }

  return options;
}

function getUrl(path, params, resurceId) {
  let url = (typeof(path) === 'string') ? path : path(params);
  url += (resurceId) ? `/${resurceId}` : '';
  return url;
}

function doFetch(url, params, options, request, response, error, decorator) {
  return dispatch => {
    dispatch(request());
    return apiFetch(url, options)
      .then(data => data.json())
      .then(json => dispatch(response((decorator) ? decorator(json, params) : json)))
      .catch((err) => dispatch(error(err)));
  };
}

export function asyncFetch(actions, path, callbacks) {
  const request = () => ({ type: actions.request });
  const receive = (data) => ({ type: actions.receive, data });
  const error = (err) => ({ type: actions.error, error: err });
  const updateRequest = () => ({ type: actions.updateRequest });
  const updateReceive = (data) => ({ type: actions.updateReceive, data });
  const createRequest = () => ({ type: actions.createRequest });
  const createReceive = (data) => ({ type: actions.createReceive, data });

  const cb = {
    ...defaultCallbacks,
    ...callbacks
  };
  return {
    fetch: (params = {}, force = false) => (dispatch, getState) => {
      const url = getUrl(path, params);
      const options = getRequestOptions('GET', params);
      if (force || cb.shouldFetch(getState(), params)) {
        return dispatch(doFetch(url, params, options, request,
          receive, error, cb.decorateResponse));
      }
      return Promise.resolve();
    },
    update: (resourceId, params = {}) => (dispatch) => {
      const url = getUrl(path, params, resourceId);
      const options = getRequestOptions('PUT', params);
      return dispatch(doFetch(url, params, options, updateRequest, updateReceive, error));
    },
    create: (params = {}) => (dispatch) => {
      const url = getUrl(path, params);
      const options = getRequestOptions('POST', params);
      return dispatch(doFetch(url, params, options, createRequest, createReceive, error));
    }
  };
}
