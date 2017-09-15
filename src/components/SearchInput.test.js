import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import SearchInput from './SearchInput';

function setup (searchTerm) {
  const props = {
    searchTerm,
    updateSearchTerm: () => {},
    history: {
      push: () => {}
    }
  };

  return shallow(<SearchInput {...props} />);
}

describe('SearchInput', () => {
  it('Value of input is cat', () => {
    const wrapper = setup('cat');
    const actual = wrapper.find('input').props().value;
    const expected = 'cat';
    expect(actual).to.equal(expected);
  });
  it('Value of input should be dog and show button', () => {
    const wrapper = setup('cat');
    wrapper.find('input').simulate('change', {target: {value:'dog'}});
     const actual = wrapper.find('input').props().value;
    const expected = 'dog';
    expect(actual).to.equal(expected);
    expect(wrapper.find('.btn-danger').length).to.equal(1);
  });
  it('Clear clears input val and removes clear search btn', () => {
    const wrapper = setup('cat');
    wrapper.find('.btn-danger').simulate('click');
    const actual = wrapper.find('input').props().value;
    const expected = '';
    expect(actual).to.equal(expected);
    expect(wrapper.find('.btn-danger.btn-xs.hidden').length).to.equal(1);
  });
});
