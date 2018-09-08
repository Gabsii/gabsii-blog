import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import PageTransition from 'gatsby-plugin-page-transitions';
import Link from 'gatsby-link';
import Helmet from 'react-helmet'

import BlogPost from '../../components/BlogPost.jsx';
import Header from '../../components/Header.jsx';

let constants = require('../../js/constants.js');

class Blog extends Component {
    strip_html_tags(str) {
        if ((str === null) || (str === '')) 
            return false;
        else 
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    render() {
        if (this.props.location.search === "") {
            return (<PageTransition defaultStyle={{
                    transition: 'left 500ms cubic-bezier(0.47, 0, 0.75, 0.72)',
                    left: '100%',
                    position: 'absolute',
                    width: '100%'
                }} transitionStyles={{
                    entering: {
                        left: '0%'
                    },
                    entered: {
                        left: '0%'
                    },
                    exiting: {
                        left: '100%'
                    }
                }}>
                <Helmet title="Gabsii - Blog" meta={[
                        {
                            name: 'description',
                            content: 'Sample'
                        }, {
                            name: 'keywords',
                            content: 'sample, something'
                        }
                    ]}/>
                <div className={css(styles.container)}>
                    <Header type="blog"/>
                    <main className={css(styles.divider)}>
                        <div className={css(styles.recentPost)}>
                            <div className={css(styles.recentPostFixed)}>
                                {
                                    this.props.data.allWordpressWpBlog.edges.map((node, index) => {
                                        let nodes = node.node;
                                        if (index === 0) {
                                            return (<BlogPost key={index} id={nodes.wordpress_id} slug={nodes.slug} title={nodes.title} content={this.strip_html_tags(nodes.excerpt)} thumbnail={nodes.better_featured_image.media_details.sizes.large.source_url} recent={true} alt={nodes.better_featured_image.alt_text}/>);
                                        }
                                    })
                                }
                            </div>
                        </div>
                        <div className={css(styles.posts)}>
                            {
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

                </div>
            </PageTransition>);
        } else {
            const searchQuery = this.props.location.search.split("=")[1];
            const res = [];
            return (<PageTransition defaultStyle={{
                    transition: 'left 500ms cubic-bezier(0.47, 0, 0.75, 0.72)',
                    left: '100%',
                    position: 'absolute',
                    width: '100%',
                    height: '100%'
                }} transitionStyles={{
                    entering: {
                        left: '0%'
                    },
                    entered: {
                        left: '0%'
                    },
                    exiting: {
                        left: '100%'
                    }
                }}>
                <Helmet title="Gabsii - Blog" meta={[
                        {
                            name: 'description',
                            content: 'Sample'
                        }, {
                            name: 'keywords',
                            content: 'sample, something'
                        }
                    ]}/>
                <div className={css(styles.container2)}>
                    <Header type="blog"/>
                    <main className={css(styles.divider)}>
                        <div className={css(styles.searchResultsContainer)}>
                            <div className={css(styles.back)}>
                                <Link to="/blog" className={css(styles.link)}>
                                    <i className="fas fa-arrow-left fa-lg"></i>
                                    <span className={css(styles.backText)}>Return to the blog</span>
                                </Link>
                            </div>
                            {
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
                            {
                                res.length !== 0
                                    ? res.map((r, index) => {
                                        return (<BlogPost key={index} id={r.wordpress_id} slug={r.slug} title={r.title} content={this.strip_html_tags(r.excerpt)} thumbnail={r.better_featured_image.media_details.sizes.medium_large.source_url} alt={r.better_featured_image.alt_text}/>);
                                    })
                                    : (<div>Whoopsie Doopsie. Your search was unsuccessful!</div>)

                            }
                        </div>
                    </main>
                </div>
            </PageTransition>);
        }
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: constants.colors.backgroundBlog,
        width: '100%',
        fontFamily: 'Zwizz',
        zIndex: 0,
        color: constants.colors.font,
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%',
        '@media (max-width: 768px)': {
            height: 'calc(100% - 50px)',
            width: '100%'
        }
    },
    container2: {
        backgroundColor: constants.colors.backgroundBlog,
        width: '100%',
        fontFamily: 'Zwizz',
        zIndex: 0,
        color: constants.colors.font,
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
    },
    divider: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'row',
        width: 'calc(100% - 100px)',
        position: 'relative',
        top: 0,
        padding: '50px',
        marginTop: '100px',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            width: 'calc(100% - 50px)'
        },
        '@media (max-width: 1280px)': {
            width: 'calc(100% - 100px)'
        }
    },
    searchResultsContainer: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        width: 'calc(100% - 100px)',
        '@media (max-width: 768px)': {
            width: '100%'
        }
    },
    recentPost: {
        width: '50%',
        height: '80vh',
        flex: 1,
        maxHeight: '100%',
        marginRight: '50px',
        '@media (max-width: 768px)': {
            width: '100%',
            marginBottom: '50px',
            marginRight: 0
        }
    },
    recentPostFixed: {
        '@media (min-width: 768px)': {
            position: 'fixed',
            width: 'calc(50% - 100px)',
            height: '80vh',
            marginRight: '-50px'
        }
    },
    posts: {
        width: '50%',
        height: '100%',
        '@media (max-width: 768px)': {
            width: '100%'
        }
    },
    back: {
        fontSize: '1.5em',
        margin: '0 0 25px 10px',
        lineHeight: '1.5em'
    },
    backText: {
        marginLeft: '10px'
    },
    link: {
        height: '100%',
        margin: '0 0 25px 10px',
        lineHeight: '1.5em',
        color: '#000000',
        textDecoration: 'none',
        ':visited': {
            color: '#000000'
        }
    }
});
export default Blog;
export const postsQuery = graphql ` query postsQuery {
  allWordpressWpBlog(sort:{fields: [date], order: DESC}) {
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
      }
    }
  }
}`;
