const Router = require('koa-router');
const router = new Router();

router.get('/', async(ctx, next) => {
    ctx.body = 'can i user /'
});

router.get('/userList', async(ctx, next) => {
    ctx.body = 'can i userList'
})

module.exports = router