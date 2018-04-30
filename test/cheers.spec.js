import React from 'react';
import { shallow } from 'enzyme';
import { Provider, Composer } from '../src';

describe('Provider', () => {
  it('should pass state to the value', () => {
    const wrapper = shallow(
      <Provider>
        <div />
      </Provider>
    );

    expect(wrapper.prop('value').notifications).toEqual([]);
    expect(typeof wrapper.prop('value').dispatch).toEqual('function');
    expect(typeof wrapper.prop('value').expire).toEqual('function');
  });

  it('should add a notification to state', () => {
    const wrapper = shallow(
      <Provider defaultExpires={8000}>
        <div />
      </Provider>
    );

    wrapper.prop('value').dispatch({ message: 'Yo dawg', id: 'foo' });
    wrapper.update();

    expect(wrapper.prop('value').notifications).toEqual([
      { expires: 8000, id: 'foo', kind: 'notification', message: 'Yo dawg' }
    ]);
  });

  it('should remove a notification from state', () => {
    const id = '12345';
    const wrapper = shallow(
      <Provider>
        <div />
      </Provider>
    );

    wrapper.prop('value').dispatch({ message: 'Yo dawg', id });
    wrapper.update();

    expect(wrapper.prop('value').notifications).toEqual([
      { expires: undefined, id, kind: 'notification', message: 'Yo dawg' }
    ]);

    wrapper.prop('value').expire(id);
    wrapper.update();

    expect(wrapper.prop('value').notifications).toEqual([]);
  });

  it('should not allow a notification with the same id', () => {
    const id = '12345';
    const wrapper = shallow(
      <Provider>
        <div />
      </Provider>
    );

    wrapper.prop('value').dispatch({ message: 'Yo dawg', id });
    wrapper.update();

    expect(wrapper.prop('value').notifications).toEqual([
      { expires: undefined, id, kind: 'notification', message: 'Yo dawg' }
    ]);

    wrapper.prop('value').dispatch({ message: 'Howdy', id });
    wrapper.update();

    expect(wrapper.prop('value').notifications).toEqual([
      { expires: undefined, id, kind: 'notification', message: 'Yo dawg' }
    ]);
  });

  it('If `Id` is omitted, a random Id is assigned', () => {
    const wrapper = shallow(
      <Provider>
        <div />
      </Provider>
    );

    wrapper.prop('value').dispatch({ message: 'Yo dawg' });
    wrapper.render();
    wrapper.prop('value').dispatch({ message: 'Howdy' });
    wrapper.update();

    const [notif1, notif2] = wrapper.prop('value').notifications;

    expect(notif1.id === notif2.id).toBeFalsy();
  });
});

describe('Composer', () => {
  it('accept a className prop', () => {
    const wrapper = shallow(<Composer className="foo" />);

    expect(wrapper).toMatchSnapshot();
  });
});
