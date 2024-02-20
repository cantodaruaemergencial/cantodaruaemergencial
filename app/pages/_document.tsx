import Document, { Head, Html, Main, NextScript } from 'next/document';
import React, { ReactElement } from 'react';

import DefaultTheme from '#/utils/theme';
import { ServerStyleSheets } from '@mui/styles';

const pwaMetaData = (
  <>
    {/* PWA primary color */}
    <meta name="theme-color" content={DefaultTheme.palette.primary.main} />

    {/* TODO: improve meta data */}
    <meta name="application-name" content="Canto da Rua" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
    <meta name="apple-mobile-web-app-title" content="Canto da Rua" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="mobile-web-app-capable" content="yes" />

    {/* TIP: set viewport head meta tag in _app.js, otherwise it will show a warning */}
    {/* <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover' /> */}

    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${process.env.NEXT_PUBLIC_BUCKET_NAME}/icons/apple-touch-icon.png`}
    />
    <link rel="manifest" href="/manifest.json" />
    <link
      rel="shortcut icon"
      href={`${process.env.NEXT_PUBLIC_BUCKET_NAME}/icons/favicon.ico`}
    />
    <style>
      {`
      html, body, #__next {
        height: 100%;
        background-color: #eaeaea;
      }
      #__next {
        margin: 0 auto;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      /* Firefox */
      input[type=number] {
        -moz-appearance: textfield;
      }

      .MuiAutocomplete-paper.MuiAutocomplete-paper {
        background-color: #f3f6f9;
      }

      *:focus {
        outline: none;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      .ReactVirtualized__List {
        overflow-y: scroll !important;
      }
      `}
    </style>
  </>
);

class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="en">
        <Head>
          {pwaMetaData}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

export default MyDocument;
