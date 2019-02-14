import React, {Component} from 'react';
import {css} from 'glamor'
// import PageTransition from 'gatsby-plugin-page-transitions';
import Helmet from 'react-helmet'
import he from 'he';
import {graphql} from 'gatsby';

import '../css/reset.css';
import '../css/fonts.css';
import icon from '../img/favicon.ico';
import Header from '../components/Header.jsx';
import Comment from '../components/Comment.jsx';
import Form from '../components/Form.jsx';
import Category from '../components/Category.jsx';

import '../css/blog.css';
let constants = require('../js/constants.js');

class BlogPage extends Component {

    constructor() {
        super();
        this.state = {
            comments: [],
            content: ''
        }
        this.parseStringToHTML.bind(this);
    }

    componentDidMount() {
        this.fetchComments();

        // console.log(document);

        this.parseStringToHTML(this.props.data.wordpressWpBlog.content);
    }

    // asynchronously fetch all the comments for the current post and add it to the comments array in the state
    fetchComments() {
        const c = [];
        fetch('https://wp.gabsii.com/wp-json/wp/v2/comments').then(response => response.json()).then(response => {
            for (var i = 0; i < response.length; i++) {
                if (response[i].post === this.props.data.wordpressWpBlog.wordpress_id) {
                    c.push(response[i]);
                }
            }
            this.setState({comments: c});
        });
    }

    // calculates the time required to read the whole article

    read_time(text) {
        let minutes = Math.floor(text.split(' ').length / 200)

        if (minutes === 0) 
            minutes = 1

        return minutes + ' min'
    }

    parseStringToHTML(txt) {
        let text = txt;

        let parser = new DOMParser();
        let htmlDoc = parser.parseFromString(text, 'text/html');

        // console.log(htmlDoc);

        let images = htmlDoc.getElementsByTagName('img');
        this.changeImageSrc(images);

        this.setState({
            content: htmlDoc.getElementsByTagName('body')[0].innerHTML
        })
    }

    changeImageSrc(images) {
        for (var i = 0; i < images.length; i++) {
            if (images[i].src.indexOf("http://") === 0) {
                images[i].src = images[i].src.replace(/^http:\/\//i, 'https://');
            }

            images[i].dataset.src = images[i].src;
            images[i].src = "";
            images[i].srcset = "";
        }
    }

    insertLazyLoadingScript() {
        const targets = document.querySelectorAll('img');

        const lazyLoad = target => {
            const io = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {

                    if (entry.isIntersecting) {
                        const img = entry.target;
                        const src = img.getAttribute('data-src');

                        img.setAttribute('src', src);
                        img.classList.add('fade');

                        observer.disconnect();
                    }
                });
            });

            io.observe(target)
        };

        targets.forEach(lazyLoad);

    }

    render() {
        const post = this.props.data.wordpressWpBlog;
        if (typeof window !== `undefined`) {
            this.insertLazyLoadingScript();
        }
        return (<div>
            <Helmet title={"Gabsii - " + he.decode(post.title)}>
                <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,700&amp;subset=latin-ext" rel="stylesheet"/>
                <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet"/>
                <link rel="shortcut icon" href={icon} type="image/x-icon"/>
                <link rel="icon" href={icon} type="image/x-icon"/>
                <meta property="og:title" content={`Gabsii | ` + he.decode(post.title)}/>
                <meta property="og:type" content="article"/>
                <meta name="author" content="Lukas Gabsi (Gabsii)"/>
                <html lang="en"/>
                <meta name="description" content={post.excerpt}/>
                <meta name="keywords" content={post.acf.keywords}/>
            </Helmet>
            <div className={`${background}`}>
                <Header type="blogpage"/>
                <main className={`${divider}`}>
                    <div className={`${heroImage}`} style={{
                            background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(' + post.better_featured_image.media_details.sizes.large.source_url + ')'
                        }}>
                        <div className={`${title} ${mobileHidden}`}>
                            <div className={`${categoryContainer}`}>
                                {
                                    post.categories.map((category, index) => {
                                        return (<Category location={this.props.location} category={category} key={index}/>);
                                    })
                                }
                            </div>
                            {he.decode(post.title)}
                            <div className={`${author}`}>
                                <i className={`${italics}`}>by GABSII at {post.date + " "}</i><br/>
                                Reading time: {" "}
                                {this.read_time(post.content)}
                            </div>
                        </div>
                    </div>
                    <section className={`${section}`}>
                        <div className={`${title} ${mobileVisible}`}>
                            <div className={`${categoryContainer}`}>
                                {
                                    post.categories.map((category, index) => {
                                        return (<Category location={this.props.location} category={category} key={index}/>);
                                    })
                                }
                            </div>
                            {he.decode(post.title)}
                            <div className={`${author}`}>
                                <i className={`${italics}`}>
                                    by GABSII at {post.date}
                                </i>
                            </div>
                        </div>
                        <div id="blogContent" className={`${text}`} dangerouslySetInnerHTML={{
                                __html: this.state.content
                            }}></div>
                        <hr style={{
                                marginTop: '2em'
                            }}/>
                    </section>
                    <section className={`${section}`}>
                        <h2 className={`${titleComment}`} style={{
                                color: 'black',
                                marginTop: '-60px',
                                marginBottom: '1em'
                            }}>Comments:
                        </h2>
                        <div>
                            {
                                this.state.comments.length === 0
                                    ? (<div className={`${text}`}>There are currently no comments. Be the first one to write one!</div>)
                                    : (this.state.comments.map((comment, index) => {
                                        return (<Comment key={index} name={he.decode(comment.author_name)} content={comment.content.rendered} date={comment.date}/>);
                                    }))
                            }</div>
                        <hr style={{
                                marginTop: '2em'
                            }}/>
                        <div>
                            <h3 className={`${titleComment}`} style={{
                                    color: 'black',
                                    marginTop: '20px',
                                    marginBottom: '.5em'
                                }}>Write your own comment:
                            </h3>
                            <h6 style={{
                                    fontSize: '0.8em',
                                    color: constants.colors.fontSecondary,
                                    paddingBottom: '10px'
                                }}>Please note that comments need to be
                                <b className={`${bold}`}>{" approved "}</b>
                                first.</h6>
                            <Form id={post.wordpress_id}/>
                        </div>
                    </section>
                </main>
            </div>
        </div>);
    }
}
const background = css({
    backgroundColor: 'white',
    width: '100%',
    fontFamily: 'Zwizz, Arial, Sans-Serif',
    zIndex: 0,
    color: 'black',
    display: 'flex',
    flexGrow: 1,
    minHeight: '100%'
});
const divider = css({position: 'relative', top: 0, wordBreak: 'break-all', width: '100%'});
const heroImage = css({
    width: '100% !important',
    height: 'calc(100vh - 100px) !important',
    objectFit: 'cover !important',
    backgroundPosition: 'center !important',
    backgroundAttachment: 'fixed !important',
    backgroundRepeat: 'no-repeat !important',
    backgroundSize: 'cover !important',
    display: 'flex !important',
    '@media (max-width: 768px)': {
        height: 'calc(100vh - 250px) !important'
    }
});
const section = css({
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
});
const categoryContainer = css({display: 'flex', flexDirection: 'row'});
const author = css({color: constants.colors.fontSecondary, marginTop: '5px', fontSize: '.45em'});
const title = css({
    fontFamily: 'Noto Serif, Georgia, Serif',
    color: 'white',
    display: 'flex',
    alignSelf: 'flex-end',
    flexDirection: 'column',
    borderLeft: '1px solid white',
    fontSize: '40px',
    fontWeight: 'bold',
    padding: '0 .75em',
    margin: '2em 1.5em',
    wordBreak: 'keep-all',
    '@media (max-width: 768px)': {
        margin: '0.5em .5em 1em .5em',
        padding: '0 0.25em',
        borderLeft: '1px solid #EE7778'
    }
});
const titleComment = css({
    fontFamily: 'Noto Serif, Georgia, Serif',
    color: 'black',
    fontSize: '40px',
    fontWeight: 'bold',
    padding: '0 .75em',
    wordBreak: 'keep-all'
});
const mobileHidden = css({
    '@media (max-width: 768px)': {
        visibility: 'hidden'
    }
});
const mobileVisible = css({
    '@media (max-width: 768px)': {
        color: 'black',
        visibility: 'visible'
    },
    '@media (min-width: 768px)': {
        display: 'none'
    }
});
const text = css({fontFamily: 'Noto Serif, Georgia, Serif', color: '#000', wordBreak: 'keep-all'});
const italics = css({fontStyle: 'italic'});
const bold = css({fontWeight: 'bold'});
export default BlogPage;
export const blogPageQuery = graphql `query($wordpress_id: Int!) {
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
                        keywords
                    }
                }
            }`
