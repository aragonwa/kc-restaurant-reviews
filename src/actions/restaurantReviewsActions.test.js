import { expect } from 'chai';
import * as types from '../constants/actionTypes';
import * as actions from './restaurantReviewsActions';
import fetchMock from 'fetch-mock';

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

describe('Restaurant Reviews Actions', () => {
  it('should create an action to update a filter', () => {
    const filterText = 'dog';
    const expectedAction = {
      type: types.UPDATE_FILTER,
      value: filterText,
      pagerNum: 1,
      initialLoad: false
    };
    expect(actions.updateSearchTerm(filterText)).to.eql(expectedAction);
  });
   it('should create an action to set an Active Item', () => {
    const id = '1234';
    const scroll = true;
    const expectedAction = {
      type: types.SET_ACTIVE_ITEM,
      id,
      scroll
    };
    expect(actions.setActiveItem(id, scroll)).to.eql(expectedAction);
  });
  it('should create an action to increase Pager Num', () => {
    const value = '3';
    const expectedAction = {
      type: types.INCREASE_PAGER_NUM,
      value
    };
    expect(actions.increasePagerNum(value)).to.eql(expectedAction);
  });
  it('should create an action to decrease Pager Num', () => {
    const value = '1';
    const expectedAction = {
      type: types.DECREASE_PAGER_NUM,
      value
    };
    expect(actions.decreasePagerNum(value)).to.eql(expectedAction);
  });

  //https://github.com/chaijs/chai/issues/842
  const middleware  = [thunk];
  const mockStore = configureMockStore(middleware);
  describe('Async Actions', () => {
    afterEach(() => {
      fetchMock.restore();
    });

    it('should create LOADING_RESTAURANTS and LOAD_RESTAURANTS_SUCCESS', () => {
      fetchMock.get('*', []);

      const expectedActions = [
        {type: types.LOADING_RESTAURANTS, isLoading: true},
        {type: types.LOAD_RESTAURANTS_SUCCESS, restaurants: [], isloading: false}
      ];
      const store = mockStore({restaurants:[]});
      return store.dispatch(actions.loadRestaurants()).then(()=>{
        expect(...store.getActions()).to.eql(...expectedActions);
      });
    });
    it('should create LOADING_RESTAURANTS and LOAD_RESTAURANTS_FAIL', () => {
      fetchMock.get('*', {status:401});

      const store = mockStore({restaurants:[]});
      return store.dispatch(actions.loadRestaurants()).then(()=>{
        expect(store.getActions()[1]).to.include.keys('error');
      });
    });
  });
});
