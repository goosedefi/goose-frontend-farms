import React, { FC } from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import { API_APE_SWAP_GRAPH } from '../../constants/routes.constants';

const client = new ApolloClient({
  uri: API_APE_SWAP_GRAPH,
  cache: new InMemoryCache(),
});

const ApolloWrap: FC = ({ children }) => (
  <ApolloProvider client={client}>
    {children}
  </ApolloProvider>
);

export default ApolloWrap;
