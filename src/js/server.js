import koa from 'koa';
import handlebars from 'koa-handlebars';
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
            Router.run(routes, this.request.url, Handler => {
                resolve(React.renderToString(<Handler/>));
            });
        })
    });
});

app.listen(3000);