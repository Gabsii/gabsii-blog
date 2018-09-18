import React, {Component} from 'react';
import {css} from 'glamor'

let constants = require('../js/constants.js');

class Comment extends Component {

    // all the data is provided by props.

    render() {
        return (<div className={`${styles.container}`}>
            <div className={`${styles.name}`}>{this.props.name}<div className={`${styles.date}`}>&nbsp;at {this.props.date}</div>
            </div>
            <div className={`${styles.content}`} dangerouslySetInnerHTML={{
                    __html: this.props.content
                }}></div>
        </div>);
    }
}
const styles = {
    container: css({
        width: '100%',
        minHeight: '150px',
        boxShadow: '0 2px 4px 0 rgba(162, 162, 162, 0.5)',
        color: 'black',
        margin: '10px 0 25px 0',
        backgroundColor: constants.colors.fontSecondary
    }),
    name: css({fontSize: '1.2em', fontFamily: 'Zwizz', padding: '15px 10px', borderBottom: '1px solid rgba(0, 0, 0, 0.6)', marginBottom: '5px'}),
    date: css({fontSize: '0.8em', color: constants.colors.background, marginTop: '5px', marginLeft: '5px'}),
    content: css({padding: '15px 25px', fontFamily: 'Noto Serif'})
};
export default Comment;
