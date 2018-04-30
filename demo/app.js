import './app.css';
import '../src/default-styles.css';
import { Provider, Composer, withNotifications } from '../src/index';
import * as React from 'react';
import * as ReactDom from 'react-dom';

const initialState = {
  kind: 'notification',
  message: 'This is a notification!',
  expires: 5000
};

class Demo extends React.Component {
  state = initialState;

  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <h1 style={{ marginBottom: '20px' }}>React-Cheers</h1>
        <textarea
          style={{ marginBottom: '20px' }}
          placeholder="message"
          value={this.state.message}
          onChange={({ target: { value } }) =>
            this.setState({ message: value })
          }
        />
        <input
          style={{ marginBottom: '20px' }}
          placeholder="expires"
          value={this.state.expires}
          onChange={({ target: { value } }) =>
            this.setState({ expires: value })
          }
        />
        <select
          style={{ marginBottom: '20px' }}
          value={this.state.kind}
          onChange={({ target: { value } }) => this.setState({ kind: value })}
        >
          <option value="notification">Notification</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
          <option value="error">Error</option>
        </select>
        <button
          style={{ marginBottom: '20px' }}
          onClick={() => {
            this.props.dispatch(this.state);
            this.setState({ ...initialState });
          }}
        >
          Dispatch Notification
        </button>
      </div>
    );
  }
}

const ConnectedDemo = withNotifications(Demo);

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Provider>
          <ConnectedDemo />
          <Composer />
        </Provider>
      </React.Fragment>
    );
  }
}

ReactDom.render(<App />, document.getElementById('content'));
