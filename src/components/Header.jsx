import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import Link from 'gatsby-link'

import '../css/hamburger.css';
let constants = require('../js/constants.js');

class Header extends Component {

    strip_html_tags(str) {
        if ((str === null) || (str === '')) 
            return false;
        else 
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    animate(event) {
        let hamburger = document.getElementById('hamburger-1');
        hamburger.classList.toggle('is-active');
        if (hamburger.classList.length == 2) {
            document.getElementById("side").style.width = "250px";
            document.getElementById("header").style.marginLeft = "250px";
            document.getElementById("___gatsby").style.marginLeft = "250px";
        } else {
            document.getElementById("side").style.width = "0";
            document.getElementById("header").style.marginLeft = "0";
            document.getElementById("___gatsby").style.marginLeft = "0";
        }
    }

    render() {
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

        if (this.props.type === "blog") {
            return (<header className={css(styles.header)} id="header" style={fixed}>
                <div className={css(styles.nav)} onClick={this.animate.bind(this)}>
                    <div className={css(styles.hamburger)} id="hamburger-1">
                        <span className={css(styles.line)} style={burger}></span>
                        <span className={css(styles.line)} style={burger}></span>
                        <span className={css(styles.line)} style={burger}></span>
                    </div>
                </div>
                <div className={css(styles.logo)}>
                    <Link className={css(styles.link)} to="/">
                        <h1 className={css(styles.titleName)}>Gabsii</h1>
                        <h2 className={css(styles.titleSub)}>modern.vintage</h2>
                    </Link>
                </div>
                <div className={css(styles.nav, styles.search)}>

                    <i className="fas fa-search fa-2x"></i>)

                </div>
                <nav className={css(styles.side)} id="side" style={{
                        width: 0
                    }}>
                    <Link className={css(styles.sideLink)} to="/blog">Blog</Link>
                    <Link className={css(styles.sideLink)} to="/">Projects</Link>
                    <Link className={css(styles.sideLink)} to="/about">About</Link>
                    <div className={css(styles.socialMediaContainer)}>
                        <a className={css(styles.socialMediaTag, styles.instagram)} href="https://www.instagram.com/omegabsi/">
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                        <a className={css(styles.socialMediaTag, styles.snapchat)} href="https://www.snapchat.com/add/le_gabsi">
                            <i className="fab fa-snapchat-ghost fa-lg"></i>
                        </a>
                        <a className={css(styles.socialMediaTag, styles.twitter)} href="https://twitter.com/G4bsi">
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a className={css(styles.socialMediaTag, styles.linkedin)} href="https://www.linkedin.com/in/lukas-samir-gabsi-734693168/">
                            <i className="fab fa-linkedin-in fa-lg"></i>
                        </a>
                    </div>
                </nav>
            </header>);
        } else if (this.props.type === "blogpage") {
            return (<header className={css(styles.header)} id="header" style={absolute}>
                <div className={css(styles.nav)} onClick={this.animate.bind(this)}>
                    <div className={css(styles.hamburger)} id="hamburger-1">
                        <span className={css(styles.line)} style={burger}></span>
                        <span className={css(styles.line)} style={burger}></span>
                        <span className={css(styles.line)} style={burger}></span>
                    </div>
                </div>
                <div className={css(styles.logo)}>
                    <Link className={css(styles.link)} to="/">
                        <h1 className={css(styles.titleName)}>Gabsii</h1>
                        <h2 className={css(styles.titleSub)}>modern.vintage</h2>
                    </Link>
                </div>
                <div className={css(styles.nav, styles.search)}>

                    <a href="/blog" className={css(styles.link)}>
                        <i className="fas fa-arrow-left fa-2x"></i>
                    </a>

                </div>
                <nav className={css(styles.side)} id="side" style={{
                        width: 0
                    }}>
                    <Link className={css(styles.sideLink)} to="/blog">Blog</Link>
                    <Link className={css(styles.sideLink)} to="/">Projects</Link>
                    <Link className={css(styles.sideLink)} to="/about">About</Link>
                    <div className={css(styles.socialMediaContainer)}>
                        <a className={css(styles.socialMediaTag, styles.instagram)} href="https://www.instagram.com/omegabsi/">
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                        <a className={css(styles.socialMediaTag, styles.snapchat)} href="https://www.snapchat.com/add/le_gabsi">
                            <i className="fab fa-snapchat-ghost fa-lg"></i>
                        </a>
                        <a className={css(styles.socialMediaTag, styles.twitter)} href="https://twitter.com/G4bsi">
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a className={css(styles.socialMediaTag, styles.linkedin)} href="https://www.linkedin.com/in/lukas-samir-gabsi-734693168/">
                            <i className="fab fa-linkedin-in fa-lg"></i>
                        </a>
                    </div>
                </nav>
            </header>);
        } else if (this.props.type === "about") {
            return (<header className={css(styles.header)} id="header" style={about}>
                <div className={css(styles.nav)} onClick={this.animate.bind(this)}>
                    <div className={css(styles.hamburger)} id="hamburger-1">
                        <span className={css(styles.line)} style={aboutBurger}></span>
                        <span className={css(styles.line)} style={aboutBurger}></span>
                        <span className={css(styles.line)} style={aboutBurger}></span>
                    </div>
                </div>
                <div className={css(styles.logo)}>
                    <Link className={css(styles.link)} to="/">
                        <h1 className={css(styles.titleName)} style={aboutText}>Lukas Gabsi</h1>
                        <h2 className={css(styles.titleSub)} style={aboutText}>ルーカス ガブシ</h2>
                    </Link>
                </div>
                <div className={css(styles.nav, styles.search)}></div>
                <nav className={css(styles.side)} id="side" style={{
                        width: 0
                    }}>
                    <Link className={css(styles.sideLink)} to="/blog">Blog</Link>
                    <Link className={css(styles.sideLink)} to="/">Projects</Link>
                    <Link className={css(styles.sideLink)} to="/about">About</Link>
                    <div className={css(styles.socialMediaContainer)}>
                        <a className={css(styles.socialMediaTag, styles.instagram)} href="https://www.instagram.com/omegabsi/">
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                        <a className={css(styles.socialMediaTag, styles.snapchat)} href="https://www.snapchat.com/add/le_gabsi">
                            <i className="fab fa-snapchat-ghost fa-lg"></i>
                        </a>
                        <a className={css(styles.socialMediaTag, styles.twitter)} href="https://twitter.com/G4bsi">
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a className={css(styles.socialMediaTag, styles.linkedin)} href="https://www.linkedin.com/in/lukas-samir-gabsi-734693168/">
                            <i className="fab fa-linkedin-in fa-lg"></i>
                        </a>
                    </div>
                </nav>
            </header>);
        }
    }
}

const styles = StyleSheet.create({
    header: {
        height: '100px',
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'space-between'
    },
    logo: {
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Zwizz'
    },
    nav: {
        marginLeft: '50px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    hamburger: {
        ':hover': {
            cursor: 'pointer'
        }
    },
    line: {
        width: '50px',
        height: '5px',
        borderRadius: '10px',
        display: 'block',
        margin: '8px 0',
        transition: 'all 0.3s ease-in-out'
    },
    search: {
        marginRight: '50px'
    },
    side: {
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
    },
    sideLink: {
        padding: '25px 10px',
        color: 'white',
        textDecoration: 'none',
        ':hover': {
            color: constants.colors.fontSecondary
        }
    },
    titleName: {
        fontWeight: 'bold',
        fontSize: '2.25em'
    },
    titleSub: {
        fontWeight: 'normal',
        fontSize: '1em',
        margin: 0
    },
    link: {
        color: constants.colors.font,
        textDecoration: 'none',
        ':visited': {
            color: constants.colors.font
        },
        ':hover': {
            color: constants.colors.fontSecondary
        }
    },
    socialMediaContainer: {
        width: 'calc(100% - 50px)',
        position: 'absolute',
        bottom: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 25px',
        height: '2em'
    },
    socialMediaTag: {
        color: 'white'
    },
    snapchat: {
        ':hover': {
            color: '#FFFC00'
        }
    },
    instagram: {
        ':hover': {
            color: '#E4405F'
        }
    },
    linkedin: {
        ':hover': {
            color: '#0077B5'
        }
    },
    twitter: {
        ':hover': {
            color: '#55ACEE'
        }
    }
});

export default Header;
