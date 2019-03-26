import React, {Component} from 'react';
import {css} from 'glamor'
import he from 'he';
import LazyLoad from 'react-lazyload';

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
            id: 0,
            marginHeight: 0
        }
        this.getPostURL = this.getPostURL.bind(this);
        this.getPostURLSearch = this.getPostURLSearch.bind(this);

        this.myRef = React.createRef();
    }

    componentDidMount() {
        // All state-critical variables are set via props (except search)
        //
        // Checks if the current post is the most recently uploaded one
        if (this.props.recent !== undefined && this.props.recent !== null && this.props.recent === true) {
            this.setState({
                recent: true
            }, () => {
                // const marginHeight = setTimeout(() => {
                //     console.log(this.myRef.current.clientHeight);
                //     return this.myRef.current.clientHeight;
                // }, 300).then(() => {
                //     this.setState({marginHeight: marginHeight});
                // });

                new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(this.myRef.current.clientHeight);
                    }, 10);
                }).then((res) => {
                    this.setState({marginHeight: res});
                });

            });
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

    getPostURL() {
        // Setting the location via window because im lazy lmao
        let url;
        if (typeof window !== `undefined`) {
            url = window.location.toString();
        }
        let lastChar = url.substr(-1); // Selects the last character
        if (lastChar !== '/') { // If the last character is not a slash
            url = url + '/'; // Append a slash to it.
        }
        return url + this.state.slug;
    }

    // open Post in search

    getPostURLSearch() {
        // Setting the location via window because im lazy lmao
        let url;
        if (typeof window !== `undefined`) {
            url = window.location.origin;
        }
        let lastChar = url.substr(-1); // Selects the last character
        if (lastChar !== '/') { // If the last character is not a slash
            url = url + '/'; // Append a slash to it.
        }
        console.log(this);
        return url + "blog/" + this.state.slug;
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

    // Logic if the query parameter is set in the window (?q=xxx)
    renderSearchPost() {
        return (<article className={`${styles.postContainer}`}>
            <a className={`${styles.link}`} href={this.getPostURLSearch()}>
                <LazyLoad height='100%' offset={100} once={true}>
                    <section id={this.props.id} className={`${styles.postSearch}`}>
                        <img className={`${styles.postImageSearch}`} src={this.props.thumbnail} alt={this.props.alt}/>
                        <section className={`${styles.postTitle}`}>
                            <h1 className={`${styles.postHeading}`}>{he.decode(this.props.title)}</h1>
                            <h3 className={`${styles.postSubheading}`}>{he.decode(this.strip_html_tags(this.props.content))}</h3>
                        </section>
                    </section>
                </LazyLoad>
            </a>
        </article>);
    }

    // Logic if the post is the most recent one (can only exist once)
    renderRecentPost() {
        return (<a className={`${styles.link}`} href={this.getPostURL()}>
            <LazyLoad height='100%' offset={100} once={true}>
                <article className={`${styles.recentPost}`} id={this.props.id} style={{
                        backgroundImage: 'url(' + this.state.img + ')',
                        marginBottom: this.state.marginHeight + 25
                    }}>
                    <section className={`${styles.recentTitle}`} ref={this.myRef}>
                        <h1 className={`${styles.recentHeading}`}>{he.decode(this.props.title)}</h1>
                        <h3 className={`${styles.recentSubheading}`}>{he.decode(this.strip_html_tags(this.props.content))}</h3>
                    </section>
                </article>
            </LazyLoad>
        </a>);
    }

    // Logic if its a normal post
    renderNormalPost() {
        return (<article className={`${styles.postContainer}`}>
            <a className={`${styles.link}`} href={this.getPostURL()}>
                <LazyLoad height='100%' offset={100} once={true}>
                    <section id={this.props.id} className={`${styles.post}`}>
                        <img className={`${styles.postImage}`} src={this.props.thumbnail} alt={this.props.alt}/>
                        <section className={`${styles.postTitle}`}>
                            <h1 className={`${styles.postHeading}`}>{he.decode(this.props.title)}</h1>
                            <h3 className={`${styles.postSubheading}`}>{he.decode(this.strip_html_tags(this.props.content))}</h3>
                        </section>
                    </section>
                </LazyLoad>
            </a>
        </article>);
    }

    render() {
        if (this.state.search) {
            return this.renderSearchPost();
        } else if (this.state.recent) {
            return this.renderRecentPost();
        } else {
            return this.renderNormalPost();
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
        filter: 'grayscale(1)',
        transition: 'all 1s ease',
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
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        padding: '15px 10px',
        display: 'flex',
        alignSelf: 'flex-end',
        flexDirection: 'column',
        color: 'white',
        '@media (max-width: 768px)': {
            transform: 'translateY(100%)'
        }
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
        fontFamily: 'Noto Serif, Georgia, Serif',
        fontSize: '1.25em',
        fontWeight: 'normal',
        color: constants.colors.fontSecondary,
        '@media (max-width: 768px)': {
            fontWeight: 'normal',
            fontSize: '1em',
            color: 'white'
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
        filter: 'grayscale(1)',
        transition: 'all 1s ease',
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
        filter: 'grayscale(1)',
        transition: 'all 1s ease',
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
    postSubheading: css({fontFamily: 'Noto Serif, Georgia, Serif', fontWeight: 'normal', color: constants.colors.fontSecondary}),
    link: css({textDecoration: 'none'})
};

export default BlogPost;
