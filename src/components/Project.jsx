import React, {Component} from 'react';
import {css} from 'glamor'
import {OutboundLink} from 'gatsby-plugin-google-analytics'

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
        // check if there are more than 10 Projects
        // if there are less add a leading 0 to the index
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
        return (<div className={`${styles.background}`}>
            <div className={`${styles.backgroundImage}`} style={{
                    background: 'url(' + this.state.img + ')'
                }}>
                <div className={`${styles.title}`}>
                    <h1 className={`${styles.titleName}`}>
                        <a className={`${styles.link}`} href="https://spoti-vote.com">{this.state.titleName}</a>
                    </h1>
                    <h3 className={`${styles.titleSub}`}>{this.state.index + "/" + this.state.amount}</h3>
                </div>
            </div>
            <div className={`${styles.read}`}>
                <OutboundLink className={`${styles.link}`} href="https://spoti-vote.com">READ MORE</OutboundLink>
            </div>
        </div>);
    }
}

const styles = {
    background: css({
        backgroundColor: constants.colors.background,
        minHeight: 'calc(100vh - 50px)',
        minWidth: 'calc(100% - 50px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '25px',
        fontFamily: 'Zwizz',
        color: 'white'
    }),
    backgroundImage: css({
        height: '80vh !important',
        width: '80vw !important',
        backgroundPosition: 'center !important',
        backgroundRepeat: 'no-repeat !important',
        backgroundSize: '100% !important',
        display: 'flex !important',
        alignItems: 'center !important',
        alignSelf: 'center !important',
        justifyContent: 'center !important',
        filter: 'grayscale(0.75) !important',
        boxShadow: '2px 2px 8px #000000 !important'
    }),
    title: css({
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        padding: '15px 0px',
        background: 'rgba(0, 0, 0, 0.5)'
    }),
    titleName: css({fontSize: '5em', fontWeight: 'bold', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}),
    titleSub: css({fontSize: '1.5em', fontWeight: 'bold', letterSpacing: '5px', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}),
    read: css({
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
    }),
    link: css({
        color: 'white',
        textDecoration: 'none',
        ':visited': {
            color: 'white'
        }
    })
};

export default Project;
