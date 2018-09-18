import React, {Component} from 'react';
import Helmet from 'react-helmet'

import '../css/reset.css';
import '../css/fonts.css';
import icon from '../img/favicon.ico';

let constants = require('../js/constants.js');

const App = ({children, data}) => (<div>
    <Helmet title="Gabsii - Lukas Gabsi" meta={[
            {
                name: 'description',
                content: 'Hello and welcome to my personal Homepage. Here you can either see my current projects, read about my adventures in life (EVS in particular) or check a short-form resume'
            }, {
                name: 'keywords',
                content: 'personal, Homepage, web, react, wordpress, projects, EVS, adventures, life, resume'
            }
        ]}>
        <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,700&amp;subset=latin-ext" rel="stylesheet"/>
        <link rel="shortcut icon" href={icon} type="image/x-icon"/>
        <link rel="icon" href={icon} type="image/x-icon"/>
    </Helmet>
    {children()}
</div>);

export default App;
