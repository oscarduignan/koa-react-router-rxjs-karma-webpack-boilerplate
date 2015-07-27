import koa from 'koa';
import React from 'react';
import Router from 'react-router';
import routes from './routes';

var app = koa();

app.use(function *() {
    this.body = yield new Promise(resolve => {
        Router.run(routes, this.request.url, Handler => {
            resolve(React.renderToString(<Handler/>));
        });
    });
});

app.listen(3000);