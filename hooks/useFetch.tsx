// Based on https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/
import { useEffect, useRef, useReducer } from 'react';

interface Options {
  method: string;
  body?: string;
}
export interface Song {
  id: string;
  title: string;
  artist: string;
  images: string;
  level: number;
  search: string;
}
interface State {
  status: string;
  fetching: boolean;
  error?: Object;
  data: {
    songs: Song[];
  };
}

const initialState = {
  status: 'idle',
  fetching: false,
  error: null,
  data: [],
};

const useFetchReducer = (
  state: State,
  action: { type: string; payload?: State }
) => {
  switch (action.type) {
    case 'FETCHING':
      return { ...initialState, status: 'fetching', fetching: true };
    case 'FETCHED':
      return {
        ...initialState,
        status: 'fetched',
        data: action.payload,
        fetching: false,
      };
    case 'FETCH_ERROR':
      return {
        ...initialState,
        status: 'error',
        error: action.payload,
        fetching: false,
      };
    default:
      return state;
  }
};

const defaultOptions = {
  method: 'GET',
};

export const useFetch = (url: string, options: Options = defaultOptions) => {
  const cache = useRef({});
  const [state, dispatch] = useReducer(useFetchReducer, initialState);

  useEffect(() => {
    let cancelRequest = false;
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({ type: 'FETCHED', payload: data });
      } else {
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          if (options.method === 'GET') {
            cache.current[url] = data;
            if (cancelRequest) return;
            dispatch({ type: 'FETCHED', payload: data });
          }
        } catch (error) {
          if (cancelRequest) return;
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    };

    fetchData();

    return function cleanup() {
      cancelRequest = true;
    };
  }, [url, options]);

  return state;
};
