// Based on https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/
import { useEffect, useRef, useReducer, useCallback } from 'react';

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
export interface Favorite {
  id: string;
  songId: string;
}
interface State {
  status: string;
  fetching: boolean;
  error?: Object;
  data?: Song[] | Favorite[];
}

const initialState = {
  status: 'idle',
  fetching: false,
  error: null,
  data: [],
};

const reducer = (
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
  const [state, dispatch] = useReducer(reducer, initialState);


  const fetchData = useCallback(
    async () => {
      dispatch({ type: 'FETCHING' });
      if (cache.current[url]) {
        const data = cache.current[url];
        dispatch({ type: 'FETCHED', payload: data });
      } else {
        try {
          const response = await fetch(url, options);
          const data = await response.json();
          cache.current[url] = data;
          dispatch({ type: 'FETCHED', payload: data });
        } catch (error) {
          dispatch({ type: 'FETCH_ERROR', payload: error.message });
        }
      }
    }, [url, options]);

  useEffect(() => {
    fetchData();
  }, [url, options, fetchData]);

  return { state, fetchData };
};
