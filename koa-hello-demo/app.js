const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
const session = require('koa-session-minimal');
const mysql_session = require('koa-mysql-session');
const views = require('koa-views');
const path = require('path');
const staticFiles = require('koa-static')
const conter = require('./router.js');
const db_config = require('./config/db_local');
app.use(staticFiles(path.resolve(__dirname, "./public")));
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))
//跨域资源共享
const cors = require('koa2-cors');
app.use(cors({
    origin: function (ctx) {
        return "*";
        // if (ctx.url === '/test') {
        //     return "*"; // 允许来自所有域名请求
        // }
        // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
//加载session要用的数据库信息
const mysql_config = {
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    host: db_config.host
}
app.use(session({
    key: db_config.session_key,//数据库id字段的前缀
    store: new mysql_session(mysql_config)
}))

app.use(conter.routes()).use(conter.allowedMethods());
app.listen(3000);


// app.on('unhandledRejection', (reason, p) => {
//     console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
//     // application specific logging, throwing an error, or other logic here
//   });