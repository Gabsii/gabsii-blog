import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

let constants = require('../js/constants.js');

class BlogPost extends Component {

    constructor() {
        super();
        this.state = {
            recent: false,
            oldest: false,
            img: '',
            id: 0
        }
        this.openPost = this.openPost.bind(this);
    }

    componentDidMount() {
        if (this.props.recent !== undefined && this.props.recent !== null && this.props.recent === true) {
            this.setState({recent: true});
        }
        if (this.props.oldest !== undefined && this.props.oldest !== null && this.props.oldest === true) {
            this.setState({oldest: true});
        }
        this.setState({img: this.props.thumbnail, id: this.props.id, slug: this.props.slug});
    }

    openPost(e, i) {
        e.preventDefault();
        window.location = 'http://localhost:8000/blog/' + this.state.slug;
    }

    strip_html_tags(str) {
        if ((str === null) || (str === '')) 
            return false;
        else 
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    render() {
        if (this.state.recent) {
            return (<article className={css(styles.recentPost)} id={this.props.id} style={{
                    background: 'url(' + this.state.img + ')'
                }} onClick={this.openPost}>
                <section className={css(styles.recentTitle)}>
                    <h1 className={css(styles.recentHeading)}>{this.props.title}</h1>
                    <h3 className={css(styles.recentSubheading)}>{this.strip_html_tags(this.props.content)}</h3>
                </section>
            </article>);
        }
        return (<article className={css(styles.postContainer)}>
            <section id={this.props.id} className={css(styles.post)}>
                <img className={css(styles.postImage)} src={this.props.thumbnail} alt={this.props.alt} onClick={this.openPost}/>
                <section className={css(styles.postTitle)}>
                    <h1 className={css(styles.postHeading)} onClick={this.openPost}>{this.props.title}</h1>
                    <h3 className={css(styles.postSubheading)}>{this.strip_html_tags(this.props.content)}</h3>
                </section>
            </section>
        </article>);
    }
}

const styles = StyleSheet.create({
    recentPost: {
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
        '@media (max-width: 769px)': {
            width: '100%',
            height: '300px'
        },
        boxShadow: '0 2px 4px 0 rgba(162, 162, 162, 0.5)'
    },
    recentTitle: {
        width: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Zwizz',
        padding: '15px 10px',
        display: 'flex',
        alignSelf: 'flex-end',
        flexDirection: 'column',
        color: 'white'
    },
    recentHeading: {
        fontSize: '3em',
        fontWeight: 'bold',
        marginBottom: '0.25em',
        ':hover': {
            cursor: 'pointer'
        }
    },
    recentSubheading: {
        fontFamily: 'Noto Serif',
        fontSize: '1.25em',
        fontWeight: 'normal',
        color: constants.colors.fontSecondary
    },
    postContainer: {
        width: '100%',
        marginBottom: '50px',
        boxShadow: '0 2px 4px 0 rgba(162, 162, 162, 0.5)',
        ':last-of-type': {
            marginBottom: 0
        },
        ':hover': {
            boxShadow: '0 4px 8px 0 rgba(162, 162, 162, 0.9)'
        }
    },
    post: {
        display: 'flex',
        flexDirection: 'column',
        '@media (min-width: 1280px)': {
            flexDirection: 'row'
        }
    },
    postImage: {
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
    },
    postTitle: {
        padding: '15px 25px',
        backgroundColor: 'white',
        color: constants.colors.font,
        '@media (max-width: 1280px)': {
            padding: '15px 10px'
        }
    },
    postHeading: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginBottom: '0.25em',
        ':hover': {
            cursor: 'pointer'
        },
        '@media (min-width: 1280px)': {
            marginBottom: '1em'
        }
    },
    postSubheading: {
        fontFamily: 'Noto Serif',
        fontWeight: 'normal',
        color: constants.colors.fontSecondary
    }
});

export default BlogPost;
