import React, {Component} from 'react'
import {css} from 'glamor'

class Skill extends Component {

    render() {

        return (<li id={this.props.name} className={`${styles.skills}`} style={{
                backgroundColor: this.props.color
            }}>
            <a target="_blank" href={this.props.href} className={`${styles.link}`}>
                <i style={{
                        opacity: '.75'
                    }} className={this.props.class}></i>
            </a>
        </li>);
    }
}

export default Skill;

const wiggle = {
    '0%': {
        'transform': 'rotate(3deg)'
    },
    '50%': {
        'transform': 'rotate(-3deg)'
    },
    '100%': {
        'transform': 'rotate(3deg)'
    }
};

const styles = {
    skills: css({
        width: '100px',
        height: '100px',
        borderRadius: '100px',
        lineHeight: '100px',
        margin: '10px',
        transition: '1s',
        ':hover': {
            opacity: 1,
            animationName: wiggle,
            animationDuration: '0.3s',
            animationIterationCount: 2
        }
    }),
    link: css({
        width: '100px',
        height: '100px',
        borderRadius: '100px',
        lineHeight: '100px',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#000000',
        textDecoration: 'none',
        ':visited': {
            color: '#000000'
        }
    })
};
