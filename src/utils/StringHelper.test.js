import { expect } from 'chai';
import StringHelper from './StringHelper';

describe('StringHelper', () => {
  describe('capitalCase', () => {
    it('should return a string formated for capitalCase', () => {
      const restaurantName = "my great place";
      const expected = "My Great Place";

      const result = StringHelper.capitalCase(restaurantName);
      expect(result).to.equal(expected);
    });
  });
  describe('phoneNumFormat', () => {
    it('should check if phone exists', () => {
      const phone = '';
      const expected = '';

      const result = StringHelper.phoneNumFormat(phone);
      expect(result).to.equal(expected);
    });
    it('should format phone number', () => {
      const phone = '1234567890';
      const expected = '(123) 456-7890';

      const result = StringHelper.phoneNumFormat(phone);
      expect(result).to.equal(expected);
    });
  });
});
