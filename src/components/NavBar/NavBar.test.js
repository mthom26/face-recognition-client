import React from 'react';
import { shallow } from 'enzyme';
import '../../setupEnzyme';

import NavBar from './NavBar';

describe('NavBar', () => {
  it('renders with user logged in', () => {
    const wrapper = shallow(<NavBar loggedIn={true} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('renders without user logged in', () => {
    const wrapper = shallow(<NavBar loggedIn={false} />);
    expect(wrapper).toMatchSnapshot();
  });
});
