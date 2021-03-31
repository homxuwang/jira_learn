/*
 * @Description  : json-server的中间件，可以将非RESTFUL风格的请求放在这里处理
 * @version      : 
 * @Author       : homxuwang
 * @Date         : 2021-03-31 11:28:46
 * @LastEditors  : homxuwang
 * @LastEditTime : 2021-03-31 11:42:02
 */
module.exports = (req,res,next) => {
    if(req.method === 'POST' && req.path === '/login') {
        if(req.body.username === 'homxu' && req.body.password === '123456') {
            return res.status(200).json({
                user: {
                    token: '123'
                }
            })
        }
    }else{
        return res.status(400).json({message:'username or password invalid.'})
    }
    next()
}