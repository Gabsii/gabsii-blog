import React, {Component} from 'react';
import {StyleSheet, css} from 'aphrodite';

let constants = require('../js/constants.js');

class Project extends Component {
    constructor() {
        super();
        this.state = {
            titleName: '',
            img: null,
            index: 0,
            amount: 1
        };
    }

    componentDidMount() {
        this.setState({titleName: this.props.title, img: this.props.img})
        let newIndex;
        ((this.props.index + 1) < 10)
            ? newIndex = '0' + (
            this.props.index + 1)
            : newIndex = this.props.index + 1
        this.setState({
            index: newIndex,
            amount: '0' + this.props.amount
        });
    }

    render() {
        return (<div className={css(styles.background)}>
            <div className={css(styles.backgroundImage)} style={{
                    background: 'url(' + this.state.img + ')'
                }}>
                <div className={css(styles.title)}>
                    <h1 className={css(styles.titleName)}>{this.state.titleName}</h1>
                    <h3 className={css(styles.titleSub)}>{this.state.index + "/" + this.state.amount}</h3>
                </div>
            </div>
            <div className={css(styles.read)}>
                <a className={css(styles.link)} href={"/" + this.state.index}>READ MORE</a>
            </div>
        </div>);
    }
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: constants.colors.background,
        minHeight: 'calc(100vh - 50px)',
        minWidth: 'calc(100% - 50px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '25px',
        fontFamily: 'Zwizz',
        color: constants.colors.font
    },
    backgroundImage: {
        height: '80vh',
        width: '80vw',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100%',
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        filter: 'grayscale(0.75)',
        boxShadow: '2px 2px 8px #000000'
        // ':hover': {
        //     filter: 'grayscale(0)'
        // }
    },
    title: {
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        padding: '15px 0px',
        background: 'rgba(0, 0, 0, 0.5)'
    },
    titleName: {
        fontSize: '5em',
        fontWeight: 'bold',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
    },
    titleSub: {
        fontSize: '1.5em',
        fontWeight: 'bold',
        letterSpacing: '5px',
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
    },
    read: {
        transform: 'rotate(-90deg)',
        position: 'absolute',
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        letterSpacing: '3px',
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 200,
        ':hover': {
            fontWeight: 400,
            cursor: 'pointer'
        }
    },
    link: {
        color: constants.colors.font,
        textDecoration: 'none',
        ':visited': {
            color: constants.colors.font
        }
    }
});

export default Project;
