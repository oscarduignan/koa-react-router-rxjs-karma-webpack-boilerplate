import React, { Component } from 'react';
import { Route } from 'react-router';

class HelloWorld extends Component {
    render() {
        return <p>Hello world!</p>;
    }
}

export default (
    <Route path="/" handler={HelloWorld}/>
);
