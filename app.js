const Koa = require('koa');

const app = new Koa();

app.use(async(ctx, next) => {
    console.info('is-first');
    await next()
})

app.listen(3003, () => {
    console.info('[demo] start-quick is starting at port 3000')
})