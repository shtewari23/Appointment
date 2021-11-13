import React from 'react';
import { shallow } from 'enzyme';
import ReminderPopOverComponent from './ReminderPopOverComponent';

describe('<ReminderPopOverComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<ReminderPopOverComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
