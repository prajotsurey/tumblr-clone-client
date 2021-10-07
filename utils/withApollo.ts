import { withApollo } from "next-apollo";
import { ApolloClient, createHttpLink, from, InMemoryCache } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { getAccessToken, setAccessToken } from "../accessToken";
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwtDecode from 'jwt-decode';
import { PaginatedPostsQuery, PaginatedPostsResponse } from "../generated/graphql";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
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
      if (Date.now() >= exp * 1000) {
        return false;
      } else {
        return true;
      }
    } catch {
      return false;
    }

  },
  fetchAccessToken: () => {
    return fetch(process.env.NEXT_PUBLIC_REFRESH_URL as string,{ 
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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          paginatedPosts: {
            keyArgs: [],
            merge(
              existing: PaginatedPostsResponse | undefined,
              incoming: PaginatedPostsResponse
              ): PaginatedPostsResponse{
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming?.posts]
                }
            }
          }
        }
      }
    }
  }),
});

export default withApollo(apolloClient);