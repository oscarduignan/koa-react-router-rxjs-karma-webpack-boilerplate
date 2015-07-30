import React, { Component, PropTypes } from 'react';
import { Observable } from 'rx';
import { actions as greeter } from '../greeter/actions';
import model from '../model';
import Greeting from '../greeter/Greeting';

class App extends Component {
    constructor(props) {
        super(props);
        this.changeRecipient = this.changeRecipient.bind(this);
    }

    changeRecipient(name) {
        this.props.dispatch(greeter.changeRecipient(name));
    }

    render() {
        console.log(this.props.greeter);
        return (
            <div>
                <Greeting {...this.props.greeter}/>
                <hr/>
                <p>Not you? Tell me who you are!</p>
                <input type='text' onChange={(event) => this.changeRecipient(event.target.value)}/>
            </div>
        );
    }
}

// TODO think about if this just causes memory leaks
// when switching between urls. And think about how to
// handle nested routes - is it just up to the top level
// model to merge in all it's child component models with
// combineLatestAsObj?
App.model = function ({query}, actions) {
    var initialActions = Observable.fromArray([
        greeter.changeRecipient(query.recipient || '')
    ]);

    return model(actions ? initialActions.merge(actions) : initialActions);
}

App.contextTypes = {
    router: PropTypes.func
};

export default App;