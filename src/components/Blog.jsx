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

    render() {
        return (<div className={css(styles.background)}>
            <Header/>
            <div className={css(styles.divider)}>
                <div className={css(styles.recentPost)}>
                    {
                        this.state.blogposts.map((blogpost, index) => {
                            if (index === 0) {
                                return (<BlogPost key={index} id={blogpost.id} title={blogpost.title.rendered} content={blogpost.acf.summary} thumbnail={blogpost.better_featured_image.media_details.sizes.large.source_url} last={true} alt={blogpost.better_featured_image.alt_text}/>);
                            }
                        })
                    }
                </div>
                <div className={css(styles.posts)}>
                    {
                        this.state.blogposts.map((blogpost, index) => {
                            if (index !== 0) {
                                return (<BlogPost key={index} id={blogpost.id} title={blogpost.title.rendered} content={blogpost.acf.summary} thumbnail={blogpost.better_featured_image.media_details.sizes.medium_large.source_url} alt={blogpost.better_featured_image.alt_text}/>);
                            }
                        })
                    }
                </div>
            </div>
        </div>);
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: constants.colors.background,
        minHeight: 'calc(100% - 100px)',
        minWidth: 'calc(100% - 150px)',
        display: 'flex',
        flexDirection: 'column',
        padding: '50px',
        fontFamily: 'Zwizz',
        color: constants.colors.font,
        '@media (max-width: 768px)': {
            height: 'calc(100% - 50px)',
            width: 'calc(100% - 50px)'
        }
    },
    divider: {
        display: 'flex',
        flexDirection: 'row',
        height: 'calc(100% - 200px)',
        width: 'calc(100% - 100px)',
        position: 'absolute',
        top: '150px',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            width: 'calc(100% - 50px)'
        }
    },
    recentPost: {
        width: '50%',
        height: '100%',
        marginRight: '50px',
        '@media (max-width: 768px)': {
            width: 'calc(100% - 50px)',
            marginBottom: '50px',
            marginRight: 0
        }
    },
    posts: {
        width: '50%',
        height: '100%',
        '@media (max-width: 768px)': {
            width: 'calc(100% - 50px)'
        }
    }
});

export default Blog;
