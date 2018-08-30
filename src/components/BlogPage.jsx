import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import Header from './Header.jsx';
import '../css/blog.css';

let constants = require('../js/constants.js');

class BlogPage extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            post: {},
            author: {},
            categories: [],
            loaded: false
        }
    }

    componentWillMount() {
        this.setState({id: this.props.match.params.id});
    }

    componentDidMount() {
        let blogpostsURL = "http://localhost:8001/wp-json/wp/v2/blog/" + this.state.id;
        fetch(blogpostsURL).then(response => response.json()).then(response => this.setState({post: response, loaded: true})).then(response => {
            let authorURL = "http://localhost:8001/wp-json/wp/v2/users/" + this.state.post.author;
            fetch(authorURL).then(response => response.json()).then(response => this.setState({author: response}));
            let urls = [];
            for (var i = 0; i < this.state.post.categories.length; i++) {
                urls[i] = "http://localhost:8001/wp-json/wp/v2/categories/" + this.state.post.categories[i];
            }
            console.log(response);

            Promise.all(urls.map(url => fetch(url).then(response => response.json()))).then(response => {
                this.setState({categories: response});
            })
        }).catch(response => {
            console.log(response);
        });
    }

    render() {
        if (this.state.loaded) {
            console.log(this.state);
            return (<div className={css(styles.background)}>
                <Header fixed={false}/>
                <main className={css(styles.divider)}>
                    <div className={css(styles.heroImage)} style={{
                            background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(' + this.state.post.better_featured_image.media_details.sizes.large.source_url + ')'
                        }}>
                        <div className={css(styles.title)}>
                            <div className={css(styles.categoryContainer)}>
                                {
                                    this.state.categories.map((category, index) => {
                                        return (<div className={css(styles.category)} key={index}>{category.name}</div>);
                                    })
                                }
                            </div>
                            {/* if too small position under img ??? */
                                this.state.post.title.rendered
                            }
                            <div className={css(styles.author)}>by {String(this.state.author.name).toUpperCase() + " "}
                                at {new Date(Date.parse(this.state.post.date)).toLocaleDateString("en-US")}</div>
                        </div>
                    </div>
                    <section className={css(styles.section)}>
                        <div id="blogContent" className={css(styles.text)} dangerouslySetInnerHTML={{
                                __html: this.state.post.content.rendered
                            }}></div>
                        <hr style={{
                                marginTop: '2em'
                            }}/>
                    </section>
                </main>
            </div>);
        } else {
            return (<div className={css(styles.background)}>
                <Header/>
                <main className={css(styles.divider)}>
                    <div>Loading...</div>
                </main>
            </div>)
        }
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: constants.colors.font,
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
        marginTop: '100px',
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
        display: 'flex'
    },
    section: {
        zIndex: 100,
        color: 'white',
        maxWidth: '750px',
        marginLeft: 'auto',
        marginRight: 'auto',
        filter: 'brightness(1)',
        padding: '50px 14px'
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
        margin: '2em 1.5em'
    },
    text: {
        fontFamily: 'Noto Serif',
        color: '#000',
        wordBreak: 'break-word'
    }
});

export default BlogPage;
