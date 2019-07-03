//用户删除主题  delete  
var Posts = require('../model/curl_posts');
var deletetopic = function (p_id) {
    return (async () => {
        var ans = await Posts.del_by_id(p_id);
        console.log(ans);
        return {
            "code": 0,
            "Mseeage": 'success',
            "data": {
            }
        }
    })()
}
module.exports = deletetopic;