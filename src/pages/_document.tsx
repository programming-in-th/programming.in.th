import Document, {
  DocumentContext,
  Html,
  Head as NextHead,
  Main,
  NextScript
} from 'next/document'

import { Head } from '../components/head'

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
        </NextHead>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
