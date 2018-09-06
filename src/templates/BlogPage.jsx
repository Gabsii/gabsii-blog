import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import PageTransition from 'gatsby-plugin-page-transitions';

import Header from '../components/Header.jsx';
import Comment from '../components/Comment.jsx';
import Form from '../components/Form.jsx';

import '../css/blog.css';
let constants = require('../js/constants.js');

class BlogPage extends Component {

    constructor() {
        super();
        this.state = {
            comments: []
        }
    }

    async componentDidMount() {
        const c = [];
        const json = await fetch('http://localhost:8001/wp-json/wp/v2/comments').then(response => response.json()).then(response => {
            for (var i = 0; i < response.length; i++) {
                if (response[i].post === this.props.data.wordpressWpBlog.wordpress_id) {
                    c.push(response[i]);
                }
            }
        });

        this.setState({comments: c});

    }

    read_time = function(text) {
        let minutes = Math.floor(text.split(' ').length / 200)

        if (minutes === 0) 
            minutes = 1

        return minutes + ' min'
    }

    render() {
        const post = this.props.data.wordpressWpBlog;
        return (<PageTransition>
            <div className={css(styles.background)}>
                <Header type="blogpage"/>
                <main className={css(styles.divider)}>
                    <div className={css(styles.heroImage)} style={{
                            background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(' + post.better_featured_image.media_details.sizes.large.source_url + ')'
                        }}>
                        <div className={css(styles.title, styles.mobileHidden)}>
                            <div className={css(styles.categoryContainer)}>
                                {
                                    post.categories.map((category, index) => {
                                        return (<div className={css(styles.category)} data-id={category.id} key={index}>{category.name}</div>);
                                    })

                                }
                            </div>
                            {post.title}
                            <div className={css(styles.author)}>
                                <i className={css(styles.italics)}>by {String(post.author.name).toUpperCase() + " "}
                                    at {post.date + " "}</i><br/>
                                Reading time: {" "}
                                {this.read_time(post.content)}
                            </div>
                        </div>
                    </div>
                    <section className={css(styles.section)}>
                        <div className={css(styles.title, styles.mobileVisible)}>
                            <div className={css(styles.categoryContainer)}>
                                {
                                    post.categories.map((category, index) => {
                                        return (<div className={css(styles.category)} data-id={category.id} key={index}>{category.name}</div>);
                                    })
                                }
                            </div>
                            {post.title}
                            <div className={css(styles.author)}>
                                <i className={css(styles.italics)}>
                                    by {String(post.author.name).toUpperCase() + " "}
                                    at {post.date}
                                </i>
                            </div>
                        </div>
                        <div id="blogContent" className={css(styles.text)} dangerouslySetInnerHTML={{
                                __html: post.content
                            }}></div>
                        <hr style={{
                                marginTop: '2em'
                            }}/>
                    </section>
                    <section className={css(styles.section)}>
                        <h2 className={css(styles.titleComment)} style={{
                                color: 'black',
                                marginTop: '-60px',
                                marginBottom: '1em'
                            }}>Comments:
                        </h2>
                        <div>{
                                this.state.comments.map((comment, index) => {
                                    return (<Comment key={index} name={comment.author_name} content={comment.content.rendered} date={comment.date}/>);
                                })
                            }</div>
                        <hr style={{
                                marginTop: '2em'
                            }}/>
                        <div>
                            <h3 className={css(styles.titleComment)} style={{
                                    color: 'black',
                                    marginTop: '20px',
                                    marginBottom: '.5em'
                                }}>Write your own comment:
                            </h3>
                            <Form id={post.wordpress_id}/>
                        </div>
                    </section>
                </main>
            </div>
        </PageTransition>);
    }
}
const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        width: '100%',
        fontFamily: 'Zwizz',
        zIndex: 0,
        color: 'black',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
    },
    divider: {
        position: 'relative',
        top: 0,
        // marginTop: '100px',
        wordBreak: 'break-all',
        width: '100%'
    },
    heroImage: {
        width: '100%',
        height: 'calc(100vh - 100px)',
        objectFit: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        '@media (max-width: 768px)': {
            height: 'calc(100vh - 250px)'
        }
    },
    section: {
        zIndex: 100,
        color: 'white',
        maxWidth: '750px',
        marginLeft: 'auto',
        marginRight: 'auto',
        filter: 'brightness(1)',
        padding: '50px 14px 50px 14px',
        '@media (max-width: 768px)': {
            padding: '25px 14px'
        }
    },
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        margin: '10px 0',
        backgroundColor: constants.colors.fontSecondary,
        minWidth: '200px',
        border: 'none',
        padding: '0.5em 1em',
        borderRadius: '10px',
        fontFamily: 'Noto Serif'
    },
    submit: {
        alignSelf: 'flex-end'
    },
    categoryContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    category: {
        backgroundColor: '#EE7778',
        borderRadius: '10px',
        padding: '4px 5px',
        fontSize: '0.45em',
        margin: '0 5px',
        fontFamily: 'Noto Serif',
        fontWeight: 'normal',
        marginBottom: '1em'
    },
    author: {
        color: constants.colors.fontSecondary,
        marginTop: '5px',
        fontSize: '.45em'
    },
    title: {
        fontFamily: 'Noto Serif',
        color: 'white',
        display: 'flex',
        alignSelf: 'flex-end',
        flexDirection: 'column',
        // color: 'transparent',
        // background: 'inherit',
        // backgroundClip: 'text',
        // WebkitBackgroundClip: 'text',
        // filter: 'invert(1)',
        borderLeft: '1px solid white',
        fontSize: '40px',
        fontWeight: 'bold',
        padding: '0 .75em',
        margin: '2em 1.5em',
        wordBreak: 'break-word',
        '@media (max-width: 768px)': {
            margin: '0.5em .5em 1em .5em',
            padding: '0 0.25em',
            borderLeft: '1px solid #EE7778'
        }
    },
    titleComment: {
        fontFamily: 'Noto Serif',
        color: 'black',
        fontSize: '40px',
        fontWeight: 'bold',
        padding: '0 .75em',
        wordBreak: 'break-word'
    },
    mobileHidden: {
        '@media (max-width: 768px)': {
            visibility: 'hidden'
        }
    },
    mobileVisible: {
        '@media (max-width: 768px)': {
            color: 'black',
            visibility: 'visible'
        },
        '@media (min-width: 768px)': {
            display: 'none'
        }
    },
    text: {
        fontFamily: 'Noto Serif',
        color: '#000',
        wordBreak: 'break-word'
    },
    italics: {
        fontStyle: 'italic'
    }
});
export default BlogPage;
export const blogPageQuery = graphql `query blogPageQuery($wordpress_id: Int!) {
                    wordpressWpBlog(wordpress_id : {
                        eq: $wordpress_id
                    }) {
                        wordpress_id
                        date(formatString : "DD/MM/YYYY")
                        slug
                        title
                        excerpt
                        author {
                            name
                        }
                        content
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
                }`
