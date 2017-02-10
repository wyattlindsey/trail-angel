import listingsReducer from '../listings-reducer';
import actionTypes from '../../actions/action-types';
import searchResultsData
  from '../../../__tests__/fixtures/search-results-detailed';
import homeData from '../../../__tests__/fixtures/home-data';

const initialState = {
  isFetching: false,
  isFetchCancelled: false,
  cache: {},
  searchResults: [],
  homeData: [],
  favorites:[]
};

describe('listingsReducer', () => {
  let cache = {};

  cache[homeData[0].id] = homeData[0];

  it('submits search', () => {
    expect(listingsReducer(initialState, { type: actionTypes.SUBMIT_SEARCH })).toMatchSnapshot();
  });

  it('receives search results', () => {
    expect(listingsReducer(initialState,
      {
        type: actionTypes.RECEIVE_SEARCH_RESULTS,
        searchResults: searchResultsData
      }
    )).toMatchSnapshot();
  });

  it('cancels request', () => {
    expect(listingsReducer(initialState, { type: actionTypes.CANCEL_REQUEST })).toMatchSnapshot();
  });

  it('loads home data', () => {
    expect(listingsReducer(initialState,
      {
        type: actionTypes.LOAD_HOME_DATA,
        data: homeData
      }
    )).toMatchSnapshot();
  });

  it('loads favorites', () => {
    expect(listingsReducer(initialState,
      {
        type: actionTypes.LOAD_FAVORITES,
        favorites: []
      }
    )).toMatchSnapshot();
  });

  it('adds favorite', () => {
    expect(listingsReducer({
        ...initialState,
        cache
      },
      {
        type: actionTypes.ADD_FAVORITE,
        id: homeData[0].id
      })).toMatchSnapshot();
  });

  it('removes favorite', () => {
    expect(listingsReducer({
        ...initialState,
        cache
      },
      {
        type: actionTypes.REMOVE_FAVORITE,
        id: homeData[0].id
      })).toMatchSnapshot();
  });

  it('saves to storage', () => {
    expect(listingsReducer({
      ...initialState
    },
    {
      type: actionTypes.SAVE_TO_STORAGE,
      data: homeData[0]
    })).toMatchSnapshot();
  });

  it('removes from storage', () => {
    expect(listingsReducer({
        ...initialState,
        cache
      },
      {
        type: actionTypes.REMOVE_FROM_STORAGE,
        id: homeData[0].id
      })).toMatchSnapshot();
  });

  it('loads all listings from storage', () => {
    expect(listingsReducer(initialState,
      {
        type: actionTypes.LOAD_LISTINGS_FROM_STORAGE,
        listings: homeData
      })).toMatchSnapshot();
  });

  it('clears all listings from storage', () => {
    expect(listingsReducer({
      ...initialState,
      cache
    },
    {
      type: actionTypes.CLEAR_ALL_FROM_STORAGE
    })).toMatchSnapshot();
  });
});