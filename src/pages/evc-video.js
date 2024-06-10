import React from 'react'

import '../css/reset.css'
import '../css/fonts.css'

const IndexPage = () => {
  if (typeof window !== 'undefined') {
    window.location.href = 'https://youtube.com';
  }

  return (<div>If this page doesn't redirect you then go to ... https://youtube.com/</div>)
}
export default RedirectPage
