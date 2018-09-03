import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
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
        return (<div className={css(styles.container)}>
            <Header fixed={true}/>
            <main className={css(styles.divider)}>
                <div className={css(styles.recentPost)}>
                    <div className={css(styles.recentPostFixed)}>
                        {console.log(this.props)}
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
                                console.log(nodes.slug);
                                return (<BlogPost key={index} id={nodes.wordpress_id} slug={nodes.slug} title={nodes.title} content={this.strip_html_tags(nodes.excerpt)} thumbnail={nodes.better_featured_image.media_details.sizes.medium_large.source_url} alt={nodes.better_featured_image.alt_text}/>);
                            } else if (index === this.props.data.allWordpressWpBlog.edges.length - 1) {
                                return (<BlogPost key={index} id={nodes.wordpress_id} slug={nodes.slug} title={nodes.title} content={this.strip_html_tags(nodes.excerpt)} thumbnail={nodes.better_featured_image.media_details.sizes.medium_large.source_url} oldest={true} alt={nodes.better_featured_image.alt_text}/>);
                            }
                        })
                    }
                </div>
            </main>
        </div>);
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
    }
});

export default Blog;

export const postsQuery = graphql `
query postsQuery{
    allWordpressWpBlog {
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
