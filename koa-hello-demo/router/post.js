const add_p = require('../controller/addtopic');
const del_p = require('../controller/deletetopic');
const get_p = require('../controller/gettopic');
const update_p = require('../controller/modifytopic');
const Islogin = require('../controller/testlogin');

// 前提要验证已登录！！！！
var add_post = async (ctx, next) => {
        var rt = await add_p(ctx.session.user_id, ctx.session.name, ctx.request.body.title, ctx.request.body.content);
        ctx.body = rt.code === 0 ? 200 : 500;
}
var del_post = async (ctx, next) => {
        var rt = await del_p(ctx.request.body.post_id);
        rt.code === 0 ?
                ctx.status = 200 : ctx.status = 500;
}
var get_post = async (ctx, next) => {
        var statu_login = await Islogin(ctx);
        var post_info = await get_p(ctx.request.querystring);
        ctx.body = post_info.code === 0 ? 200 : 404;
        await ctx.render('detail', { id_name: ctx.session, statu_login, post_info });
}
var get_update_post = async (ctx, next) => {
        //注意权限判断
        var statu_login = await Islogin(ctx);
        var post_info = await get_p(ctx.request.querystring);
        ctx.body = (post_info.code === 0 &&
                post_info.data.author_id == ctx.session.user_id) ? 200 : 404;
        await ctx.render('update_post', { id_name: ctx.session, statu_login, post_info });
}
var sumbit_update_post = async (ctx, next) => {
        //注意权限判断
        var statu_login = await Islogin(ctx);
        var rt = await update_p(ctx.request.body.post_id,
                ctx.request.body.title, ctx.request.body.content);
        if (statu_login.code !== 0)
                ctx.body = 404;
        else if (rt.code !== 0)
                ctx.body = 500;
        else ctx.body = 200;
}
//下面要指明get  post
module.exports = {
        'put   /add_post': add_post,
        'delete/del_post': del_post,
        'get   /get_post': get_post,
        'get   /update_post': get_update_post,
        'post  /update_post': sumbit_update_post
}