import React, {Component} from 'react';
import {css} from 'glamor'

class ScrollDown extends Component {
    render() {
        return (<li className={`${styles.scroll}`}>
            <div className={`${styles.mouse}`}>
                <div className={`${styles.wheel}`}></div>
            </div>
            <div>
                <span className={`${styles.m_scroll_arrows} ${styles.unu}`}></span>
                <span className={`${styles.m_scroll_arrows} ${styles.doi}`}></span>
                <span className={`${styles.m_scroll_arrows} ${styles.trei}`}></span>
            </div>
        </li>);
    }
}

const mouseWheel = {
    '0%': {
        opacity: 1,
        transform: 'translateY(0)'
    },

    '100%': {
        opacity: 0,
        transform: 'translateY(6px)'
    }
};

const mouseScroll = {
    '0%': {
        opacity: 0
    },
    '50%': {
        opacity: 0.5
    },
    '100%': {
        opacity: 1
    }
}

const styles = {
    scroll: css({
        position: 'absolute',
        display: 'block',
        margin: '0 auto',
        width: '24px',
        height: '100px',
        left: '50%',
        bottom: 0,
        transform: 'translate(-50%, -50%)'
    }),
    m_scroll_arrows: css({
        display: 'block',
        transform: 'rotate(45deg)',
        borderRight: '2px solid white',
        borderBottom: '2px solid white',
        margin: '0 0 3px 4px',
        width: '16px',
        height: '16px'
    }),
    unu: css({
        marginTop: '1px',
        animationName: mouseScroll,
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        animationDelay: '0.1s',
        WebkitAnimationDirection: 'alternate'
    }),
    doi: css({
        animationDelay: '0.2s',
        WebkitAnimationDirection: 'alternate',
        marginTop: '-6px',
        animationName: mouseScroll,
        animationDuration: '1s',
        animationIterationCount: 'infinite'
    }),
    trei: css({
        animationDelay: '0.3s',
        WebkitAnimationDirection: 'alternate',
        marginTop: '-6px',
        animationName: mouseScroll,
        animationDuration: '1s',
        animationIterationCount: 'infinite'
    }),
    mouse: css({
        height: '42px',
        width: '24px',
        borderRadius: '14px',
        transform: 'none',
        border: '2px solid white',
        top: '170px'
    }),
    wheel: css({
        display: 'block',
        margin: '5px auto',
        background: 'white',
        position: 'relative',
        height: '4px',
        width: '4px',
        border: '2px solid #fff',
        borderRadius: '8px',
        animationName: mouseWheel,
        animationDuration: '0.6s',
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite'
    })
};

export default ScrollDown;
