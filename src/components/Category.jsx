import React, {Component} from 'react';
import {css} from 'glamor';

class Category extends Component {

    render() {
        console.log(this);
        return (<div className={`${categoryCSS}`} data-id={this.props.category.id}>
            <a className={`${link}`} href={this.props.location.origin + "/blog/?category=" + this.props.category.name}>{this.props.category.name}</a>
        </div>);
    }
}
const categoryCSS = css({
    backgroundColor: '#EE7778',
    borderRadius: '10px',
    padding: '4px 5px',
    fontSize: '0.45em',
    margin: '0 5px',
    fontFamily: 'Noto Serif',
    fontWeight: 'normal',
    marginBottom: '1em',
    color: 'white',
    ':hover': {
        cursor: 'pointer'
    }
});

const link = css({
    color: 'white',
    textDecoration: 'none',
    ':visited': {
        color: 'white'
    },
    ':hover': {
        color: 'white'
    }
});
export default Category;
