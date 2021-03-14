import type { AppProps /*, AppContext */ } from 'next/app'

import '../css/reset.css';
import '../css/fonts.css';


function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
