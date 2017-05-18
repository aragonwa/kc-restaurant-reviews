import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import RestaurantReviewsList from './RestaurantReviewsList';

function setup (restaurants) {
  const props = {
    restaurantReviews: (restaurants)?[restaurants] : [],
    activeItem: '1234',
    setActiveItemOnClick: () => {}
  };
  return shallow(<RestaurantReviewsList {...props} />);
}

describe('RestaurantReviewsList', () => {
  it('should have id restaurant-list', () => {
    const wrapper = setup({
      id: '1234',
      businessName: 'My place',
      businessAddress: '1234 Street',
      businessCity: 'Seattle'
    });
    const actual = wrapper.find('#restaurant-list').length;
    const expected = 1;
    expect(actual).to.equal(expected);
  });
   it('should return alert if no restaurants', () => {
    const wrapper = setup();

    const actual = wrapper.find('#restaurant-list .alert').length;
    const expected = 1;
    expect(actual).to.equal(expected);
  });
});
