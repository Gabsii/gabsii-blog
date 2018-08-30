import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/fonts.css';
import App from './App.jsx';
import About from './components/About.jsx';
import Blog from './components/Blog.jsx';
import BlogPage from './components/BlogPage.jsx';
import registerServiceWorker from './registerServiceWorker';
import {Route} from 'react-router';
import {BrowserRouter, Switch} from 'react-router-dom';

ReactDOM.render((<BrowserRouter>
    <Switch>
        <Route exact={true} path="/" component={App}/>
        <Route exact={true} path="/about" component={About}/>
        <Route exact={true} path="/blog" component={Blog}/>
        <Route path="/blog/:id" component={BlogPage}/> {/* <Route component={NotFound}/> */}
    </Switch>
</BrowserRouter>), document.getElementById('root'));
registerServiceWorker();
