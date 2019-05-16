import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from 'mobx-react';
import Store from 'store';
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider } from 'react-apollo'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  renderHead() {
    return (
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
        />
      </Head>
    );
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        {this.renderHead()}
        <CssBaseline />
        <Provider {...Store}>
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);