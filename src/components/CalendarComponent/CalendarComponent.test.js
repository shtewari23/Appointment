import React from 'react';
import { shallow } from 'enzyme';
import CalendarComponent from './CalendarComponent';

describe('<CalendarComponent />', () => {
  test('renders', () => {
    const wrapper = shallow(<CalendarComponent />);
    expect(wrapper).toMatchSnapshot();
  });
});
