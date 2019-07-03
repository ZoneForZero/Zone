//用户发表主题  put  
var Posts = require('../model/curl_posts');
var addtopic = function (user_id, user_name, title, content) {
    return (async () => {
        var ans = await Posts.add_by_id(user_id, user_name, title, content);
        return {
            "code": 0,
            "nseeage": 'success',
            "data": {
                "id": ans.p_id,
                "title": ans.p_title,
                "content": ans.p_content,
                "author_id": ans.p_author,//这里是id，要名字则查询转换
                "logtime": ans.updatedAt
            }
        }
    })()
}
module.exports = addtopic;