const db = require('./db_public/init_table');
const User = db.User;
var login = async function (account, password) {//匹配某用户
    let result = await User.findOne({
        'where': {
            'u_account': account,
            'u_password': password
        }
    })
    return result;
}
var signup = async function (account, password, name) {//注册账号
    let result = await User.create({
        u_account: account,
        u_password: password,
        u_name: name
    })
    return result;
}
module.exports = {
    login,
    signup
}