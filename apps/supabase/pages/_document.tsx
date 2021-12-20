// pages/_document.js

import { ColorModeScript, extendTheme, ThemeConfig } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

// 3. extend the theme
const theme = extendTheme({ config })

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang='en'>
        <Head />
        <body>
          {/* 👇 Here's the script */}
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}