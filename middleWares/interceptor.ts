export default async (ctx, next) => {
    ctx.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild',
        'Access-Control-Allow-Methods': 'PUT, POST, GET, DELETE, OPTIONS'
    })
    if(ctx.request.method === 'OPTIONS') {
        console.info('isoptions');
        ctx.status = 200
        return false
    }
    await next()
}