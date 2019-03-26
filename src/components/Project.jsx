import React, {Component} from 'react';
import {css} from 'glamor'

class Project extends Component {

    // TODO: add WebGL wave effect

    render() {
        return (<div className={`${styles.projectWrapper}`}>
            <canvas className={`${styles.projectImage}`} style={{
                    background: 'url(' + this.props.background + ')',
                    objectFit: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }}></canvas>
            <div className={`${styles.projectTextWrapper}`}>
                <h1 className={`${styles.projectName}`}>
                    <a className={`${styles.projectLink}`} href={this.props.link}>{this.props.name}</a>
                </h1>
                <h2 className={`${styles.projectTLDR}`}>{this.props.TLDR}</h2>
            </div>
        </div>);
    }
}

const styles = {
    projectWrapper: css({
        width: '100%',
        height: '100%',
        padding: '50px 75px',
        boxSizing: 'border-box',
        position: 'relative',
        '@media (max-width: 600px)': {
            padding: 0
        }
    }),
    projectImage: css({width: '100%', height: '100%'}),
    projectTextWrapper: css({
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
        width: 'calc(100% - 150px)',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '10px 0',
        '@media (max-width: 600px)': {
            width: '100%'
        }
    }),
    projectName: css({
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 'normal',
        fontSize: '9rem',
        '@media (max-width: 769px)': {
            fontSize: '4.5rem'
        },
        '@media (max-width: 600px)': {
            fontSize: '2.5rem'
        }
    }),
    projectLink: css({textDecoration: 'none', color: '#fff'}),
    projectTLDR: css({
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 'normal',
        fontSize: '3rem',
        color: '#B1B1B1',
        '@media (max-width: 769px)': {
            fontSize: '2rem'
        },
        '@media (max-width: 600px)': {
            fontSize: '1rem'
        }
    })
};

export default Project;
