import Rx from 'rx';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

var state,
    actions = new Rx.Subject();

Router.run(routes, Router.HistoryLocation, (Handler, request) => {
    state = Handler.routes[0].handler.model(request, actions);

    state.subscribe(props => {
        React.render(
            <Handler {...props} dispatch={action => actions.onNext(action)} />,
            document.getElementById('app')
        );
    });
});