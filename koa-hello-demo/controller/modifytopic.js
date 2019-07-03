//用户修改主题  put  
var Posts = require('../model/curl_posts');
var modifytopic = function (post_id, title, content) {
    return (async () => {
        var ans = await Posts.upd_by_id(post_id, title, content);
        return {
            "code": 0,
            "Mseeage": 'success',
            "data": {
                "id": ans.p_id,
                "title": ans.p_title,
                "content": ans.p_content,
                "author_id": ans.p_user,//这里是id，要名字则查询转换
                "author":ans.p_author,
                "logtime": ans.updatedAt
            }
        }
    })()
}
module.exports = modifytopic;