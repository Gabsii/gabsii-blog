import React, {Component} from 'react';
import {css} from 'glamor'
import he from 'he';

let constants = require('../js/constants.js');

class BlogPost extends Component {

    constructor() {
        super();
        // the state object tells the Component which type of blogpost should be returned.

        this.state = {
            recent: false,
            oldest: false,
            search: false,
            img: '',
            id: 0
        }
        this.openPost = this.openPost.bind(this);
    }

    componentDidMount() {
        // All state-critical variables are set via props (except search)
        //
        // Checks if the current post is the most recently uploaded one
        if (this.props.recent !== undefined && this.props.recent !== null && this.props.recent === true) {
            this.setState({recent: true});
        }
        // Checks if the current post is the least recently uploaded one
        if (this.props.oldest !== undefined && this.props.oldest !== null && this.props.oldest === true) {
            this.setState({oldest: true});
        }
        // Sets the image, id and slug for the blogpost
        this.setState({img: this.props.thumbnail, id: this.props.id, slug: this.props.slug});
        // Gets the search parameter and sets it, so that the blog index page can rerender all the posts that fit the search criteria
        this.setState({search: window.location.href.includes("=")});
    }

    // This function is invoked each time a user presses the current blogpost Component

    openPost(e, i) {
        e.preventDefault();
        // Setting the location via window because im lazy lmao
        window.location = window.location + '/' + this.state.slug;
    }

    // This function removes all html tags from the title and excerpt.
    // that way the user gets them pretty formatted and without unnecessary html tags

    strip_html_tags(str) {
        if ((str === null) || (str === '')) 
            return false;
        else 
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    //using the he.decode function from the he library to display the text utf8 encoded

    render() {
        // Logic if the query parameter is set in the window (?q=xxx)
        if (this.state.search) {
            return (<article className={`${styles.postContainer}`}>
                <section id={this.props.id} className={`${styles.postSearch}`}>
                    <img className={`${styles.postImageSearch}`} src={this.props.thumbnail} alt={this.props.alt} onClick={this.openPost}/>
                    <section className={`${styles.postTitle}`}>
                        <h1 className={`${styles.postHeading}`} onClick={this.openPost}>{he.decode(this.props.title)}</h1>
                        <h3 className={`${styles.postSubheading}`}>{he.decode(this.strip_html_tags(this.props.content))}</h3>
                    </section>
                </section>
            </article>);
            // Logic if the post is the most recent one (can only exist once)
        } else if (this.state.recent) {
            return (<article className={`${styles.recentPost}`} id={this.props.id} style={{
                    background: 'url(' + this.state.img + ')'
                }} onClick={this.openPost}>
                <section className={`${styles.recentTitle}`}>
                    <h1 className={`${styles.recentHeading}`}>{he.decode(this.props.title)}</h1>
                    <h3 className={`${styles.recentSubheading}`}>{he.decode(this.strip_html_tags(this.props.content))}</h3>
                </section>
            </article>);
            // Logic if its a normal post
        } else {
            return (<article className={`${styles.postContainer}`}>
                <section id={this.props.id} className={`${styles.post}`}>
                    <img className={`${styles.postImage}`} src={this.props.thumbnail} alt={this.props.alt} onClick={this.openPost}/>
                    <section className={`${styles.postTitle}`}>
                        <h1 className={`${styles.postHeading}`} onClick={this.openPost}>{he.decode(this.props.title)}</h1>
                        <h3 className={`${styles.postSubheading}`}>{he.decode(this.strip_html_tags(this.props.content))}</h3>
                    </section>
                </section>
            </article>);
        }
    }
}

const styles = {
    recentPost: css({
        width: '100%',
        height: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'flex-start',
        filter: 'grayscale(0.25)',
        ':hover': {
            filter: 'grayscale(0)',
            cursor: 'pointer',
            boxShadow: '0 4px 8px 0 rgba(162, 162, 162, 0.9)'
        },
        '@media (max-width: 768px)': {
            width: '100%',
            height: '300px'
        },
        boxShadow: '0 2px 4px 0 rgba(162, 162, 162, 0.5)'
    }),
    recentTitle: css({
        width: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Zwizz',
        padding: '15px 10px',
        display: 'flex',
        alignSelf: 'flex-end',
        flexDirection: 'column',
        color: 'white'
    }),
    recentHeading: css({
        fontSize: '3em',
        fontWeight: 'bold',
        marginBottom: '0.25em',
        '@media (max-width: 768px)': {
            fontSize: '1.5em',
            fontWeight: 'bold'
        },
        ':hover': {
            cursor: 'pointer'
        }
    }),
    recentSubheading: css({
        fontFamily: 'Noto Serif',
        fontSize: '1.25em',
        fontWeight: 'normal',
        color: constants.colors.fontSecondary,
        '@media (max-width: 768px)': {
            fontWeight: 'normal',
            fontSize: '1em'
        }
    }),
    postContainer: css({
        width: '100%',
        marginBottom: '50px',
        boxShadow: '0 2px 4px 0 rgba(162, 162, 162, 0.5)',
        ':last-of-type': {
            marginBottom: 0
        },
        ':hover': {
            boxShadow: '0 4px 8px 0 rgba(162, 162, 162, 0.9)'
        }
    }),
    post: css({
        display: 'flex',
        flexDirection: 'column',
        '@media (min-width: 1280px)': {
            flexDirection: 'row'
        }
    }),
    postSearch: css({
        display: 'flex',
        flexDirection: 'column',
        '@media (min-width: 1280px)': {
            flexDirection: 'row'
        }
    }),
    postImage: css({
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: 'grayscale(0.25)',
        ':hover': {
            filter: 'grayscale(0)',
            cursor: 'pointer'
        },
        '@media (min-width: 769px)': {
            width: '100%',
            height: '275px'
        },
        '@media (min-width: 1280px)': {
            width: '50%',
            height: '225px'
        }
    }),
    postImageSearch: css({
        width: '100%',
        height: '200px',
        objectFit: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        filter: 'grayscale(0.25)',
        ':hover': {
            filter: 'grayscale(0)',
            cursor: 'pointer'
        },
        '@media (min-width: 769px)': {
            width: '100%',
            height: '275px'
        },
        '@media (min-width: 1280px)': {
            width: '50%',
            height: '350px'
        }
    }),
    postTitle: css({
        padding: '15px 25px',
        backgroundColor: 'white',
        color: constants.colors.font,
        '@media (max-width: 1280px)': {
            padding: '15px 10px'
        },
        '@media (min-width: 1280px)': {
            width: '50%'
        }
    }),
    postHeading: css({
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginBottom: '0.25em',
        ':hover': {
            cursor: 'pointer'
        },
        '@media (min-width: 1280px)': {
            marginBottom: '1em'
        }
    }),
    postSubheading: css({fontFamily: 'Noto Serif', fontWeight: 'normal', color: constants.colors.fontSecondary})
};

export default BlogPost;
