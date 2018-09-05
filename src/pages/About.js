import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import PageTransition from 'gatsby-plugin-page-transitions';
import Link from 'gatsby-link'

import Header from '../components/Header.jsx';
import Skill from '../components/Skill.jsx';

let constants = require('../js/constants.js');

const skills = [
    {
        name: 'HTML',
        color: '#E44B23',
        href: 'https://www.w3.org/html/',
        class: 'fab fa-html5 fa-4x'
    }, {
        name: 'CSS',
        color: '#563D7C',
        href: 'https://www.w3.org/Style/CSS/Overview.en.html',
        class: 'fab fa-css3 fa-4x'
    }, {
        name: 'javascript',
        color: '#F1E05A',
        href: 'https://www.javascript.com/',
        class: 'fab fa-js-square fa-4x'
    }, {
        name: 'react',
        color: '#61DAFB',
        href: 'https://reactjs.org/',
        class: 'fab fa-react fa-4x'
    }, {
        name: 'node',
        color: '#82CD28',
        href: 'https://nodejs.org/',
        class: 'fab fa-node-js fa-4x'
    }, {
        name: 'php',
        color: '#4F5D95',
        href: 'http://www.php.net/',
        class: 'fab fa-php fa-4x'
    }, {
        name: 'java',
        color: '#B07219',
        href: 'https://java.com/',
        class: 'fab fa-java fa-4x'
    }, {
        name: 'C',
        color: '#555555',
        href: 'http://www.open-std.org/jtc1/sc22/wg14/www/abq/c17_updated_proposed_fdis.pdf',
        class: 'fab fa-cuttlefish fa-4x'
    }, {
        name: 'wordpress',
        color: '#21759B',
        href: 'https://wordpress.org/',
        class: 'fab fa-wordpress fa-4x'
    }, {
        name: 'APIs',
        color: '#FFFFFF',
        href: 'https://en.wikipedia.org/wiki/Application_programming_interface',
        class: 'fa fa-cogs fa-3x'
    }, {
        name: 'Shell',
        color: '#89E051',
        href: 'https://en.wikipedia.org/wiki/Shell_script',
        class: 'fa fa-terminal fa-3x'
    }
];

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
                            {
                                skills.map((skill, index) => {
                                    return (<Skill name={skill.name} class={skill.class} color={skill.color} href={skill.href} key={index}/>);
                                })
                            }
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
