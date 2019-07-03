const db = require('./db_public/init_table');
const p_config = require('../config/post_config');
const Posts = db.Posts;
var add_by_id = async function (u_id, user_name, title, content) {
    let ans = await Posts.create({
        p_user: u_id,
        p_title: title,
        p_author: user_name,
        p_content: content
    });
    return ans;
}
var del_by_id = async function (post_id) {
    let ans = await Posts.destroy({
        'where': {
            'p_id': [post_id]
        }
    })
    return ans;
}
var upd_by_id = async function (post_id, post_title, post_content) {
    let ans = await Posts.update({
        p_title: post_title,
        p_content: post_content
    }, {
            where: {
                p_id: post_id
            }
        })
    return ans;
}
var get_one_by_id = async function (post_id) {
    let ans = await Posts.findOne({
        where: {
            p_id: post_id
        }
    })
    return ans;
}
var get_some_by_id = async function (user_id = 0, page = p_config.page, size = p_config.size) {
    let tou = (page - 1) * size;//开头
    if (user_id === 0) {//all
        var ans = await Posts.findAndCountAll({
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: size,
            offset: tou//跳过多少条
        })
    }
    else {
        var ans = await Posts.findAndCountAll({
            where: {
                p_user: user_id,
            },
            order: [
                ['updatedAt', 'DESC']
            ],
            limit: size,
            offset: tou//跳过多少条
        })
    }
    return ans;
}
module.exports = {
    add_by_id,
    del_by_id,
    upd_by_id,
    get_one_by_id,
    get_some_by_id
}