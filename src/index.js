// @flow
import * as React from 'react';

export type Notification = {
  kind: 'warning' | 'notification' | 'error' | 'success',
  message: string,
  id: string | number,
  expires?: number // ms
};

export type NotificationContext = {
  notifications: Array<Notification>,
  dispatch: Function,
  expire: Function
};

// typedef pending https://github.com/facebook/flow/pull/5920
export const Context = React.createContext({
  notifications: [],
  dispatch: () => {},
  expire: () => {}
});

type Props = {
  children: React.Node,
  defaultExpires?: number, // ms
  defaultKind?: 'warning' | 'notification' | 'error' | 'success'
};

type State = NotificationContext;

export class Provider extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      notifications: [],
      dispatch: this.dispatch,
      expire: this.expire
    };
  }

  // eslint-disable-next-line consistent-return
  dispatch = ({ id, message, kind, expires }: Notification) => {
    if (this.state.notifications.find((notif) => notif.id === id)) return null;

    if (!id) id = new Date().getUTCMilliseconds();

    const notificationExpires = expires || this.props.defaultExpires;
    if (notificationExpires) {
      setTimeout(() => this.expire(id), notificationExpires);
    }

    const update = [...this.state.notifications].concat([
      ({
        id,
        message,
        expires: notificationExpires,
        kind: kind || this.props.defaultKind || 'notification'
      }: Notification)
    ]);

    this.setState({ notifications: update });
  };

  expire = (id: string | number) => {
    const update = [...this.state.notifications].filter(
      (notif) => notif.id !== id
    );

    this.setState({ notifications: update });
  };

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const withNotifications = (Component: React$Element<*>) => (
  props: *
) => (
  <Context.Consumer>
    {(notificationContext) => <Component {...notificationContext} {...props} />}
  </Context.Consumer>
);

export const Composer = () => (
  <div className="notification-composer">
    <Context.Consumer>
      {({ notifications, expire }) =>
        notifications.map(({ kind, message, id }) => (
          <div
            key={id}
            className={['notification', `notification--status-${kind}`].join(
              ' '
            )}
          >
            <span>{message}</span>
            {expire && <button onClick={() => expire(id)}>Dismiss</button>}
          </div>
        ))
      }
    </Context.Consumer>
  </div>
);
