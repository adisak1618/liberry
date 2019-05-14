import React from 'react';
import 'typeface-roboto';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MainDocument extends Document {
  static getInitialProps({ renderPage }) {
    // Returns an object like: { html, head, errorHtml, chunks, styles }     
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="th">
        <Head>
          <meta charSet="utf-8" />
          <meta name="description" content="สนับสนุนแนวคิดที่ใช่ สินค้าที่คุณชอบ เปิดมุมมองใหม่ของการลงทุนในรูปแบบที่แตกต่าง เพื่อสร้างชุมชนเกษตรใหม่ร่วมกันอย่างยั่งยืน" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta httpEquiv="Cache-control" content="public" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="author" content="LOFF Co., Ltd." />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/img/logo/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/img/logo/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/img/logo/favicon-16x16.png" />
          <link rel="manifest" href="/static/img/logo/site.webmanifest" />
          <link rel="mask-icon" href="/static/img/logo/safari-pinned-tab.svg" color="#ffcc60" />
          <link rel="shortcut icon" href="/static/img/logo/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/static/img/logo/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
          {this.props.styleTags}
        </Head>
        <body style={{ fontSize: '16px', fontFamily: 'Athiti,sans-serif;' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
