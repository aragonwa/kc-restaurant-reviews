import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import DetailsViolationRow from './DetailsViolationRow';

function setup () {
  const props = {
    violation: {
      violationType: 'red',
      violationDescr:'Bad food'
    },
    index: '1234',
    updateFilter: () => {},
    pagerNum: 1,
    setActiveItem: false
  };
  return shallow(<DetailsViolationRow {...props} />);
}
describe('DetailsViolationRow', () => {
  it('should return a tr with {collapse+index} for class', () => {
    const wrapper = setup();
    const actual = wrapper.find('tr').length;
    const className = wrapper.find('.1234').length;
    const expected = 1;
    expect(actual).to.equal(expected);
    expect(className).to.equal(expected);
  });
  it('should return a red violation', () => {
    const wrapper = setup();
    const actual = wrapper.find('.fa-color-danger').length;
    const expected = 1;
    expect(actual).to.equal(expected);
  });
});
