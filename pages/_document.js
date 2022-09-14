import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <html className="h-full bg-gray-100">
        <Head />
        <body className="h-full">
          <Main />
          <NextScript />
        </body>
      </html>
    </Html>
  )
}
