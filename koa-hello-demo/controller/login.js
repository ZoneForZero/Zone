//用户登录接口
var User = require('../model/curl_users');
var login = function (account, password) {
    return (async () => {
        var ans = await User.login(account, password);
        return ans === null ?
            {
                "code": -1,
                "Mseeage": '登录失败!',
                "data": ans
            } : {
                "code": 0,
                "Mseeage": '登录成功!',
                "data": ans
            };
    })()
}
//下面要指明get  post
module.exports = login;