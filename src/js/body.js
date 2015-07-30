import Rx from 'rx';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

var state,
    actions = new Rx.Subject();

Router.run(routes, Router.HistoryLocation, (Handler, request) => {
    Handler.routes[0].handler.
        model(request, actions).
        subscribe(state => {
            React.render(
                <Handler {...state} dispatch={action => actions.onNext(action)} />,
                document.getElementById('app')
            );
        });
});