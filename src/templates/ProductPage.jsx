import React, { Component } from 'react'
import { css } from 'glamor'
import Helmet from 'react-helmet'
import he from 'he'
import { graphql } from 'gatsby'

import '../css/reset.css'
import '../css/fonts.css'
import icon from '../img/favicon.ico'
import Header from '../components/Header.jsx'

import '../css/blog.css'

class ProductPage extends Component {
  constructor() {
    super()
    this.state = {}
  }


  render() {
    console.log(this.props)
    const product = this.props.data.wcProducts
    return (
      <div>
        <Helmet title={'Gabsii - ' + he.decode(product.name)}>
          <link
            href="https://fonts.googleapis.com/css?family=Noto+Sans|Noto+Serif"
            rel="stylesheet"
          />
          <link
            href="https://use.fontawesome.com/releases/v5.3.1/css/all.min.css"
            rel="stylesheet"
          />
          <link rel="shortcut icon" href={icon} type="image/x-icon" />
          <link rel="icon" href={icon} type="image/x-icon" />
          <meta
            property="og:title"
            content={`Gabsii | ` + he.decode(product.name)}
          />
          <meta property="og:type" content="article" />
          <meta name="author" content="Lukas Gabsi (Gabsii)" />
          <html lang="en" />
          <body class="increaseFontSize" />
          <script
            async="async"
            src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          ></script>
          <script>{`(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "ca-pub-4957107490063182", enable_page_level_ads: true});`}</script>
        </Helmet>
        <div className={`${background}`}>
          <Header type="blogpage" />
          <main className={`${divider}`}>
              <pre>
                  {JSON.stringify(product, null, 4)}
              </pre>
          </main>
        </div>
      </div>
    )
  }
}

const background = css({
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    minHeight: '100vh',
    padding: '1rem',
    display: 'flex',
    fontFamily: 'Zwizz, Arial, Sans-Serif',
    zIndex: 0,
    color: 'black',
    flexGrow: 1,
  })
  const divider = css({
    position: 'relative',
    top: 0,
    wordBreak: 'break-all',
    width: '100%',
  })

export const productPageQuery = graphql`
  query($wordpress_id: Int!) {
    wcProducts(wordpress_id: {eq: $wordpress_id}) {
      wordpress_id
      average_rating
      button_text
      catalog_visibility
      categories {
        name
      }
      date_created
      description
      downloadable
      featured
      images {
        alt
        src
      }
      name
      on_sale
      price
      purchasable
      purchase_note
      regular_price
      sale_price
      reviews_allowed
      short_description
      stock_status
      virtual
      weight
      total_sales
    }
  }
`

export default ProductPage
