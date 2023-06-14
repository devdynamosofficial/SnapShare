import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Snap Share</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className='bg-[#001B00]'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
