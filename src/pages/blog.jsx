import React, { Component } from 'react'
import { css } from 'glamor'
// import PageTransition from 'gatsby-plugin-page-transitions';
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import '../css/reset.css'
import '../css/fonts.css'
import icon from '../img/favicon.ico'
import BlogPost from '../components/BlogPost.jsx'
import Header from '../components/Header.jsx'

let constants = require('../js/constants.js')

class Blog extends Component {
  // This function removes all html tags from the title and excerpt.
  // that way the user gets them pretty formatted and without unnecessary html tags
  strip_html_tags(str) {
    if (str === null || str === '') return false
    else str = str.toString()
    return str.replace(/<[^>]*>/g, '')
  }

  render() {
    console.log(this.props.data.allWordpressPost);
    this.props.data.allWordpressPost.edges.forEach((p) => console.log(p.node.better_featured_image.media_details.sizes));
    let recent = this.props.data.allWordpressPost.edges[0].node
    console.log({recent});
    // check if the user is currently searching for something using the search bar in the Header
      return (
        <div className={`${styles.container}`}>
          <Helmet
            title="Gabsii - Blog"
            meta={[
              {
                name: 'description',
                content: '',
              },
              {
                name: 'keywords',
                content: '',
              },
            ]}
          >
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
            <div className={`${styles.recentPost}`}>
              <div className={`${styles.recentPostFixed}`}>
                <BlogPost
                  id={recent.wordpress_id}
                  slug={recent.slug}
                  title={recent.title}
                  content={this.strip_html_tags(recent.excerpt)}
                  thumbnail={
                    recent.better_featured_image.media_details.sizes.thumbnail
                      .source_url 
                  }
                  recent={true}
                  alt={recent.better_featured_image.alt_text}
                />
              </div>
            </div>
            <div className={`${styles.posts}`}>
              {/* map through the entire array of blog entries and create a blogpost element for each */}
              {//eslint-disable-next-line
              this.props.data.allWordpressPost.edges.map((node, index) => {
                let nodes = node.node
                if (
                  index !== 0 &&
                  index !== this.props.data.allWordpressPost.edges.length - 1
                ) {
                  return (
                    <BlogPost
                      key={index}
                      id={nodes.wordpress_id}
                      slug={nodes.slug}
                      title={nodes.title}
                      content={this.strip_html_tags(nodes.excerpt)}
                      thumbnail={
                        nodes.better_featured_image.media_details.sizes
                          .thumbnail.source_url
                      }
                      alt={nodes.better_featured_image.alt_text}
                    />
                  )
                } else if (
                  index ===
                  this.props.data.allWordpressPost.edges.length - 1
                ) {
                  return (
                    <BlogPost
                      key={index}
                      id={nodes.wordpress_id}
                      slug={nodes.slug}
                      title={nodes.title}
                      content={this.strip_html_tags(nodes.excerpt)}
                      thumbnail={
                        nodes.better_featured_image.media_details.sizes
                          .thumbnail.source_url
                      }
                      oldest={true}
                      alt={nodes.better_featured_image.alt_text}
                    />
                  )
                }
              })}
            </div>
          </main>
        </div>
      )
  }
}
const styles = {
  container: css({
    backgroundColor: constants.colors.backgroundBlog,
    width: '100%',
    fontFamily: 'Zwizz, Arial, Sans-Serif',
    zIndex: 0,
    color: constants.colors.font,
    display: 'flex',
    flexGrow: 1,
    minHeight: '100%',
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
export default Blog // query all the blogposts, sort them by their fields in descending order
export const postsQuery = graphql`
{
  allWordpressPost {
    edges {
      node {
        title
        excerpt
        better_featured_image {
          media_details {
            sizes {
              thumbnail {
                source_url
              }
            }
          }
          alt_text
          description
        }
      }
    }
  }
}
`
