import React, {Component} from 'react';
import Link from 'gatsby-link';
import PageTransition from 'gatsby-plugin-page-transitions';

import Hero from '../components/Hero.jsx';
import Project from '../components/Project.jsx';
import spotiVote from '../img/spotiVote.jpg';

// TODO: fetch projects form WordPress

const projects = [
    {
        title: 'Spoti Vote',
        img: spotiVote
    }
];

const IndexPage = () => (<PageTransition>
    <Hero/> {
        projects.map((project, index) => {
            return (<Project title={project.title} img={project.img} index={index} amount={projects.length} key={index}/>);
        })
    }
</PageTransition>);

export default IndexPage;
