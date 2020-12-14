import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createUploadLink } from "apollo-upload-client";
import React from "react";

interface Props {
  Component: React.ComponentClass;
  pageProps: React.PropsWithChildren<any>;
}

const uploadLink = createUploadLink({
  credentials: "include",
  uri: "/api",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: uploadLink,
});

const _app = (props: Props) => {
  return (
    <ApolloProvider client={client}>
      <props.Component {...props.pageProps}></props.Component>
    </ApolloProvider>
  );
};

export default _app;
