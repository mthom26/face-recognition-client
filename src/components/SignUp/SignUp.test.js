import React from 'react';
import { shallow } from 'enzyme';
import '../../setupEnzyme';

import SignUp from './SignUp';

describe('SignUp Component', () => {
  it('renders SignUp component', () => {
    expect(shallow(<SignUp />)).toMatchSnapshot();
  });
});
