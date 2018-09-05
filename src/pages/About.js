import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import PageTransition from 'gatsby-plugin-page-transitions';
import Link from 'gatsby-link'

import Header from '../components/Header.jsx';

let constants = require('../js/constants.js');

const AboutPage = () => {
    return (<PageTransition defaultStyle={{
            transition: 'right 500ms cubic-bezier(0.47, 0, 0.75, 0.72)',
            right: '100%',
            position: 'absolute',
            width: '100%'
        }} transitionStyles={{
            entering: {
                right: '0%'
            },
            entered: {
                right: '0%'
            },
            exiting: {
                right: '100%'
            }
        }}>
        <div className={css(styles.background)}>
            <Header type="about"/>
            <div className={css(styles.container)}>
                <div>
                    <div className={css(styles.heading)}>About</div>
                    <div className={css(styles.text)}>
                        <p>I’m a free time Front End Developer based in Austria.</p>
                        <p>I specialise in creating interactive experiences and user-friendly interfaces whilst maintaining semantic, clean markup and SEO friendly code.</p>
                    </div>
                </div>
                <div>
                    <div className={css(styles.heading)}>Skills</div>
                    <div className={css(styles.text)}>
                        <div className={css(styles.p)}>These are the main languages and technologies I aquired over the last 5 years of my IT education:</div>
                        <ul className={css(styles.skillContainer)}>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#E44B23',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fab fa-html5 fa-4x"></i>
                            </li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#563D7C',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fab fa-css3 fa-4x"></i>
                            </li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#F1E05A',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fab fa-js-square fa-4x"></i>
                            </li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#61DAFB',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fab fa-react fa-4x"></i>
                            </li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#82CD28',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fab fa-node-js fa-4x"></i>
                            </li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#4F5D95',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fab fa-php fa-4x"></i>
                            </li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#fff',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fas fa-code fa-4x"></i>
                            </li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#B07219',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fab fa-java fa-4x"></i>
                            </li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#555555',
                                    color: '#000',
                                    fontWeight: 'bold',
                                    fontSize: '3em'
                                }}>C</li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#21759B',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fab fa-wordpress fa-4x"></i>
                            </li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    fontWeight: 'bold'
                                }}>APIs</li>
                            <li className={css(styles.skills)} style={{
                                    backgroundColor: '#89E051',
                                    color: '#000'
                                }}>
                                <i style={{
                                        opacity: '.75'
                                    }} className="fas fa-terminal fa-3x"></i>
                            </li>
                        </ul>
                        <div className={css(styles.p)}>They are by far not the only one, but I like working with them the most.</div>
                    </div>
                </div>
                <div className={css(styles.contact)}>
                    I'm currently free for work so let's collaborate!<br/>
                    <a className={css(styles.link)} href="mailto:lukas.gabsi@gmail.com?subject=Collaborations">
                        lukas.gabsi@gmail.com
                    </a>
                </div>
            </div>
        </div>
    </PageTransition>);
}

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
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: constants.colors.background,
        minHeight: 'calc(100% - 50px)',
        minWidth: 'calc(100% - 50px)',
        padding: '25px',
        fontFamily: 'Zwizz',
        color: 'white'
    },
    container: {
        marginTop: '75px',
        marginLeft: 'auto',
        marginRight: 'auto',
        padding: '20px'
    },
    hello: {
        fontSize: '3em',
        marginBottom: '1.5em'
    },
    skillContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: '30px'
    },
    skills: {
        width: '100px',
        height: '100px',
        borderRadius: '100px',
        lineHeight: '100px',
        margin: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: '1s',
        ':hover': {
            opacity: 1,
            animationName: wiggle,
            animationDuration: '0.3s',
            animationIterationCount: 2
        }
    },
    p: {
        marginBottom: '30px'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        ':visited': {
            color: 'white'
        }
    },
    text: {
        padding: '10px 25px',
        fontSize: '1.2em'
    },
    heading: {
        fontSize: '1.7em',
        margin: '1em auto'
    },
    contact: {
        marginTop: '2em'
    }
});

export default AboutPage
