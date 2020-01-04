import React, { Component } from 'react'
import { css } from 'glamor'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import '../css/reset.css'
import '../css/fonts.css'
import icon from '../img/favicon.ico'
import Product from '../components/Product.jsx'
import Header from '../components/Header.jsx'

let constants = require('../js/constants.js')

class Shop extends Component {

  render() {
    return (
        <div className={`${styles.container}`}>
          <Helmet title="Gabsii - Shop">
            <link
              href="https://use.fontawesome.com/releases/v5.3.1/css/all.css"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Noto+Serif:400,700&amp;subset=latin-ext"
              rel="stylesheet"
            />
            <link rel="shortcut icon" href={icon} type="image/x-icon" />
            <link rel="icon" href={icon} type="image/x-icon" />
            <meta name="author" content="Lukas Gabsi (Gabsii)" />
            <meta
              name="description"
              content="Looks like you found my blog. Congratulations! You now can read about any of my adventures in here."
            />
            <meta
              name="keywords"
              content="blog, personal, homepage, webpage, Lukas, Gabsi, Gabsii, EVS, European Volunteering Service, EFD, travel, travelling, Spain"
            />
            <html lang="en" />
            <script
              async="async"
              src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
            ></script>
            <script>{`(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "ca-pub-4957107490063182", enable_page_level_ads: true});`}</script>
          </Helmet>
          <Header type="blog" />
          <main className={`${styles.divider}`}>
            <div className={`${styles.posts}`}>
              {//eslint-disable-next-line
                this.props.data.allWcProducts.edges.map((node, index) => {
                  let nodes = node.node
                  let prices = {
                    onSale: nodes.on_sale,
                    regularPrice: nodes.regular_price,
                    price: nodes.price
                  }
                  return (
                    <Product
                      key={index}
                      id={nodes.wordpress_id}
                      slug={nodes.slug}
                      title={nodes.name}
                      thumbnail={
                        nodes.images[0].src
                      }
                      alt={nodes.images[0].alt}
                      prices={prices}
                      featured={nodes.featured}
                      stockStatus={nodes.stock_status}
                    />
                  )
                })
              }
            </div>
          </main>
        </div>
      )
  }
}

const styles = {
  container: css({
    height: '100%',
    width: '100%',
    minHeight: '100vh',
    padding: '1rem',
    display: 'flex',
    flexGrow: 1,
    backgroundColor: constants.colors.backgroundBlog,
    fontFamily: 'Zwizz, Arial, Sans-Serif',
    color: constants.colors.font,
    zIndex: 0,
    '@media (max-width: 769px)': {
      height: 'calc(100% - 50px)',
      width: '100%',
    },
  }),
  container2: css({
    backgroundColor: constants.colors.backgroundBlog,
    width: '100%',
    fontFamily: 'Zwizz, Arial, Sans-Serif',
    zIndex: 0,
    color: constants.colors.font,
    display: 'flex',
    flexGrow: 1,
    minHeight: '100% !important',
  }),
  divider: css({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    width: 'calc(100% - 50px)',
    position: 'relative',
    top: 0,
    padding: '25px',
    marginTop: '100px',
    '@media (max-width: 769px)': {
      flexDirection: 'column',
      width: 'calc(100% - 50px)',
      padding: '25px 0',
    },
    '@media (max-width: 1280px)': {
      width: 'calc(100% - 100px)',
    },
  }),
  dividerSearch: css({ height: 'calc(100vh - 200px)' }),
  searchResultsContainer: css({
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    width: 'calc(100% - 100px)',
    '@media (max-width: 769px)': {
      width: '100%',
    },
  }),
  recentPost: css({
    flex: 1,
    '@media (max-width: 769px)': {
      width: '100%',
      marginRight: 0,
      height: 'auto',
    },
  }),
  recentPostFixed: css({
    '@media (min-width: 769px)': {
      position: 'fixed',
      width: 'calc(50% - 50px)', // 2 * DividerPadding = 50px
      height: 'calc(100% - 150px)', // HeaderHeight + (2 * DividerPadding) = 150px
    },
  }),
  posts: css({
    width: '50%',
    '@media (max-width: 769px)': {
      width: '100%',
    },
  }),
  back: css({
    fontSize: '1.5em',
    margin: '0 0 25px 10px',
    lineHeight: '1.5em',
  }),
  backText: css({ marginLeft: '10px' }),
  link: css({
    height: '100%',
    margin: '0 0 25px 10px',
    lineHeight: '1.5em',
    color: '#000000',
    textDecoration: 'none',
    ':visited': {
      color: '#000000',
    },
  }),
}

export const query = graphql`
  {
    allWcProducts(sort: {fields: [featured, date_created], order: DESC}) {
      edges {
        node {
          wordpress_id
          catalog_visibility
          categories {
            name
          }
          featured
          images {
            alt
            src
          }
          name
          on_sale
          price
          purchasable
          regular_price
          slug
          stock_status
          virtual
          weight
        }
      }
    }
  }
`

export default Shop