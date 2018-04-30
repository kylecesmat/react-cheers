import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from '../src';

describe('Provider', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Provider>Child</Provider>);

    expect(wrapper).toMatchSnapshot();
  });
});
