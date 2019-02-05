import React from 'react';
import { shallow } from 'enzyme';
import '../../setupEnzyme';

import Login from './Login';

describe('Login Component', () => {
  it('renders Login component', () => {
    expect(shallow(<Login />)).toMatchSnapshot();
  });
});
