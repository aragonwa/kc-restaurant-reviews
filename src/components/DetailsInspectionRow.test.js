import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import DetailsInspectionRow from './DetailsInspectionRow';

function setup (violations) {
  const props = {
    inspection: {
    violations},
    inspectionIndex: '1234',
    inspectionType: 129,
    formatDate: () => {
    }
  };
  return mount(<DetailsInspectionRow {...props} />);
}
describe('DetailsInspectionRow', () => {
  it('should create two violation rows', () => {
    const wrapper = setup([{
      violationType: 'red',
      violationDescr: 'Bad food'
    },
      {
        violationType: 'red',
        violationDescr: 'Bad food'
      }
    ]);
    const actual = wrapper.find('.fa-color-danger').length;
    const expected = 2;
    expect(actual).to.equal(expected);
  });
  it('should not create violation row', () => {
    const wrapper = setup([]);
    const actual = wrapper.find('.fa-color-danger').length;
    const expected = 0;
    expect(actual).to.equal(expected);
  });
  it('should open inspection row on click', () => {
    const wrapper = setup([{
      violationType: 'red',
      violationDescr: 'Bad food'
    },
      {
        violationType: 'red',
        violationDescr: 'Bad food'
      }
    ]);
    wrapper.find('tr[data-toggle]').simulate('click');
    const actual = wrapper.find('.fa-minus').length;
    const expected = 1;
    expect(actual).to.equal(expected);
  });
});
