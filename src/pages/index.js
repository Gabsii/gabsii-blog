import React, {Component} from 'react';
import Link from 'gatsby-link';

import Hero from '../components/Hero.jsx';
import Project from '../components/Project.jsx';
import spotiVote from '../img/spotiVote.jpg';

const projects = [
    {
        title: 'Spoti Vote',
        img: spotiVote
    }
];

const IndexPage = () => (<div>
    <Hero/>{
        projects.map((project, index) => {
            return (<Project title={project.title} img={project.img} index={index} amount={projects.length} key={index}/>);
        })
    }
</div>);

export default IndexPage;
