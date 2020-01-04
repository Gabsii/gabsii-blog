const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

// Query all informations needed to create a new blog page
const pageQuery = `{
    allWordpressWpBlog {
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

const productQuery = `{
  allWcProducts {
    edges {
      node {
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
        slug
        virtual
        weight
        total_sales
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
          _.each(result.data.allWordpressWpBlog.edges, edge => {
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

      // Run the query
      graphql(productQuery).then(result => {
        // catches any errors that occured and rejects the promise
        if (result.errors) {
            console.log(result.errors);
            reject(result.errors);
        }

        // Call the template from the `templates/` directory
        const productTemplate = path.resolve("./src/templates/ProductPage.jsx");
        // Create a page for each individual node returned
        _.each(result.data.allWcProducts.edges, edge => {
            createPage({
                path: `/shop/${edge.node.slug}/`,
                component: slash(productTemplate),
                context: {
                    wordpress_id: edge.node.wordpress_id
                }
            });
            resolve();
        });
      })
    });
};

// fixes build errors that occured when running `gatsby build`
//
// exports.modifyBabelrc = ({babelrc}) => ({
//     ...babelrc,
//     plugins: babelrc.plugins.concat(['transform-regenerator'])
// });