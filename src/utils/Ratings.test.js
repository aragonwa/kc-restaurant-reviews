import { expect } from 'chai';
import Ratings from './Ratings';

describe('Ratings', () => {
  describe('getRatings', () => {
    it('should return okay when rating is 3', () => {
      const expectedResult = {
        img: 'okay',
        string: 'Okay'
      };
      const result = Ratings.getRatings(3);

      // assert
      expect(result).to.eql(expectedResult);
    });
  });
});
