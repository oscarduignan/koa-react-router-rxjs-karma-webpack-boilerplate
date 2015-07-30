import koa from 'koa';
import handlebars from 'koa-handlebars';
import Rx from 'rx';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

var app = koa();

app.use(handlebars({
    viewsDir: 'src/hbs'
}));

app.use(function *() {
    yield this.render('layout', {
        app: yield new Promise(resolve => {
            Router.run(routes, this.request.url, (Handler, request) => {
                // TODO what happens when we have multiple handlers and nested routes
                Handler.routes[0].handler.
                    model(request).
                    take(1).
                    subscribe(state => {
                        resolve(React.renderToString(<Handler {...state}/>));
                    });
            });
        })
    });
});

app.listen(3000);