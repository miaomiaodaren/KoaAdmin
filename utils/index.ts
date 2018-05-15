
//统一错误处理
export interface handParams {
    ctx: any,
    message?: string
    err?: any
    result?: any
}

export const handleError = ({ ctx, message = '请求失败', err = '' }: handParams) => {
    ctx.body = { status: 'error', message, debug: err }
}

export const handleSuccess = ({ctx, message ='请求成功', result=''}: handParams) => {
    ctx.body = { status: 'success', message, result }
}

export const isEmptyObject = (obj: any) => {
    for(let name in obj) {
        return false;
    }
    return true;
}