import React, { Component } from 'react'
// import PageTransition from 'gatsby-plugin-page-transitions';
import { graphql } from 'gatsby'

import '../css/reset.css'
import '../css/fonts.css'

const Projects = () => (<div>TBA</div>);
  
export default Projects // query all the blogposts, sort them by their fields in descending order
export const postsQuery = graphql`
  {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          wordpress_id
          title
          excerpt
          slug
          better_featured_image {
            alt_text
            media_details {
              sizes {
                medium_large {
                  source_url
                }
                large {
                  source_url
                }
              }
            }
          }
          categories {
            name
          }
        }
      }
    }
  }
`
