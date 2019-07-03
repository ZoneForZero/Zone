//用户获取多个主题  put  
const Posts = require('../model/curl_posts');
const p_config = require('../config/post_config');
var tran_time = function (time) {
    return time.toLocaleDateString() + " " + time.toLocaleTimeString();
}
var gettopic = function (author = 0, page = p_config.page, size = p_config.size) {
    if (page && page < 1)
        return {
            code: 1,
            message: '页码错误！'
        }
    else if (size && size < 1)
        return {
            code: 2,
            message: '每页大小必须大于1！'
        }
    else if (author && author < 0)
        return {
            code: 3,
            mseeage: '作者id错误！'
        }
    return (async () => {
        var ans = await Posts.get_some_by_id(author, page, size);
        let info = [];
        for (var i = 0; i < ans.rows.length; i++) {
            info[i] = {};
            info[i].id = ans.rows[i].p_id;
            info[i].user_id = ans.rows[i].p_user;
            info[i].title = ans.rows[i].p_title;
            info[i].content = ans.rows[i].p_content;
            info[i].author = ans.rows[i].p_author;
            info[i].logtime = tran_time(ans.rows[i].updatedAt);
            info[i].createtime = tran_time(ans.rows[i].createdAt);
        }
        return {
            "code": 0,
            "mseeage": 'success',
            "data": {
                count: ans.count,
                raw: info
            }
        }
    })()
}
module.exports = gettopic;