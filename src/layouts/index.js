import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';
import Helmet from 'react-helmet'

import '../css/reset.css';
import '../css/fonts.css';
let constants = require('../js/constants.js');

const App = ({children, data}) => (<div>
    <Helmet title="Titel" meta={[
            {
                name: 'description',
                content: 'Sample'
            }, {
                name: 'keywords',
                content: 'sample, something'
            }
        ]}>
        <link href="https://use.fontawesome.com/releases/v5.3.1/css/all.css" integrity="sha384-mzrmE5qonljUremFsqc01SB46JvROS7bZs3IO2EmfFsd15uHvIt+Y8vEf7N7fWAU" crossorigin="anonymous" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:200,400" rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css?family=Noto+Serif:400,700&amp;subset=latin-ext" rel="stylesheet"/>
    </Helmet>
    {children()}
</div>)

export default App;
