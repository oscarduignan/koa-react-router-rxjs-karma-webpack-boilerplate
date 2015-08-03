import koa from 'koa';
import handlebars from 'koa-handlebars';
import Rx from 'rx';
import React from 'react';
import Router from 'react-router';
import routes from './routes';
import model from './utils/model';

var app = koa();

app.use(handlebars({
    viewsDir: 'src/hbs'
}));

app.use(function *() {
    yield this.render('layout', {
        app: yield new Promise(resolve => {
            Router.run(routes, this.request.url, (Handler, request) => {
                model(Handler, request).take(1).subscribe(props => {
                    resolve(React.renderToString(<Handler {...props}/>));
                });
            });
        })
    });
});

app.listen(3000);