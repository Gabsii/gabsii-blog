const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

// Query all informations needed to create a new blog page
const pageQuery = `{
    allWordpressPost {
      edges {
        node {
          wordpress_id
          date(formatString: "DD/MM/YYYY")
          slug
          title
          excerpt
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
            id
          }
        }
      }
    }
  }`


exports.createPages = ({graphql, actions}) => {
    const {createPage} = actions;

    return new Promise((resolve, reject) => {

      // Run the query
      graphql(pageQuery).then(result => {
          // catches any errors that occured and rejects the promise
          if (result.errors) {
              console.log(result.errors);
              reject(result.errors);
          }

          // Call the template from the `templates/` directory
          const pageTemplate = path.resolve("./src/templates/BlogPage.jsx");
          // Create a page for each individual node returned
          _.each(result.data.allWordpressPost.edges, edge => {
              createPage({
                  path: `/blog/${edge.node.slug}/`,
                  component: slash(pageTemplate),
                  context: {
                      wordpress_id: edge.node.wordpress_id
                  }
              });
              resolve();
          });
      })
    });
};
