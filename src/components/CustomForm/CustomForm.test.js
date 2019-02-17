import React from 'react';
import { shallow } from 'enzyme';
import '../../setupEnzyme';

import CustomForm from './CustomForm';

describe('CustomForm', () => {
  describe('displays correct inputs', () => {
    it('renders correctly for signup', () => {
      const props = {
        showName: true,
        showEmail: true,
        showPassword: true,
        showPwConfirm: true
      };
      const wrapper = shallow(<CustomForm {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders correctly for login', () => {
      const props = {
        showName: false,
        showEmail: true,
        showPassword: true,
        showPwConfirm: false
      };
      const wrapper = shallow(<CustomForm {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
