import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/fonts.css';
import App from './App.jsx';
import About from './components/About.jsx';
import Blog from './components/Blog.jsx';
import registerServiceWorker from './registerServiceWorker';
import {Route} from 'react-router';
import {BrowserRouter, Switch} from 'react-router-dom';

ReactDOM.render((<BrowserRouter>
    <Switch>
        <Route exact={true} path="/" component={App}/>
        <Route path="/about" component={About}/>
        <Route path="/blog" component={Blog}/> {/* <Route component={NotFound}/> */}
    </Switch>
</BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
