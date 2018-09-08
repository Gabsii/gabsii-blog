const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

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
          acf {
            location {
              address
              lat
              lng
            }
          }
        }
      }
    }
  }`

exports.createPages = ({graphql, boundActionCreators}) => {
    const {createPage} = boundActionCreators;

    return new Promise((resolve, reject) => {

        // Pages
        graphql(pageQuery).then(result => {
            if (result.errors) {
                console.log(result.errors);
                reject(result.errors);
            }

            const pageTemplate = path.resolve("./src/templates/BlogPage.jsx");
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
    });
};

exports.modifyBabelrc = ({babelrc}) => ({
    ...babelrc,
    plugins: babelrc.plugins.concat(['transform-regenerator'])
});
