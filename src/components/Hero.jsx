import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import ScrollDown from './ScrollDown';

let constants = require('../js/constants.js');

class Hero extends Component {
    render() {
        return (<div className={css(styles.background)}>
            <nav>
                <ul>
                    <li className={css(styles.rotateLeft, styles.navItem)}>
                        <a className={css(styles.link)} href="/about">ABOUT</a>
                    </li>
                    <li className={css(styles.rotateRight, styles.navItem)}>
                        <a className={css(styles.link)} href="/blog">BLOG</a>
                    </li>
                    <ScrollDown/>
                </ul>
            </nav>
            <div className={css(styles.title)}>
                <h1 className={css(styles.titleName)}>Gabsii</h1>
                <h2 className={css(styles.titleSub)}>modern.vintage</h2>
            </div>
        </div>);
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: constants.colors.background,
        minHeight: 'calc(100vh - 50px)',
        minWidth: 'calc(100% - 50px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '25px',
        fontFamily: 'Zwizz',
        color: constants.colors.font
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '5px'
    },
    titleName: {
        fontSize: '5em',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
    },
    titleSub: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        letterSpacing: '5px'
    },
    navItem: {
        ':hover': {
            backgroundColor: 'white',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            cursor: 'pointer',
            ':before': {
                content: "'> '"
            }
        },
        padding: '5px'
    },
    rotateLeft: {
        transform: 'rotate(-90deg)',
        position: 'absolute',
        left: 0
    },
    rotateRight: {
        transform: 'rotate(90deg)',
        position: 'absolute',
        right: 0
    },
    link: {
        color: constants.colors.font,
        textDecoration: 'none',
        ':visited': {
            color: constants.colors.font
        },
        // letterSpacing: '3px',
        // fontFamily: 'Montserrat, sans-serif',
        // fontWeight: 200,
    }
});

export default Hero;
