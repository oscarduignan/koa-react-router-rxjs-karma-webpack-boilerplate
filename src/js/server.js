import koa from 'koa';

var app = koa();

app.use(function *() {
    this.body = 'Hello world!';
});

app.listen(3000);