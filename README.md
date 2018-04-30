<img src="https://raw.githubusercontent.com/kylecesmat/react-cheers/master/cheers.gif" width=550>

# React Cheers

A zero-dependency, extensible notification system built with the React 16.3 Context API.

## Installation

1.  `npm install --save react-cheers`

2.  Install `Provider` & `Composer` component as early as possible.

```js
import { Provider, Composer } from 'react-cheers';

const App = (
  <Fragment>
    <Provider>
      <MyApplication />
      <Composer />
    </Provider>
  </Fragment>
);

reactDom.render(<App>);
```

3.  Access the notifications state & actions from within any component in your React tree using either:

* Option 1: Use the `withNotifications` HoC to automatically pass all context props to your component.

```js
import { withNotifications } from 'react-cheers'

const MyComponent = ({
  notifications<Array>,
  expire<Function>
  dispatch<Function>
  }) => (
    <button onClick={dispatch(notification<Notification>)}>Send!</button>
  );

export default withNotifications(MyComponent);
```

* Option 2: Access the `Context` directly to select specific props. [React Context](https://reactjs.org/docs/context.html) uses "render props" to emit state.

```js
import { Context as NotificationContext } from 'react-cheers'

const MyComponent = () => (
  <NotificationContext>
    {({
        notifications<Array>,
        expire<Function>
        dispatch<Function>
    }) => (
      <button onClick={dispatch(notification<Notification>)}>Send!</button>
    )}
  </NotificationContext>
);

export default MyComponent;
```

## Usage

### Notification

A notification object is made up of the following parameters.

* _`kind : enum('notification', 'success', 'error', 'warning')`_ - Denotes the kind of notification, primarily used for styling
* _`message : string`_ - The message contents
* _`id (optional) : number | string`_ - Optionally specify an ID. If null, falls back to dateTime. (NOTE: This library prevents dispatching notifications with duplicate Ids)
* _`expires (optional) : number`_ - The time in `ms` until notification is expired. If `null`, notification will not auto-dismiss.

### Props

This library provides three primary mechanisms for interacting with notifications.

* _`notifications : Array<Notification>`_ - The array of current notifications
* _`dispatch(Notification) : Function`_ - The action to create/dispatch a new notification
* _`expire(Id) : Function`_ - the action to expire/dismiss/destroy a notification

## Configuration Options

* `defaultExpires` can specify a default expires time for all notifications
* `defaultKind` can specify a default "kind"

```js
<Provider defaultExpires={8000} defaultKind={'error'}>
```

## Contributing

WIP

## Tests

WIP
