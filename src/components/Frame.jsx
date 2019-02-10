import React, {Component} from 'react';
import {css} from 'glamor'

class Frame extends Component {

    render() {
        let color,
            backgroundColor;
        !this.props.backgroundColor
            ? backgroundColor = '#fff'
            : backgroundColor = this.props.backgroundColor
        !this.props.color
            ? color = '#fff'
            : color = this.props.color
        return (<section className={`${styles.section}`} style={{
                backgroundColor,
                color
            }}>
            {this.props.children}
        </section>);
    }
}
const styles = {
    section: css({
        width: '100%',
        height: '100vh',
        '@media (max-width: 600px)': {
            maxHeight: '500px'
        },
        position: 'relative'
    })
};
export default Frame;
