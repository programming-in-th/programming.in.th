import Document, {
  DocumentContext,
  Html,
  Head as NextHead,
  Main,
  NextScript,
} from 'next/document'

import { Head } from 'components/head'
import { GA_TRACKING_ID } from 'lib/gtag'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <NextHead>
          <Head />
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </NextHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
