import { withApollo } from "next-apollo";
import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getAccessToken, setAccessToken } from "../accessToken";
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken()
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const tokenRefreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = getAccessToken()
    if(!token){
      return true;
    }

    try {
      const { exp }:any = jwtDecode(token);
      console.log(exp)
      if (Date.now() >= exp * 1000) {
        console.log('expired')
        return false;
      } else {
        console.log('not expired')
        return true;
      }
    } catch {
      return false;
    }

  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_token",{ 
      method: "POST",
      credentials: "include"
    })
  },
  handleFetch: accessToken => {
    setAccessToken(accessToken);
  },
  handleError: err => {
    console.warn('Your refresh token is invalid. Try to relogin');
    console.error(err);
  }
})

const apolloClient = new ApolloClient({
  link: from([tokenRefreshLink, authLink.concat(httpLink)]),
  // link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default withApollo(apolloClient);