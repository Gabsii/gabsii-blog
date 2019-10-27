import React from 'react';
// import PageTransition from 'gatsby-plugin-page-transitions';
import Helmet from 'react-helmet'
import {Link} from 'gatsby';
import {css} from 'glamor';

import '../css/reset.css';
import '../css/fonts.css';
import icon from '../img/favicon.ico';
import profilePicture from '../img/square_ball.jpg';
import austria from '../img/emojis/austria.png';
import laptop from '../img/emojis/laptop.png';
import man from '../img/emojis/man.png';
import palette from '../img/emojis/palette.png';
import snake from '../img/emojis/snake.png';
import chatbot from '../img/chatbot.png';
import web from '../img/emojis/web.png';
import writing from '../img/emojis/writing.png';
import spotiVote from '../img/spotiVote.jpg';
import email from '../img/contact/email.svg';
import facebook from '../img/contact/facebook.svg';
import instagram from '../img/contact/instagram.svg';
import linkedin from '../img/contact/linkedin.svg';

import Frame from '../components/Frame.jsx';
import Project from '../components/Project.jsx';

const paddingLeft = {
    paddingLeft: 0
};

const IndexPage = () => (<div>
    <Helmet title="Gabsii - Lukas Gabsi">
        <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,700&amp;subset=latin-ext" rel="stylesheet"/>
        <link rel="shortcut icon" href={icon} type="image/x-icon"/>
        <link rel="icon" href={icon} type="image/x-icon"/>
        <meta name="author" content="Lukas Gabsi (Gabsii)"/>
        <meta name="description" content="Hello and welcome to my personal Homepage. Here you can either see my current projects, read about my adventures in life (EVS in particular) or check a short-form resume"/>
        <meta name="keywords" content="personal, Homepage, web, react, gatsby, gatsbyjs,, lukas, gabsi, gabsii, wordpress, projects, EVS, adventures, life, resume"/>
        <html lang="en"/>
        <script async="async" src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
        <script>{
                `(adsbygoogle = window.adsbygoogle || []).push({google_ad_client: "ca-pub-4957107490063182", enable_page_level_ads: true});`
            }</script>
    </Helmet>
    <Frame backgroundColor="#000" color="#fff">
        <div className={`${styles.titleWrapper}`}>
            <h1 className={`${styles.title}`}>Gabsii</h1>
            <h2 className={`${styles.subHeading} ${styles.subHeading1}`}>modern.vintage</h2>
            <h2 className={`${styles.subHeading} ${styles.subHeading2}`}>modern.vintage</h2>
            <h2 className={`${styles.subHeading} ${styles.subHeading3}`}>modern.vintage</h2>
            <h2 className={`${styles.subHeading} ${styles.subHeading4}`}>modern.vintage</h2>
        </div>
        <Link className={`${styles.blog}`} to="/blog">Catch me blogging</Link>
    </Frame>
    <Frame backgroundColor="#fff" color="#000">
        <div className={`${styles.headWrapper}`}>
            <h1 className={`${styles.heading}`}>Who am I?</h1>
            <img alt="profile" className={`${styles.profilPicture}`} src={profilePicture}/>
        </div>
        <hr className={`${styles.horizontalRow}`}/>
        <div className={`${styles.paragraph}`}>
            <p>My name is Lukas Samir Gabsi.
                <img alt="emoji-man" className={`${styles.emoji}`} src={man}/></p>
            <p>I am 20 years old (or young?!)</p>
            <p>I am from Austria, between a lake and mountains.
                <img alt="emoji-austria" className={`${styles.emoji}`} src={austria} style={{
                        paddingRight: 0
                    }}/></p>
            <p>I program cool stuff&nbsp;
                <i className={`${styles.crossed}`}>sometimes.</i><img alt="emoji-laptop" className={`${styles.emoji}`} src={laptop}/></p>
        </div>
        <hr className={`${styles.horizontalRow}`}/>
        <div className={`${styles.paragraph}`}>
            <p>I do Web Development
                <img alt="emoji-web" className={`${styles.emoji}`} src={web}/>
                (especially&nbsp;
                <a href="https://reactjs.org/" className={`${styles.skillLinks}`}>ReactJS</a>)</p>
            <p>and I recently started&nbsp;
                <a href="https://www.python.org/" className={`${styles.skillLinks}`}>Python<img alt="emoji-snake" className={`${styles.emoji}`} src={snake}/></a>
                and&nbsp;
                <a href="https://unity3d.com/de" className={`${styles.skillLinks}`}>Unity</a>.</p>
            <p>I make my Web Designs using&nbsp;
                <a href="https://www.figma.com/" className={`${styles.skillLinks}`}>Figma<img alt="emoji-palette" className={`${styles.emoji}`} src={palette}/></a>.</p>
            <p>Check out how I survive my travelling in my&nbsp;
                <Link to="/blog" className={`${styles.skillLinks}`}>blog<img alt="emoji-writing" className={`${styles.emoji}`} src={writing}/></Link>.</p>
        </div>
    </Frame>
    <Frame backgroundColor="#000" color="#fff">
        <div className={`${styles.headWrapper}`}>
            <h1 className={`${styles.heading}`}>Projects</h1>
        </div>
        <hr className={`${styles.horizontalRow}`}/>
        <div className={`${styles.paragraph}`}>
            <p>I like developing software that helps people get easier through their day.</p>
            <p>I started all my project with a final solution in mind:</p>
            <br/>
            <p style={{
                    textAlign: 'center'
                }}>
                <em className={`${styles.emphasized}`}>To solve a problem.</em>
            </p>
            <br/>
            <br/>
            <p>Scroll down to see some of my favourite projects!</p>
        </div>
    </Frame>
    <Frame backgroundColor="#282828" color="#fff">
        <Project name="Spoti-Vote" TLDR="A Social Jukebox Webapp!" background={spotiVote} link="https://spoti-vote.com"/>
    </Frame>
    <Frame backgroundColor="#282828" color="#fff">
        <Project name="Spotipy-Dataviz" TLDR="Visualize your Spotify Playlists Data!" background="https://picsum.photos/1200/800" link="/"/>
    </Frame>
    <Frame backgroundColor="#282828" color="#fff">
        <Project name="Gabsii Chatbot" TLDR="Chat with an artificial me!" background={chatbot} link="https://lab.gabsii.com/bot"/>
    </Frame>
    <Frame backgroundColor="#fff" color="#000">
        <div className={`${styles.headWrapper}`}>
            <h1 className={`${styles.heading}`}>Contact me</h1>
        </div>
        <hr className={`${styles.horizontalRow}`}/>
        <div className={`${styles.paragraph}`}>
            <p>By now you&nbsp;
                <i className={`${styles.crossed}`}>hopefully</i>
                &nbsp;got interested.</p>
            <p>So feel free to drop me a line!</p>
            <br/>
            <ul>
                <li className={`${styles.contactOption}`}>
                    <img alt="LinkedIn" src={linkedin} className={`${styles.contactIcon}`}/>
                    <a className={`${styles.contactLinks}`} href="https://www.linkedin.com/in/lukas-samir-gabsi-734693168/">LinkedIn</a>
                </li>
                <li className={`${styles.contactOption}`}>
                    <img alt="E-Mail" src={email} className={`${styles.contactIcon}`}/>
                    <a className={`${styles.contactLinks}`} href="mailto:lukas.gabsi@gmail.com">E-Mail</a>
                </li>
                <li className={`${styles.contactOption}`}>
                    <img alt="Instagram" src={instagram} className={`${styles.contactIcon}`}/>
                    <a className={`${styles.contactLinks}`} href="https://www.instagram.com/omegabsi">Instagram</a>
                </li>
                <li className={`${styles.contactOption}`}>
                    <img alt="Facebook" src={facebook} className={`${styles.contactIcon}`}/>
                    <a className={`${styles.contactLinks}`} href="https://www.facebook.com/lukas.gabsi">Facebook</a>
                </li>
            </ul>
        </div>
        <footer className={`${styles.footer}`}>&copy; 2019 Lukas Samir Gabsi</footer>
    </Frame>
</div>);
export default IndexPage;
const styles = {
    titleWrapper: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        marginTop: '100px'
    }),
    title: css({
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 'normal',
        fontSize: '18rem',
        color: '#FFFFFF',
        '@media (max-width: 769px)': {
            fontSize: '9rem'
        },
        '@media (max-width: 600px)': {
            fontSize: '4rem'
        }
    }),
    subHeading: css({
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 'normal',
        color: '#000000',
        // WebkitTextStroke: '5px #FFFFFF',
        textShadow: '-5px -5px 0 #fff, 5px -5px 0 #fff, -5px 5px 0 #fff, 5px 5px 0 #fff',
        '@media (max-width: 600px)': {
            textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff'
        }
    }),
    subHeading1: css({
        fontSize: '9rem',
        '@media (max-width: 769px)': {
            fontSize: '4.5rem'
        },
        '@media (max-width: 600px)': {
            fontSize: '2.25rem'
        }
    }),
    subHeading2: css({
        fontSize: '6rem',
        '@media (max-width: 769px)': {
            fontSize: '3rem'
        },
        '@media (max-width: 600px)': {
            fontSize: '2rem'
        }
    }),
    subHeading3: css({
        fontSize: '4.5rem',
        textShadow: '-4px -4px 0 #fff, 4px -4px 0 #fff, -4px 4px 0 #fff, 4px 4px 0 #fff',
        '@media (max-width: 769px)': {
            fontSize: '2.25rem'
        },
        '@media (max-width: 600px)': {
            fontSize: '1.25rem',
            textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'
        }
    }),
    subHeading4: css({
        fontSize: '3rem',
        textShadow: '-3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff, 3px 3px 0 #fff',
        '@media (max-width: 769px)': {
            fontSize: '1.5rem'
        },
        '@media (max-width: 600px)': {
            fontSize: '1rem',
            textShadow: '-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff'
        }
    }),
    blog: css({
        transform: 'rotate(-90deg) translateX(-75%)',
        transformOrigin: '100% 0',
        position: 'absolute',
        right: '35px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 'normal',
        fontSize: '1.5rem',
        letterSpacing: '0.25rem',
        color: '#FFFFFF',
        ':hover': {
            backgroundColor: 'white',
            textShadow: '-1.5px -1.5px 0 #000, 1.5px -1.5px 0 #000, -1.5px 1.5px 0 #000, 1.5px 1.5px 0 #000',
            cursor: 'pointer'
        },
        '@media (max-width: 600px)': {
            fontSize: '1rem',
            transform: 'rotate(0deg)',
            position: 'absolute',
            right: 0,
            bottom: '10px',
            width: '100%',
            textAlign: 'center'
        }
    }),
    headWrapper: css({
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'relative',
        top: '50px',
        paddingBottom: '25px',
        margin: '0 0px 25px 0px'
    }),
    heading: css({
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        fontStyle: 'normal',
        fontWeight: 'bold',
        lineHeight: 'normal',
        fontSize: '9rem',
        '@media (max-width: 769px)': {
            fontSize: '4.5rem'
        },
        '@media (max-width: 600px)': {
            fontSize: '2rem'
        }
    }),
    profilPicture: css({
        borderRadius: '50%',
        height: '200px',
        width: '200px',
        marginLeft: '50px',
        '@media (max-width: 769px)': {
            height: '100px',
            width: '100px'
        },
        '@media (max-width: 600px)': {
            display: 'none'
        }
    }),
    horizontalRow: css({borderBottom: '1px solid black', margin: '0 50px'}),
    paragraph: css({
        padding: '25px 100px',
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 'normal',
        fontSize: '3rem',
        justifySelf: 'center',
        '@media (max-width: 786px)': {
            fontSize: '1.5rem'
        },
        '@media (max-width: 600px)': {
            padding: '25px 1em 0',
            fontSize: '1rem'
        }
    }),
    contactOption: css({padding: '15px'}),
    contactIcon: css({height: '48px', width: '48px', verticalAlign: 'middle', marginRight: '10px'}),
    contactLinks: css({textDecoration: 'none', color: '#000', verticalAlign: 'middle'}),
    footer: css({
        width: '100%',
        textAlign: 'center',
        marginTop: '100px',
        fontFamily: 'Zwizz, Arial, Sans-Serif',
        fontStyle: 'normal',
        fontWeight: 'normal',
        lineHeight: 'normal',
        fontSize: '1rem',
        '@media (max-width: 600px)': {
            fontSize: '0.5rem',
            marginTop: '-10px'
        }
    }),
    crossed: css({textDecoration: 'line-through'}),
    skillLinks: css({color: '#D43900', fontWeight: 'bold', textDecoration: 'none'}),
    emphasized: css({
        fontSize: '5rem',
        fontWeight: 'bold',
        '@media (max-width: 600px)': {
            fontSize: '2.5rem'
        }
    }),
    emoji: css({
        width: '48px',
        height: '48px',
        padding: '0 10px',
        '@media (max-width: 600px)': {
            height: '16px',
            width: '16px'
        }
    })
}
