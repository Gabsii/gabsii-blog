import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import BlogPost from './BlogPost.jsx';
import Header from './Header.jsx';

let constants = require('../js/constants.js');

class Blog extends Component {
    constructor() {
        super();
        this.state = {
            blogposts: []
        }
    }

    componentDidMount() {
        let blogpostsURL = "http://localhost:8001/wp-json/wp/v2/blog";
        fetch(blogpostsURL).then(response => response.json()).then(response => this.setState({blogposts: response})).catch(response => {
            console.log(response);
        });
    }

    strip_html_tags(str) {
        if ((str === null) || (str === '')) 
            return false;
        else 
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    render() {
        return (<div className={css(styles.background)}>
            <Header fixed={true}/>
            <main className={css(styles.divider)}>
                <div className={css(styles.recentPost)}>
                    <div className={css(styles.recentPostFixed)}>
                        {
                            this.state.blogposts.map((blogpost, index) => {
                                if (index === 0) {
                                    return (<BlogPost key={index} id={blogpost.id} title={blogpost.title.rendered} content={this.strip_html_tags(blogpost.excerpt.rendered)} thumbnail={blogpost.better_featured_image.media_details.sizes.large.source_url} recent={true} alt={blogpost.better_featured_image.alt_text}/>);
                                }
                            })
                        }
                    </div>
                </div>
                <div className={css(styles.posts)}>
                    {
                        this.state.blogposts.map((blogpost, index) => {
                            if (index !== 0 && index !== this.state.blogposts.length - 1) {
                                return (<BlogPost key={index} id={blogpost.id} title={blogpost.title.rendered} content={this.strip_html_tags(blogpost.excerpt.rendered)} thumbnail={blogpost.better_featured_image.media_details.sizes.medium_large.source_url} alt={blogpost.better_featured_image.alt_text}/>);
                            } else if (index === this.state.blogposts.length - 1) {
                                return (<BlogPost key={index} id={blogpost.id} title={blogpost.title.rendered} content={this.strip_html_tags(blogpost.excerpt.rendered)} thumbnail={blogpost.better_featured_image.media_details.sizes.medium_large.source_url} oldest={true} alt={blogpost.better_featured_image.alt_text}/>);
                            }
                        })
                    }
                </div>
            </main>
        </div>);
    }
}

const styles = StyleSheet.create({
    background: {
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
