import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
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
        console.log(hamburger);
        hamburger.classList.toggle('is-active');
        console.log();
        if (hamburger.classList.length == 2) {
            document.getElementById("side").style.width = "250px";
            document.getElementById("header").style.marginLeft = "250px";
            document.getElementById("root").style.marginLeft = "250px";
            // document.getElementById("root").style.filter = "blur(10px)";
        } else {
            document.getElementById("side").style.width = "0";
            document.getElementById("header").style.marginLeft = "0";
            document.getElementById("root").style.marginLeft = "0";
            // document.getElementById("root").style.filter = "blur(0)";

        }
    }

    render() {
        // console.log(this.strip_html_tags(this.props.content).slice(0,50));
        let fixed = {
            position: 'fixed',
            backgroundColor: constants.colors.backgroundBlog
        }
        let absolute = {
            position: 'absolute',
            background: 'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,0.2))'
        }
        console.log(fixed);
        return (<header className={css(styles.header)} id="header" style={this.props.fixed
                ? fixed
                : absolute
}>
            <div className={css(styles.nav)} onClick={this.animate.bind(this)}>
                <div className={css(styles.hamburger)} id="hamburger-1">
                    <span className={css(styles.line)}></span>
                    <span className={css(styles.line)}></span>
                    <span className={css(styles.line)}></span>
                </div>
            </div>
            <div className={css(styles.logo)}>
                <a className={css(styles.link)} href="/blog">
                    <h1 className={css(styles.titleName)}>Gabsii</h1>
                    <h2 className={css(styles.titleSub)}>modern.vintage</h2>
                </a>
            </div>
            <div className={css(styles.nav, styles.search)}>
                <i className="fas fa-search fa-2x"></i>
            </div>
            <nav className={css(styles.side)} id="side" style={{
                    width: 0
                }}>
                <a className={css(styles.sideLink)} href="/blog">Home</a>
                <a className={css(styles.sideLink)} href="/">Projects</a>
                <a className={css(styles.sideLink)} href="/about">About</a>
                <div className={css(styles.socialMediaContainer)}>
                    <a className={css(styles.socialMediaTag, styles.instagram)} href="https://www.instagram.com/omegabsi/">
                        <i class="fab fa-instagram fa-lg"></i>
                    </a>
                    <a className={css(styles.socialMediaTag, styles.snapchat)} href="https://www.snapchat.com/add/le_gabsi">
                        <i class="fab fa-snapchat-ghost fa-lg"></i>
                    </a>
                    <a className={css(styles.socialMediaTag, styles.twitter)} href="https://twitter.com/G4bsi">
                        <i class="fab fa-twitter fa-lg"></i>
                    </a>
                    <a className={css(styles.socialMediaTag, styles.linkedin)} href="https://www.linkedin.com/in/lukas-samir-gabsi-734693168/">
                        <i class="fab fa-linkedin-in fa-lg"></i>
                    </a>
                </div>
            </nav>
        </header>);
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
        alignItems: 'center',
        // alignSelf: 'flex-start'
    },
    hamburger: {
        ':hover': {
            cursor: 'pointer'
        }
    },
    line: {
        width: '50px',
        height: '5px',
        backgroundColor: '#000',
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
        padding: '0 25px'
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
