import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

let constants = require('../js/constants.js');

class Blog extends Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (<div className={css(styles.background)}>
            Hello World
        </div>);
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: constants.colors.background,
        minHeight: 'calc(100% - 50px)',
        minWidth: 'calc(100% - 50px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: '25px',
        fontFamily: 'Zwizz',
        color: constants.colors.font
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
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
    }
});

export default Blog;
