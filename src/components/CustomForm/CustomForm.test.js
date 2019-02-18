import React from 'react';
import { shallow, mount } from 'enzyme';
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

  describe('handles user interaction', () => {
    it('should register data on input fields', () => {
      const props = {
        showName: true,
        showEmail: true,
        showPassword: true,
        showPwConfirm: true,
        onSubmitAction: jest.fn()
      };
      const wrapper = mount(<CustomForm {...props} />);

      const nameInput = wrapper.find('#name');
      nameInput.instance().value = 'testName';
      nameInput.simulate('change');

      const emailInput = wrapper.find('#email');
      emailInput.instance().value = 'testemail@mail.com';
      emailInput.simulate('change');

      const pwInput = wrapper.find('#password');
      pwInput.instance().value = 'muhpassword';
      pwInput.simulate('change');

      const pwcInput = wrapper.find('#confirmPassword');
      pwcInput.instance().value = 'muhpassword';
      pwcInput.simulate('change');

      wrapper.find('button').simulate('click');
      expect(props.onSubmitAction).toHaveBeenCalledTimes(1);
      expect(props.onSubmitAction).toHaveBeenCalledWith({
        name: 'testName',
        email: 'testemail@mail.com',
        password: 'muhpassword',
        confirmPassword: 'muhpassword'
      });
    });
  });

  describe('validates inputs', () => {
    it('ignores empty inputs when they are not required', () => {
      const props = {
        showName: false,
        showEmail: true,
        showPassword: true,
        showPwConfirm: false,
        onSubmitAction: jest.fn()
      };
      const wrapper = mount(<CustomForm {...props} />);

      const emailInput = wrapper.find('#email');
      emailInput.instance().value = 'testemail@mail.com';
      emailInput.simulate('change');

      const pwInput = wrapper.find('#password');
      pwInput.instance().value = 'muhpassword';
      pwInput.simulate('change');

      wrapper.find('button').simulate('click');
      expect(props.onSubmitAction).toHaveBeenCalledTimes(1);
      expect(props.onSubmitAction).toHaveBeenCalledWith({
        name: '',
        email: 'testemail@mail.com',
        password: 'muhpassword',
        confirmPassword: ''
      });
    });

    it('does not call onSubmitAction when inputs are empty', () => {
      const props = {
        showName: false,
        showEmail: true,
        showPassword: true,
        showPwConfirm: false,
        onSubmitAction: jest.fn()
      };
      const wrapper = mount(<CustomForm {...props} />);

      const emailInput = wrapper.find('#email');
      emailInput.instance().value = 'testemail@mail.com';
      emailInput.simulate('change');

      const pwInput = wrapper.find('#password');
      pwInput.instance().value = '';
      pwInput.simulate('change');

      wrapper.find('button').simulate('click');
      expect(props.onSubmitAction).toHaveBeenCalledTimes(0);
    });

    it('checks password matches confirm password', () => {
      const props = {
        showName: true,
        showEmail: true,
        showPassword: true,
        showPwConfirm: true,
        onSubmitAction: jest.fn()
      };
      const wrapper = mount(<CustomForm {...props} />);

      const nameInput = wrapper.find('#name');
      nameInput.instance().value = 'testName';
      nameInput.simulate('change');

      const emailInput = wrapper.find('#email');
      emailInput.instance().value = 'testemail@mail.com';
      emailInput.simulate('change');

      const pwInput = wrapper.find('#password');
      pwInput.instance().value = 'muhpassword';
      pwInput.simulate('change');

      const pwcInput = wrapper.find('#confirmPassword');
      pwcInput.instance().value = 'notmuhpassword';
      pwcInput.simulate('change');

      wrapper.find('button').simulate('click');
      expect(props.onSubmitAction).toHaveBeenCalledTimes(0);
    });
  });
});
