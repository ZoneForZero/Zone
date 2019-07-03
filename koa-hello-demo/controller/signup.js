//用户注册接口
var User = require('../model/curl_users');
var signup = function (account, password, name) {
    return (async () => {
        var ans = await User.signup(account, password, name);
        console.log("注册接口：",ans);
        if (ans.u_account === account) {
            return {
                "code": 0,
                "mseeage": 'success',
                "data": ans
            }
        }
        return {
            "code": 1,
            "mseeage": 'fail',
            "data": ans
        }
    })()
}
module.exports = signup;