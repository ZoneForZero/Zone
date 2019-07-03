const tlogin = require('../controller/login');
const tsignup = require('../controller/signup');
const Gettopic = require('../controller/gettopics');
const Islogin = require('../controller/testlogin');
const get_table = require('../model/db_public/init_table');
const p_config = require('../config/post_config');
//进入主页页面
var index = async (ctx, next) => {
    // console.log(ctx.querystring);
    // await get_table.createTable();
    var statu_login = await Islogin(ctx);
    var query = ctx.query;
    var tap = query.tap;
    var uid = query.uid;
    if (!uid || uid < 1)
        uid = 0;
    if (!tap || tap < 1)
        tap = 1;
    // console.log(tap, uid);
    var post_info = await Gettopic(uid, tap, p_config.size);
    var size = post_info.data.count > p_config.size ? p_config.size : post_info.data.count;
    var page = parseInt(post_info.data.count / p_config.size);//一共多少页
    if (post_info.data.count % 10 != 0)//整除不加页
        page++;
    statu_login.code === 1 ?
        await ctx.render('index', { statu_login, post_info, p_config, page, size, tap, uid }) :
        await ctx.render('index', { id_name: ctx.session, statu_login, post_info, page, size, tap, uid });
}
//登陆验证
var login = async (ctx, next) => {
    var
        account = ctx.request.body.account || '',
        password = ctx.request.body.password || '';
    var ans = await tlogin(account, password);
    if (ans.code === 0) {
        ctx.status = 200;
        ctx.session.user_id = ans.data.u_id;//把用户id写进session
        ctx.session.name = ans.data.u_name;
        ctx.body = ans;
    } else {
        ctx.status = 500;
        ctx.body = ans;
    }
}
var logout = async (ctx) => {
    ctx.body = 200;
    ctx.session = null;
    ctx.body = {
        "code": 0,
        "mseeage": 'success',
        "extData": {}
    }
}
var signup = async (ctx, next) => {
    // ctx.session = null;
    var
        account = ctx.request.body.account || '',
        password = ctx.request.body.password || '',
        name = ctx.request.body.name || '';
    var ans = await tsignup(account, password, name);
    if (ans.code === 0) {
        ctx.status = 200;
        ctx.session.user_id = ans.data.u_id;//把用户id写进session
        ctx.session.name = ans.data.u_name;
    } else {
        ctx.status = 500;
    }
}
//下面要指明get  post
module.exports = {
    'get   /': index,
    'post  /login': login,
    'get   /logout': logout,
    'post  /signup': signup
}