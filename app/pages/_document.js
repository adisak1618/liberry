import React from 'react';
// import 'typeface-roboto';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MainDocument extends Document {
  static async getInitialProps (ctx) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
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
          <link href="https://unpkg.com/normalize.css@^7.0.0" rel="stylesheet" />
          <link
            href="https://unpkg.com/@blueprintjs/core@^3.0.0/lib/css/blueprint.css"
            rel="stylesheet"
          />
          <link
            href="https://unpkg.com/@blueprintjs/icons@^3.0.0/lib/css/blueprint-icons.css"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/grids-responsive-min.css" />
          <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" />
          {/* <link rel="apple-touch-icon" sizes="180x180" href="/static/img/logo/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/img/logo/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/static/img/logo/favicon-16x16.png" /> */}
          {/* <link rel="manifest" href="/static/img/logo/site.webmanifest" />
          <link rel="mask-icon" href="/static/img/logo/safari-pinned-tab.svg" color="#ffcc60" />
          <link rel="shortcut icon" href="/static/img/logo/favicon.ico" /> */}
          <meta name="msapplication-TileColor" content="#da532c" />
          {/* <meta name="msapplication-config" content="/static/img/logo/browserconfig.xml" /> */}
          <meta name="theme-color" content="#ffffff" />
          {this.props.styleTags}
        </Head>
        <body style={{ fontSize: '16px', fontFamily: 'Athiti,sans-serif' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
