import * as React from 'react';
import { Checkbox, Radio, Select } from '@patternfly/react-core';
import { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import QueryOptionsDropdown, { QueryOptionsDropdownProps, QueryOptionsPanel } from '../query-options-dropdown';

describe('<QueryOptionsDropdown />', () => {
  const props: QueryOptionsDropdownProps = {
    recordType: 'allConnections',
    showDuplicates: true,
    allowFlow: true,
    allowConnection: true,
    allowShowDuplicates: true,
    allowPktDrops: true,
    useTopK: false,
    limit: 100,
    match: 'all',
    packetLoss: 'all',
    setLimit: jest.fn(),
    setMatch: jest.fn(),
    setPacketLoss: jest.fn(),
    setShowDuplicates: jest.fn(),
    setRecordType: jest.fn()
  };
  it('should render component', async () => {
    const wrapper = shallow(<QueryOptionsDropdown {...props} />);
    expect(wrapper.find(QueryOptionsDropdown)).toBeTruthy();
    expect(wrapper.find(Select)).toBeTruthy();
  });
});

describe('<QueryOptionsPanel />', () => {
  const props: QueryOptionsDropdownProps = {
    recordType: 'allConnections',
    showDuplicates: true,
    allowFlow: true,
    allowConnection: true,
    allowShowDuplicates: true,
    allowPktDrops: true,
    useTopK: false,
    limit: 100,
    match: 'all',
    packetLoss: 'all',
    setLimit: jest.fn(),
    setMatch: jest.fn(),
    setPacketLoss: jest.fn(),
    setShowDuplicates: jest.fn(),
    setRecordType: jest.fn()
  };
  beforeEach(() => {
    props.setLimit = jest.fn();
    props.setShowDuplicates = jest.fn();
    props.setMatch = jest.fn();
  });
  it('should render component', async () => {
    const wrapper = shallow(<QueryOptionsPanel {...props} />);
    expect(wrapper.find('.pf-c-select__menu-group').length).toBe(5);
    expect(wrapper.find('.pf-c-select__menu-group-title').length).toBe(5);
    expect(wrapper.find(Radio)).toHaveLength(12);

    //setOptions should not be called at startup, because it is supposed to be already initialized from URL
    expect(props.setLimit).toHaveBeenCalledTimes(0);
    expect(props.setShowDuplicates).toHaveBeenCalledTimes(0);
    expect(props.setMatch).toHaveBeenCalledTimes(0);
  });
  it('should set options', async () => {
    const wrapper = shallow(<QueryOptionsPanel {...props} />);
    expect(props.setLimit).toHaveBeenCalledTimes(0);
    expect(props.setShowDuplicates).toHaveBeenCalledTimes(0);
    expect(props.setMatch).toHaveBeenCalledTimes(0);

    act(() => {
      wrapper.find('#show-duplicates').find(Checkbox).props().onChange!(true, {} as React.FormEvent<HTMLInputElement>);
    });
    expect(props.setLimit).toHaveBeenCalledTimes(0);
    expect(props.setShowDuplicates).toHaveBeenNthCalledWith(1, false);
    expect(props.setMatch).toHaveBeenCalledTimes(0);

    act(() => {
      wrapper.find('#limit-1000').find(Radio).props().onChange!(true, {} as React.FormEvent<HTMLInputElement>);
    });
    expect(props.setLimit).toHaveBeenNthCalledWith(1, 1000);
    expect(props.setShowDuplicates).toHaveBeenNthCalledWith(1, false);
    expect(props.setMatch).toHaveBeenCalledTimes(0);
    wrapper.setProps({ ...props, limit: 1000 });

    act(() => {
      wrapper.find('#match-any').find(Radio).props().onChange!(true, {} as React.FormEvent<HTMLInputElement>);
    });
    expect(props.setLimit).toHaveBeenNthCalledWith(1, 1000);
    expect(props.setShowDuplicates).toHaveBeenNthCalledWith(1, false);
    expect(props.setMatch).toHaveBeenNthCalledWith(1, 'any');
  });
});
