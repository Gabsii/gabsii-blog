import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

let constants = require('../js/constants.js');

class Header extends Component {

    strip_html_tags(str) {
        if ((str === null) || (str === '')) 
            return false;
        else 
            str = str.toString();
        return str.replace(/<[^>]*>/g, '');
    }

    render() {
        // console.log(this.strip_html_tags(this.props.content).slice(0,50));
        return (<header className={css(styles.header)} style={this.props.fixed
                ? {
                    position: 'fixed'
                }
                : {
                    position: 'absolute'
                }}>
            <div className={css(styles.nav)}>{/* logo */}</div>
            <div className={css(styles.logo)}>
                <a className={css(styles.link)} href="/blog">
                    <h1 className={css(styles.titleName)}>Gabsii</h1>
                    <h2 className={css(styles.titleSub)}>modern.vintage</h2>
                </a>
            </div>
            <nav className={css(styles.nav)}>
                <a className={css(styles.link)} href="/">Home</a>
                <a className={css(styles.link)} href="/about">About</a>
            </nav>
        </header>);
    }
}

const styles = StyleSheet.create({
    header: {
        height: '100px',
        width: '100%',
        // position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: constants.colors.backgroundLite
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        fontFamily: 'Zwizz',
        flexGrow: 7
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
    nav: {
        flexGrow: 1
    },
    link: {
        color: constants.colors.font,
        textDecoration: 'none',
        marginLeft: '50px',
        ':visited': {
            color: constants.colors.font
        },
        ':hover': {
            color: constants.colors.fontSecondary
        }
    }
});

export default Header;
