import React, {Component} from 'react';
import {css} from 'glamor'
// import PageTransition from 'gatsby-plugin-page-transitions';
import {Link} from 'gatsby';
import Helmet from 'react-helmet';
import {graphql} from "gatsby"

import '../css/reset.css';
import '../css/fonts.css';
import icon from '../img/favicon.ico';
import BlogPost from '../components/BlogPost.jsx';
import Header from '../components/Header.jsx';

let constants = require('../js/constants.js');

class Blog extends Component {

    // This function removes all html tags from the title and excerpt.
    // that way the user gets them pretty formatted and without unnecessary html tags
    strip_html_tags(str) {
        if ((str === null) || (str === '')) 
            return false;
        else 
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    render() {
        let recent = this.props.data.allWordpressWpBlog.edges[0].node;
        // check if the user is currently searching for something using the search bar in the Header
        if (this.props.location.search === undefined || this.props.location.search === "") {
            return (<div className={`${styles.container}`}>
                <Helmet title="Gabsii - Blog" meta={[
                        {
                            name: 'description',
                            content: ''
                        }, {
                            name: 'keywords',
                            content: ''
                        }
                    ]}>
                    <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet"/>
                    <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,700&amp;subset=latin-ext" rel="stylesheet"/>
                    <link rel="shortcut icon" href={icon} type="image/x-icon"/>
                    <link rel="icon" href={icon} type="image/x-icon"/>
                    <meta name="author" content="Lukas Gabsi (Gabsii)"/>
                    <meta name="description" content="Looks like you found my blog. Congratulations! You now can read about any of my adventures in here."/>
                    <meta name="keywords" content="blog, personal, homepage, webpage, Lukas, Gabsi, Gabsii, EVS, European Volunteering Service, EFD, travel, travelling, Spain"/>
                    <html lang="en"/>
                </Helmet>
                <Header type="blog"/>
                <main className={`${styles.divider}`}>
                    <div className={`${styles.recentPost}`}>
                        <div className={`${styles.recentPostFixed}`}>
                            <BlogPost id={recent.wordpress_id} slug={recent.slug} title={recent.title} content={this.strip_html_tags(recent.excerpt)} thumbnail={recent.better_featured_image.media_details.sizes.large.source_url || recent.better_featured_image.media_details.sizes.medium_large.source_url} recent={true} alt={recent.better_featured_image.alt_text}/>
                        </div>
                    </div>
                    <div className={`${styles.posts}`}>
                        {/* map through the entire array of blog entries and create a blogpost element for each */}
                        {
                            //eslint-disable-next-line
                            this.props.data.allWordpressWpBlog.edges.map((node, index) => {
                                let nodes = node.node;
                                if (index !== 0 && index !== this.props.data.allWordpressWpBlog.edges.length - 1) {
                                    return (<BlogPost key={index} id={nodes.wordpress_id} slug={nodes.slug} title={nodes.title} content={this.strip_html_tags(nodes.excerpt)} thumbnail={nodes.better_featured_image.media_details.sizes.medium_large.source_url} alt={nodes.better_featured_image.alt_text}/>);
                                } else if (index === this.props.data.allWordpressWpBlog.edges.length - 1) {
                                    return (<BlogPost key={index} id={nodes.wordpress_id} slug={nodes.slug} title={nodes.title} content={this.strip_html_tags(nodes.excerpt)} thumbnail={nodes.better_featured_image.media_details.sizes.medium_large.source_url} oldest={true} alt={nodes.better_featured_image.alt_text}/>);
                                }
                            })
                        }
                    </div>
                </main>
            </div>);
        } else if (this.props.location.search.indexOf("q=") > -1) {

            // get the search query from the url
            const searchQuery = this.props.location.search.split("=")[1];
            const res = [];

            // declare an empty array for the posts matching the query
            return (<div className={`${styles.container2}`}>
                <Helmet title="Gabsii - Blog">
                    <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet"/>

                    <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,700&amp;subset=latin-ext" rel="stylesheet"/>
                    <link rel="shortcut icon" href={icon} type="image/x-icon"/>
                    <link rel="icon" href={icon} type="image/x-icon"/>
                    <meta name="author" content="Lukas Gabsi (Gabsii)"/>
                    <meta name="description" content="Looks like you found my blog. Congratulations! You now can read about any of my adventures in here."/>
                    <meta name="keywords" content="blog, personal, homepage, webpage, Lukas, Gabsi, Gabsii, EVS, European Volunteering Service, EFD, travel, travelling, Spain"/>
                    <html lang="en"/>
                </Helmet>
                <Header type="blog"/>
                <main className={`${styles.divider} ${styles.dividerSearch}`}>
                    <div className={`${styles.searchResultsContainer}`}>
                        <div className={`${styles.back}`}>
                            <Link to="/blog" className={`${styles.link}`}>
                                <i className="fas fa-arrow-left fa-lg"></i>
                                <span className={`${styles.backText}`}>Return to the blog</span>
                            </Link>
                        </div>
                        {/* filter through all the blog posts and check if the search query is contained in the title or in the excerpt */}
                        {
                            //eslint-disable-next-line
                            this.props.data.allWordpressWpBlog.edges.filter(({node}) => {
                                let title = node.title.toLowerCase();
                                let excerpt = node.excerpt.toLowerCase();
                                if (title.includes(searchQuery)) {
                                    res.push(node);
                                } else if (excerpt.includes(searchQuery)) {
                                    for (var i = 0; i < res.length; i++) {
                                        if (res[i].wordpress_id === node.wordpress_id) {
                                            break;
                                        }
                                    }
                                    res.push(node);
                                    // not contained in either
                                }
                            })
                        }
                        {/* display all the blogposts that match the query */}
                        {
                            res.length !== 0
                                ? res.map((r, index) => {
                                    return (<BlogPost key={index} id={r.wordpress_id} slug={r.slug} title={r.title} content={this.strip_html_tags(r.excerpt)} thumbnail={r.better_featured_image.media_details.sizes.medium_large.source_url} alt={r.better_featured_image.alt_text}/>);
                                })
                                : (<div>Whoopsie Doopsie. Your search was unsuccessful!</div>)

                        }
                    </div>
                </main>
            </div>);
        } else {
            // get the search query from the url
            const searchQuery = this.props.location.search.split("=")[1];
            const res = [];

            // console.log(searchQuery);

            // declare an empty array for the posts matching the query
            return (<div className={`${styles.container2}`}>
                <Helmet title="Gabsii - Blog">
                    <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet"/>

                    <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,700&amp;subset=latin-ext" rel="stylesheet"/>
                    <link rel="shortcut icon" href={icon} type="image/x-icon"/>
                    <link rel="icon" href={icon} type="image/x-icon"/>
                    <meta name="author" content="Lukas Gabsi (Gabsii)"/>
                    <meta name="description" content="Looks like you found my blog. Congratulations! You now can read about any of my adventures in here."/>
                    <meta name="keywords" content="blog, personal, homepage, webpage, Lukas, Gabsi, Gabsii, EVS, European Volunteering Service, EFD, travel, travelling, Spain"/>
                    <html lang="en"/>
                </Helmet>
                <Header type="blog"/>
                <main className={`${styles.divider} ${styles.dividerSearch}`}>
                    <div className={`${styles.searchResultsContainer}`}>
                        <div className={`${styles.back}`}>
                            <Link to="/blog" className={`${styles.link}`}>
                                <i className="fas fa-arrow-left fa-lg"></i>
                                <span className={`${styles.backText}`}>Return to the blog</span>
                            </Link>
                        </div>
                        {/* filter through all the blog posts and check if the search query is contained in the title or in the excerpt */}
                        {
                            //eslint-disable-next-line
                            this.props.data.allWordpressWpBlog.edges.filter(({node}) => {
                                let categories = node.categories;

                                for (var i = 0; i < categories.length; i++) {
                                    let cat = categories[i].name;
                                    if (cat.includes(searchQuery)) {
                                        res.push(node);
                                    }
                                }
                            })
                        }
                        {/* display all the blogposts that match the query */}
                        {
                            res.length !== 0
                                ? res.map((r, index) => {
                                    return (<BlogPost key={index} id={r.wordpress_id} slug={r.slug} title={r.title} content={this.strip_html_tags(r.excerpt)} thumbnail={r.better_featured_image.media_details.sizes.medium_large.source_url} alt={r.better_featured_image.alt_text}/>);
                                })
                                : (<div>Whoopsie Doopsie. Your search was unsuccessful!</div>)

                        }
                    </div>
                </main>
            </div>);
        }
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
            width: '100%'
        }
    }),
    container2: css({
        backgroundColor: constants.colors.backgroundBlog,
        width: '100%',
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        zIndex: 0,
        color: constants.colors.font,
        display: 'flex',
        flexGrow: 1,
        minHeight: '100% !important'
    }),
    divider: css({
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        width: 'calc(100% - 100px)',
        position: 'relative',
        top: 0,
        padding: '50px',
        marginTop: '100px',
        '@media (max-width: 769px)': {
            flexDirection: 'column',
            width: 'calc(100% - 50px)',
            padding: '25px 0'
        },
        '@media (max-width: 1280px)': {
            width: 'calc(100% - 100px)'
        }
    }),
    dividerSearch: css({height: 'calc(100vh - 200px)'}),
    searchResultsContainer: css({
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        width: 'calc(100% - 100px)',
        '@media (max-width: 769px)': {
            width: '100%'
        }
    }),
    recentPost: css({
        width: '50%',
        height: '80vh',
        flex: 1,
        maxHeight: '100%',
        marginRight: '50px',
        marginBottom: '50px',
        '@media (max-width: 769px)': {
            width: '100%',
            marginRight: 0,
            height: 'auto'
        }
    }),
    recentPostFixed: css({
        '@media (min-width: 769px)': {
            position: 'fixed',
            width: 'calc(50% - 100px)',
            height: '80vh',
            marginRight: '-50px'
        }
    }),
    posts: css({
        width: '50%',
        '@media (max-width: 769px)': {
            width: '100%'
        }
    }),
    back: css({fontSize: '1.5em', margin: '0 0 25px 10px', lineHeight: '1.5em'}),
    backText: css({marginLeft: '10px'}),
    link: css({
        height: '100%',
        margin: '0 0 25px 10px',
        lineHeight: '1.5em',
        color: '#000000',
        textDecoration: 'none',
        ':visited': {
            color: '#000000'
        }
    })
};
export default Blog; // query all the blogposts, sort them by their fields in descending order
export const postsQuery = graphql `{
  allWordpressWpBlog(sort: {fields: [date], order: DESC}) {
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
}`;
