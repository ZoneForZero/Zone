const fs = require("fs");
const router = require('koa-router')();

router.use("/login", async (ctx, next) => {
    console.log('');
    await next();
})
var go = function () {
    let pre = __dirname + '/router/';
    let file = fs.readdirSync(pre);
    var js_files = file.filter(
        (f) => {
            return f.endsWith('.js');
        }
    )
    for (let i of js_files) {
        let text_file = require(pre + i);
        // console.log('www');
        for (let url in text_file) {
            // console.log(url);
            let path = url.substring(6);
            let func = text_file[url];
            if (url.startsWith("get")) {
                // console.log('path func:',path,func);
                router.get(path, func);
            }
            else if (url.startsWith("post ")) {
                router.post(path, func);
            }
            else if (url.startsWith("put")) {
                router.put(path, func);
            }
            else if (url.startsWith("delete")) {
                router.del(path, func);
            } else
                console.log(i,"路由读取错误 by routers.js！");
        }
    }
    return router;
}
module.exports = go();