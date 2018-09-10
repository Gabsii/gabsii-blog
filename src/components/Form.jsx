import React, {Component} from 'react';
import {css} from 'glamor'

let constants = require('../js/constants.js');

class Form extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            message: '',
            mail: ''
        };
        this.submit = this.submit.bind(this);
    }

    handleNameInput(event) {
        let name = event.target.value;
        this.setState({name: name});
        // console.log(event.target.value);
    }

    handleMailInput(event) {
        let mail = event.target.value;
        this.setState({mail: mail});
    }

    handleMessageInput(event) {
        let message = event.target.value;
        this.setState({message: message});
    }

    submit(event) {
        event.preventDefault();
        const toUrlEncoded = obj => Object.keys(obj).map(k => encodeURIComponent(k) + '=' + encodeURIComponent(obj[k])).join('&');
        const dataObj = {
            author_name: this.state.name,
            author_email: this.state.mail,
            post: this.props.id,
            content: this.state.message
        };

        fetch('https://wp.gabsii.com/wp-json/wp/v2/comments', {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: toUrlEncoded(dataObj)
        }).then(response => {
            if (response.status === 201) {
                console.log(response);
                location.reload();
            } else {
                console.log("error");
                document.getElementById("error").style.display = 'block';
            }
        });
    }

    render() {
        return (<form action="" className={`${styles.form}`} autoComplete="off" onSubmit={this.submit}>
            <input type="text" onChange={this.handleNameInput.bind(this)} required={true} placeholder="Name" name="name" className={`${styles.input}`}/>
            <input type="text" onChange={this.handleMailInput.bind(this)} required={true} placeholder="E-Mail (your E-Mail will not be displayed)" name="mail" className={`${styles.input}`}/>
            <textarea type="text" onChange={this.handleMessageInput.bind(this)} required={true} placeholder="Message" name="content" rows="8" className={`${styles.input}`}/>
            <input type="submit" className={`${styles.submit}`} value="submit"/>
            <div id="error" style={{
                    display: 'none',
                    color: 'black'
                }}>Error: something went wrong. Please try again later again or contact me!</div>
        </form>);
    }
}
const styles = {

    form: css({display: 'flex', flexDirection: 'column'}),
    input: css({
        margin: '10px 0',
        backgroundColor: constants.colors.fontSecondary,
        minWidth: '200px',
        border: 'none',
        padding: '0.5em 1em',
        boxShadow: '0 2px 4px 0 rgba(162, 162, 162, 0.5)',
        fontFamily: 'Noto Serif',
        fontSize: '1em',
        resize: 'none'
    }),
    submit: css({
        alignSelf: 'flex-end',
        height: '25px',
        width: '80px',
        padding: '5px 15px',
        boxSizing: 'content-box',
        backgroundColor: constants.colors.background,
        outline: 'none',
        border: 'none',
        fontFamily: 'Zwizz',
        fontWeight: 'bold',
        fontSize: '1em',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'white',
        borderRadius: '10px'
    })
};
export default Form;
