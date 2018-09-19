import React, {Component} from 'react';
import {css} from 'glamor';
import {Link} from 'gatsby';

import '../css/header.css';
let constants = require('../js/constants.js');

class Header extends Component {

    constructor() {
        super();
        this.state = {
            input: ''
        }
    }

    // This function removes all unnecessary html tags wordpress sends us
    // that way the user gets them pretty formatted and without unnecessary html tags
    strip_html_tags(str) {
        if ((str === null) || (str === '')) 
            return false;
        else 
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    // javascript triggered CSS animation to transform the hamburger into a X
    animate(event) {
        let hamburger = document.getElementById('hamburger-1');
        hamburger.classList.toggle('is-active');
        if (hamburger.classList.length === 2) {
            document.getElementById("side").style.width = "250px";
            document.getElementById("header").style.marginLeft = "250px";
            document.getElementById("___gatsby").style.marginLeft = "250px";
        } else {
            this.resetAnimation();
        }
    }

    // reset the CSS animation back to defaults
    resetAnimation() {
        document.getElementById("side").style.width = "0";
        document.getElementById("header").style.marginLeft = "0";
        document.getElementById("___gatsby").style.marginLeft = "0";
    }

    // handle input for the search form
    handleChange(event) {
        this.setState({input: event.target.value});
    }

    // handle the submit event for the search form
    submit(event) {
        event.preventDefault();
        console.log(window.location.href);
        let location = window.location.href.split("?")[0];
        // set the search query into the url query
        window.location.href = location + "?q=" + this.state.input;
    }

    render() {
        // idk why these are set in the render method
        let fixed = {
            position: 'fixed',
            backgroundColor: constants.colors.backgroundBlog
        }
        let absolute = {
            position: 'absolute',
            background: 'linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.8))'
        }
        let about = {
            backgroundColor: 'inherit',
            position: 'absolute'
        }
        let aboutText = {
            color: '#FFF'
        }
        let burger = {
            backgroundColor: '#000'
        }
        let aboutBurger = {
            backgroundColor: '#FFF'
        }

        // current page is `/blog`
        if (this.props.type === "blog") {
            return (<header className={`${styles.header}`} id="header" style={fixed}>
                <div className={`${styles.nav}`} onClick={this.animate.bind(this)}>
                    <div className={`${styles.hamburger}`} id="hamburger-1">
                        <span className={`${styles.line}`} style={burger}></span>
                        <span className={`${styles.line}`} style={burger}></span>
                        <span className={`${styles.line}`} style={burger}></span>
                    </div>
                </div>
                <div className={`${styles.logo}`}>
                    <Link className={`${styles.link}`} to="/">
                        <h1 className={`${styles.titleName}`}>Gabsii</h1>
                        <h2 className={`${styles.titleSub}`}>modern.vintage</h2>
                    </Link>
                </div>
                <div className={`${styles.nav} ${styles.search}`}>
                    <div id="wrap">
                        <form action="" autoComplete="off" onSubmit={this.submit.bind(this)}>
                            <input id="search" autoComplete="off" name="query" type="text" placeholder="Search" onChange={this.handleChange.bind(this)}/>
                            <input id="search_submit" value="Rechercher" type="submit"/></form>
                    </div>
                </div>
                <nav className={`${styles.side}`} id="side" style={{
                        width: 0
                    }}>
                    <Link onClick={this.resetAnimation.bind(this)} className={`${styles.sideLink}`} to="/blog">Blog</Link>
                    <Link onClick={this.resetAnimation.bind(this)} className={`${styles.sideLink}`} to="/">Projects</Link>
                    <Link onClick={this.resetAnimation.bind(this)} className={`${styles.sideLink}`} to="/about">About</Link>
                    <div className={`${styles.socialMediaContainer}`}>
                        <a className={`${styles.socialMediaTag} ${styles.instagram}`} href="https://www.instagram.com/omegabsi/">
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                        <a className={`${styles.socialMediaTag} ${styles.snapchat}`} href="https://www.snapchat.com/add/le_gabsi">
                            <i className="fab fa-snapchat-ghost fa-lg"></i>
                        </a>
                        <a className={`${styles.socialMediaTag} ${styles.twitter}`} href="https://twitter.com/G4bsi">
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a className={`${styles.socialMediaTag} ${styles.linkedin}`} href="https://www.linkedin.com/in/lukas-samir-gabsi-734693168/">
                            <i className="fab fa-linkedin-in fa-lg"></i>
                        </a>
                    </div>
                </nav>
            </header>);
            // current page is `/blog/$slug`
        } else if (this.props.type === "blogpage") {
            return (<header className={`${styles.header}`} id="header" style={absolute}>
                <div className={`${styles.nav}`} onClick={this.animate.bind(this)}>
                    <div className={`${styles.hamburger}`} id="hamburger-1">
                        <span className={`${styles.line}`} style={burger}></span>
                        <span className={`${styles.line}`} style={burger}></span>
                        <span className={`${styles.line}`} style={burger}></span>
                    </div>
                </div>
                <div className={`${styles.logo}`}>
                    <Link className={`${styles.link}`} to="/">
                        <h1 className={`${styles.titleName}`}>Gabsii</h1>
                        <h2 className={`${styles.titleSub}`}>modern.vintage</h2>
                    </Link>
                </div>
                <div className={`${styles.nav} ${styles.search}`}>

                    <Link to="/blog" className={`${styles.link}`}>
                        <i className="fas fa-arrow-left fa-2x"></i>
                    </Link>

                </div>
                <nav className={`${styles.side}`} id="side" style={{
                        width: 0
                    }}>
                    <Link onClick={this.resetAnimation.bind(this)} className={`${styles.sideLink}`} to="/blog">Blog</Link>
                    <Link onClick={this.resetAnimation.bind(this)} className={`${styles.sideLink}`} to="/">Projects</Link>
                    <Link onClick={this.resetAnimation.bind(this)} className={`${styles.sideLink}`} to="/about">About</Link>
                    <div className={`${styles.socialMediaContainer}`}>
                        <a className={`${styles.socialMediaTag} ${styles.instagram}`} href="https://www.instagram.com/omegabsi/">
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                        <a className={`${styles.socialMediaTag} ${styles.snapchat}`} href="https://www.snapchat.com/add/le_gabsi">
                            <i className="fab fa-snapchat-ghost fa-lg"></i>
                        </a>
                        <a className={`${styles.socialMediaTag} ${styles.twitter}`} href="https://twitter.com/G4bsi">
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a className={`${styles.socialMediaTag} ${styles.linkedin}`} href="https://www.linkedin.com/in/lukas-samir-gabsi-734693168/">
                            <i className="fab fa-linkedin-in fa-lg"></i>
                        </a>
                    </div>
                </nav>
            </header>);
            // current page is `/about`
        } else if (this.props.type === "about") {
            return (<header className={`${styles.header}`} id="header" style={about}>
                <div className={`${styles.nav}`} onClick={this.animate.bind(this)}>
                    <div className={`${styles.hamburger}`} id="hamburger-1">
                        <span className={`${styles.line}`} style={aboutBurger}></span>
                        <span className={`${styles.line}`} style={aboutBurger}></span>
                        <span className={`${styles.line}`} style={aboutBurger}></span>
                    </div>
                </div>
                <div className={`${styles.logo}`}>
                    <Link className={`${styles.link}`} to="/">
                        <h1 className={`${styles.titleName}`} style={aboutText}>Lukas Gabsi</h1>
                        <h2 className={`${styles.titleSub}`} style={aboutText}>ルーカス ガブシ</h2>
                    </Link>
                </div>
                <div className={`${styles.nav} ${styles.search}`}>
                    <Link to="/" className={`${styles.link}`}>
                        <i style={{
                                color: 'white'
                            }} className="fas fa-arrow-left fa-2x"></i>
                    </Link>
                </div>
                <nav className={`${styles.side}`} id="side" style={{
                        width: 0
                    }}>
                    <Link onClick={this.resetAnimation.bind(this)} className={`${styles.sideLink}`} to="/blog">Blog</Link>
                    <Link onClick={this.resetAnimation.bind(this)} className={`${styles.sideLink}`} to="/">Projects</Link>
                    <Link onClick={this.resetAnimation.bind(this)} className={`${styles.sideLink}`} to="/about">About</Link>
                    <div className={`${styles.socialMediaContainer}`}>
                        <a className={`${styles.socialMediaTag} ${styles.instagram}`} href="https://www.instagram.com/omegabsi/">
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                        <a className={`${styles.socialMediaTag} ${styles.snapchat}`} href="https://www.snapchat.com/add/le_gabsi">
                            <i className="fab fa-snapchat-ghost fa-lg"></i>
                        </a>
                        <a className={`${styles.socialMediaTag} ${styles.twitter}`} href="https://twitter.com/G4bsi">
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a className={`${styles.socialMediaTag} ${styles.linkedin}`} href="https://www.linkedin.com/in/lukas-samir-gabsi-734693168/">
                            <i className="fab fa-linkedin-in fa-lg"></i>
                        </a>
                    </div>
                </nav>
            </header>);
        }
    }
}
const styles = {
    header: css({
        height: '100px',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 5px 0 rgba(0,0,0,0.14), 0 1px 10px 0 rgba(0,0,0,0.12), 0 2px 4px -1px rgba(0,0,0,0.2)'
    }),
    logo: css({display: 'flex', flexDirection: 'column', fontFamily: 'Zwizz'}),
    nav: css({display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}),
    hamburger: css({
        marginLeft: '50px',
        ':hover': {
            cursor: 'pointer'
        }
    }),
    line: css({
        width: '50px',
        height: '5px',
        borderRadius: '10px',
        display: 'block',
        margin: '8px 0',
        transition: 'all 0.3s ease-in-out'
    }),
    search: css({marginRight: '50px'}),
    search_bar: css({
        width: '75px',
        border: 'none',
        outline: 'none',
        borderRadius: '55px',
        fontSize: '1.5em',
        color: '#0D2840',
        padding: '25px 70px 25px 35px',
        transition: 'all 0.3s cubic-bezier(0,0,.5,1.5)',
        boxShadow: '0 3px 10px -2px rgba(0,0,0,.1)',
        background: 'rgb(255, 255, 255) url(https://i.imgur.com/seveWIw.png) no-repeat center center',
        ':focus': {
            width: '100%',
            backgroundPosition: 'calc(100% - 35px) center'
        },
        '::-webkit-search-cancel-button': {
            WebkitAppearance: 'none'
        },
        '::-webkit-input-placeholder': {
            color: '#0D2840',
            opacity: .5
        },
        ':-moz-placeholder': {
            color: '#0D2840',
            opacity: .5
        },
        '::-moz-placeholder': {
            color: '#0D2840',
            opacity: .5
        },
        ':-ms-input-placeholder': {
            color: '#0D2840',
            opacity: .5
        }
    }),
    side: css({
        height: 'calc(100% - 50px)',
        position: 'fixed',
        zIndex: 100,
        top: 0,
        left: 0,
        background: '#4E4E4E',
        overflowX: 'hidden',
        paddingTop: '50px',
        transition: '0.5s',
        display: 'flex',
        flexDirection: 'column'
    }),
    sideLink: css({
        padding: '25px 10px',
        color: 'white',
        textDecoration: 'none',
        ':hover': {
            color: constants.colors.fontSecondary
        }
    }),
    titleName: css({fontWeight: 'bold', fontSize: '2.25em'}),
    titleSub: css({fontWeight: 'normal', fontSize: '1em', margin: 0}),
    link: css({
        color: constants.colors.font,
        textDecoration: 'none',
        ':visited': {
            color: constants.colors.font
        },
        ':hover': {
            color: constants.colors.fontSecondary
        }
    }),
    socialMediaContainer: css({
        width: 'calc(100% - 50px)',
        position: 'absolute',
        bottom: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 25px',
        height: '2em'
    }),
    socialMediaTag: css({color: 'white'}),
    snapchat: css({
        ':hover': {
            color: '#FFFC00'
        }
    }),
    instagram: css({
        ':hover': {
            color: '#E4405F'
        }
    }),
    linkedin: css({
        ':hover': {
            color: '#0077B5'
        }
    }),
    twitter: css({
        ':hover': {
            color: '#55ACEE'
        }
    })
};

export default Header;
