import React, {Component} from 'react';
import {css} from 'glamor';

let constants = require('../js/constants.js');

class Comment extends Component {

    constructor() {
        super();
        this.state = {
            date: ''
        }
    }

    componentDidMount() {
        this.calculateTime();
    }

    // this function calculates how the time for a comment should be displayed
    calculateTime() {
        //get the current date and the date when the comment was posted
        const now = Date.now();
        const date = Date.parse(this.props.date);

        //get the difference between those two dates
        let diff = now - date;
        let diffDate = new Date(diff);

        // set the state conditionally by the difference

        // 60000 = 1min
        // 3600000 = 1h
        // 82800000 = 23h --> because 24h is not displayable
        if (diff < 60000) {
            let sec = diffDate.getSeconds();
            this.setState({date: `${sec} seconds ago`});
        } else if (diff < 3600000) {
            let min = diffDate.getMinutes();
            this.setState({date: `${min} minutes ago`});
        } else if (diff < 82800000) {
            let hours = diffDate.getHours();
            this.setState({date: `${hours} hours ago`});
        } else if (diff > 82800000 && new Date(now).getFullYear() === new Date(date).getFullYear()) {
            this.setState({date: `on ${new Date(date).getDate()}/${new Date(date).getMonth()}`});
        } else if (diff > 82800000 && new Date(now).getFullYear() !== new Date(date).getFullYear()) {
            this.setState({date: `on ${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()}`});
        }
    }

    render() {
        return (<div className={`${styles.container}`}>
            <div className={`${styles.name}`}>{this.props.name}<div className={`${styles.date}`}>posted {this.state.date}</div>
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
        backgroundColor: '#EDEDED'
    }),
    name: css({fontSize: '1.2em', fontFamily: 'Zwizz', padding: '15px 10px', borderBottom: '1px solid rgba(0, 0, 0, 0.6)', marginBottom: '5px'}),
    date: css({fontSize: '0.8em', color: constants.colors.background, marginTop: '5px', marginLeft: '5px'}),
    content: css({padding: '15px 25px', fontFamily: 'Noto Serif', wordBreak: 'break-word', paddingBottom: '20px'})
};
export default Comment;
