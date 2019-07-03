//用户获取单个主题  put  
var Posts = require('../model/curl_posts');
var tran_time = function (time) {
    return time.toLocaleDateString() + " " + time.toLocaleTimeString();
}
var gettopic = function (post_id) {
    return (async () => {
        var ans = await Posts.get_one_by_id(post_id);
        console.log('接口：',ans);
        return {
            "code": 0,
            "mseeage": 'success',
            "data": {
                "id": ans.p_id,
                "title": ans.p_title,
                "content": ans.p_content,
                "author_id": ans.p_user,//这里是id，要名字则查询转换
                "author":ans.p_author,
                "logtime":  tran_time(ans.updatedAt),
                "createtime": tran_time(ans.createdAt)
            }
        }
    })()
}
module.exports = gettopic;