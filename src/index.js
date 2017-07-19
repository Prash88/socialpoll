// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo';
import 'tachyons';

const networkInterface = createNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj493hfz1qdgt0141s8myc5so'
});

// use the auth0IdToken in localStorage for authorized requests
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      // get the authentication token from local storage if it exists
      if (localStorage.getItem('auth0IdToken')) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem(
          'auth0IdToken'
        )}`;
      }
      next();
    }
  }
]);

const client = new ApolloClient({ networkInterface });

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);

registerServiceWorker();
