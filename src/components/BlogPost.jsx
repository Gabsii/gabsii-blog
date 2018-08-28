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
        this.setState({img: this.props.thumbnail, id: this.props.id});
    }

    openPost(e, i) {
        e.preventDefault();
        window.location = 'http://localhost/blog/' + this.state.id;
    }

    strip_html_tags(str) {
        if ((str === null) || (str === '')) 
            return false;
        else 
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    render() {
        // console.log(this.strip_html_tags(this.props.content).slice(0,50));
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
        return (<article className={css(
                this.state.oldest
                ? styles.postContainerOldest
                : styles.postContainer)}>
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
            cursor: 'pointer'
        },
        '@media (max-width: 769px)': {
            width: '100%',
            height: '300px'
        }
    },
    recentTitle: {
        width: '100%',
        background: 'rgba(0, 0, 0, 0.5)',
        fontFamily: 'Zwizz',
        padding: '15px 10px',
        display: 'flex',
        alignSelf: 'flex-end',
        flexDirection: 'column'
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
        fontSize: '1.25em',
        fontWeight: 'normal',
        color: constants.colors.fontSecondary
    },
    postContainer: {
        width: '100%',
        marginBottom: '50px'
    },
    postContainerOldest: {
        width: '100%'
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
        fontWeight: 'normal',
        color: constants.colors.fontSecondary
    }
});

export default BlogPost;
