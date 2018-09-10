import React, {Component} from 'react';
import {css} from 'glamor'
import Link from 'gatsby-link'

import ScrollDown from './ScrollDown';

let constants = require('../js/constants.js');

export default({data}) => {
    return (<div className={`${styles.background}`}>
        <nav>
            <ul>
                <li className={`${styles.rotateLeft} ${styles.navItem}`}>
                    <Link className={`${styles.link}`} to="/about">ABOUT</Link>
                </li>
                <li className={`${styles.rotateRight} ${styles.navItem}`}>
                    <Link className={`${styles.link}`} to="/blog">BLOG</Link>
                </li>
                <ScrollDown/>
            </ul>
        </nav>
        <div className={`${styles.title}`}>
            <h1 className={`${styles.titleName}`}>Gabsii</h1>
            <h2 className={`${styles.titleSub}`}>modern.vintage</h2>
        </div>
    </div>);

}

const styles = {
    background: css({
        backgroundColor: constants.colors.background,
        minHeight: 'calc(100vh - 50px)',
        minWidth: 'calc(100% - 50px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '25px',
        fontFamily: 'Zwizz',
        color: 'white'
    }),
    title: css({
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '5px'
    }),
    titleName: css({fontSize: '5em', fontWeight: 'bold', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}),
    titleSub: css({fontSize: '1.5em', fontWeight: 'bold', letterSpacing: '5px'}),
    navItem: css({
        ':hover': {
            backgroundColor: 'white',
            textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
            cursor: 'pointer',
            ':before': {
                content: "'> '"
            }
        },
        padding: '5px'
    }),
    rotateLeft: css({transform: 'rotate(-90deg)', position: 'absolute', left: 0}),
    rotateRight: css({transform: 'rotate(90deg)', position: 'absolute', right: 0}),
    link: css({
        color: 'white',
        textDecoration: 'none',
        ':visited': {
            color: 'white'
        }
    })
};
