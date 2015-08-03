import Rx from 'rx';
import uri from 'URIjs';
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import model from './utils/model';
import { actions as greeter } from './greeter/actions';

var state,
    actions = new Rx.Subject();

Router.run(routes, Router.HistoryLocation, (Handler, request) => {
    state = model(Handler, request, actions);

    state.subscribe(props => {
        React.render(
            <Handler {...props} dispatch={action => actions.onNext(action)} />,
            document.getElementById('app')
        );
    });
});

window.addEventListener('popstate', () => {
    var { recipient } = uri().search(true);

    actions.onNext(greeter.changeRecipient(recipient || ''));
});

state.
    pluck('greeter').
    map(recipient => {
        return uri().setSearch(recipient).toString();
    }).
    debounce(200).
    filter(nextURL => {
        return nextURL !== window.location.toString()
    }).
    subscribe(nextURL => {
        window.history[uri().search() ? 'pushState' : 'replaceState'](null, null, nextURL);
    });