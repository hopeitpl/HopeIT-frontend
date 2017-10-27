import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import { AppContainer } from 'react-hot-loader';
import Root from 'base/containers/Root';
import configureStore from 'base/redux/configureStore';

const history = createHistory();
const store = configureStore(history);

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component history={history} store={store} />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Root);

if (module.hot) {
  module.hot.accept('base/containers/Root', () => {
    render(Root);
  });
}
