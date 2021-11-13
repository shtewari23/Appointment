import React from 'react';
import { shallow } from 'enzyme';
import ReminderListComponent from './ReminderListComponent';

describe('<rem />', () => {
  test('renders', () => {
    const wrapper = shallow(<ReminderListComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
