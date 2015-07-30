import React from 'react';
import { actions } from './actions';

class Greeting extends React.Component {
    render() {
        if (this.props.recipient) {
            return <p>Hello, {this.props.recipient}!</p>;
        } else {
            return <p>Hello!</p>;
        }
    }
}

export default Greeting;
