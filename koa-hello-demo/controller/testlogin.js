//get  测试是否登陆
var seq = require('../model/find_session');
var testlogin = function (ctx) {
    return (async () => {
        var tkey = ctx.request.header.cookie;
        if (tkey && ctx.session) {
            tkey = tkey.substring(5);
            var session = await seq.get_sb_session(tkey);
            
            if (session && ctx.session && session == JSON.stringify(ctx.session)) {
                return {
                    "code": 0,
                    "message": "success",
                    "data": {
                        isLogin: true,
                        username: ctx.session.account
                    }
                }
            }
        }
        return {
            "code": 1,
            "message": "fail!",
            "data": {
                isLogin: false
            }
        }
    })()
}
module.exports = testlogin;