import { expect } from 'chai';
import Filters from './Filters';

describe('Filters', () => {
  describe('filterRestaurants', () => {
    it('should filter restaurants by business name', () => {
      // arrange
      const initialState = {
        restaurants: [
          {businessName: 'Subway'},
          {businessName: 'Subway 2'},
          {businessName: "Alberto's tacos"},
          {businessName: 'McDonalds'},
          {businessName: 'Pizza Place'},
          {businessName: 'Coffee Joe'},
          {businessName: 'Salad Sam'}
        ]
      };
      // It ignores case
      const filter = 'SubWay';

      // act
      const result = Filters.filterRestaurants(initialState.restaurants, filter);

      // assert
      expect(result.length).to.equal(2);
    });
  });
  describe('filterPagerItems', () => {
    const initialState = {
      restaurants: [
        {businessName: 'Subway'},
        {businessName: 'The Caviar Shop'},
        {businessName: "Alberto's tacos"},
        {businessName: 'McDonalds'},
        {businessName: 'Pizza Place'},
        {businessName: 'Coffee Joe'},
        {businessName: 'Salad Sam'},
        {businessName: 'The Grand'},
        {businessName: 'Copper'},
        {businessName: 'Rare'},
        {businessName: 'Victory'},
        {businessName: 'Clarity'},
        {businessName: 'Empress'},
        {businessName: 'Simmer'},
        {businessName: 'Down'},
        {businessName: 'Catch'},
        {businessName: 'Bounty'},
        {businessName: 'Hungry'},
        {businessName: 'Canteen'},
        {businessName: 'Beach'},
        {businessName: 'Chamber'},
        {businessName: 'Amber'},
        {businessName: 'Rose'},
        {businessName: 'Saffron'},
        {businessName: 'Afternoon'},
        {businessName: 'Thai'},
        {businessName: 'Bear'},
        {businessName: 'Vineyard'}
      ]
    };
    it('should return the second set of 10 restaurants', () => {
      // arrange
      const pagerNum = '2';
      const expectedResult =
      [{businessName: 'Victory'},
        {businessName: 'Clarity'},
        {businessName: 'Empress'},
        {businessName: 'Simmer'},
        {businessName: 'Down'},
        {businessName: 'Catch'},
        {businessName: 'Bounty'},
        {businessName: 'Hungry'},
        {businessName: 'Canteen'},
        {businessName: 'Beach'}];

      // act
      const result = Filters.filterPagerItems(initialState.restaurants, pagerNum);

      // assert
      expect(result).to.eql(expectedResult);
    });
    it('should return the final set of 8 restaurnts', () => {
      // arrange
      const pagerNum = '3';
      const expectedResult =
      [{businessName: 'Chamber'},
        {businessName: 'Amber'},
        {businessName: 'Rose'},
        {businessName: 'Saffron'},
        {businessName: 'Afternoon'},
        {businessName: 'Thai'},
        {businessName: 'Bear'},
        {businessName: 'Vineyard'}];

      // act
      const result = Filters.filterPagerItems(initialState.restaurants, pagerNum);

      // assert
      expect(result).to.eql(expectedResult);
    });
  });
  describe('shuffle', () =>{
    it('should shuffle array', () => {
      const initialState = {
        restaurants: [
          {businessName: 'Subway'},
          {businessName: 'Subway 2'},
          {businessName: "Alberto's tacos"},
          {businessName: 'McDonalds'},
          {businessName: 'Pizza Place'},
          {businessName: 'Coffee Joe'},
          {businessName: 'Salad Sam'}
        ]
      };
      const copy = initialState.restaurants.slice();
      const result = Filters.shuffle(copy);
      expect(result).to.not.eql(initialState.restaurants);
    });
  });
  describe('alphaSort', () =>{
    it('should sort items aphabetically', () => {
      const initialState = {
        restaurants: [
          {businessName: 'Subway'},
          {businessName: "Alberto's tacos"},
          {businessName: 'McDonalds'},
          {businessName: 'Pizza Place'},
          {businessName: 'Subway 2'},
          {businessName: 'Coffee Joe'},
          {businessName: 'Salad Sam'}
        ]
      };
      const result = Filters.alphaSort(initialState.restaurants);
      expect(result[0].businessName).to.equal("Alberto's tacos");
    });
  });
});
