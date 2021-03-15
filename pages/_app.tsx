import type { AppProps /*, AppContext */ } from 'next/app'

import '../css/reset.css';
import '../css/fonts.css';

import { AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'

function handleExitComplete() {
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0 })
  }
}

function MyApp({ Component, pageProps }: AppProps ) {
  const router = useRouter()
  return (
    <>
      <AnimatePresence exitBeforeEnter onExitComplete={handleExitComplete}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </>
  )
}

export default MyApp;
