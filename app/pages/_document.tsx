import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React, { ReactElement } from 'react';
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components';

import DefaultTheme from '#/utils/theme';

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
      href="/icons/apple-touch-icon.png"
    />
    <link rel="manifest" href="/manifest.json" />
    <link rel="shortcut icon" href="/icons/favicon.ico" />
    <style>{`
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
      `}</style>
  </>
);

class TheDocument extends Document {
  static async getInitialProps(ctx: any) {
    const styledComponentSheet = new StyledComponentSheets();
    const materialUiSheets = new MaterialUiServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            styledComponentSheet.collectStyles(
              materialUiSheets.collect(<App {...props} />),
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [
          <React.Fragment key="styles">
            {initialProps.styles}
            {materialUiSheets.getStyleElement()}
            {styledComponentSheet.getStyleElement()}
          </React.Fragment>,
        ],
      };
    } finally {
      styledComponentSheet.seal();
    }
  }

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

export default TheDocument;
