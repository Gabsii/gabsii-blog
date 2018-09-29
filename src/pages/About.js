import React from 'react';
import {css} from 'glamor';
// import PageTransition from 'gatsby-plugin-page-transitions';
import Helmet from 'react-helmet'

import '../css/reset.css';
import '../css/fonts.css';
import icon from '../img/favicon.ico';
import Header from '../components/Header.jsx';
import Skill from '../components/Skill.jsx';

let constants = require('../js/constants.js');

// array containing all known skills
// attributes: color of the language, link to the creator/additional info, name

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
        name: 'Shell',
        color: '#89E051',
        href: 'https://en.wikipedia.org/wiki/Shell_script',
        class: 'fa fa-terminal fa-3x'
    }
];

// <PageTransition defaultStyle={{
//         transition: 'right 500ms cubic-bezier(0.47, 0, 0.75, 0.72)',
//         right: '100%',
//         position: 'absolute',
//         width: '100%'
//     }} transitionStyles={{
//         entering: {
//             right: '0%'
//         },
//         entered: {
//             right: '0%'
//         },
//         exiting: {
//             right: '100%'
//         }
//     }}>

const AboutPage = () => {
    return (<div>
        <Helmet title="Gabsii - About" meta={[
                {
                    name: 'description',
                    content: 'Just a simple about me. Don\'t mind it sitting here.'
                }, {
                    name: 'keywords',
                    content: 'about, me, about me, gabsii, front, end, frontend, front-end, austria, SEO, search engine optimization, java, c, javascript, react, wordpress'
                }
            ]}>
            <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400" rel="stylesheet"/>
            <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,700&amp;subset=latin-ext" rel="stylesheet"/>
            <link rel="shortcut icon" href={icon} type="image/x-icon"/>
            <link rel="icon" href={icon} type="image/x-icon"/>
<meta name="author" content="Lukas Gabsi (Gabsii)"/>

<html lang="en"/></Helmet>
        <div className={`${styles.background}`}>
            <Header type="about"/>
            <div className={`${styles.container}`}>
                <div>
                    <div className={`${styles.heading}`}>About</div>
                    <div className={`${styles.text}`}>
                        <p>I’m a free time Front End Developer based in Austria.</p>
                        <p>I specialise in creating minimalistic interactive experiences and user-friendly interfaces whilst maintaining semantic, clean markup and SEO friendly code.</p>
                    </div>
                </div>
                <div>
                    <div className={`${styles.heading}`}>Skills</div>
                    <div className={`${styles.text}`}>
                        <div className={`${styles.p}`}>These are the main languages and technologies I aquired over the last 5 years of my IT education:</div>
                        <ul className={`${styles.skillContainer}`}>
                            {
                                skills.map((skill, index) => {
                                    return (<Skill name={skill.name} class={skill.class} color={skill.color} href={skill.href} key={index}/>);
                                })
                            }
                        </ul>
                        <div className={`${styles.p}`}>They are by far not the only one, but I like working with them the most.</div>
                    </div>
                </div>
                <div className={`${styles.contact}`}>
                    I'm currently free for work so let's collaborate!<br/>
                    <a className={`${styles.link}`} href="mailto:lukas.gabsi@gmail.com?subject=Collaborations">
                        lukas.gabsi@gmail.com
                    </a>
                </div>
            </div>
        </div>
    </div>);
}

const styles = {
    background: css({
        backgroundColor: constants.colors.background,
        minHeight: 'calc(100% - 50px)',
        minWidth: 'calc(100% - 50px)',
        padding: '25px',
        fontFamily: 'Zwizz',
        color: 'white'
    }),
    container: css({marginTop: '75px', marginLeft: 'auto', marginRight: 'auto', padding: '20px'}),
    hello: css({fontSize: '3em', marginBottom: '1.5em'}),
    skillContainer: css({
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: '30px',
        '@media (max-width: 768px)': {
            margin: '-10px'
        }
    }),
    p: css({marginBottom: '30px'}),
    link: css({
        color: 'white',
        textDecoration: 'none',
        ':visited': {
            color: 'white'
        }
    }),
    text: css({padding: '10px 25px', fontSize: '1.2em'}),
    heading: css({fontSize: '1.7em', margin: '1em auto'}),
    contact: css({marginTop: '2em'})
};

export default AboutPage
