const db_pool = require('./db_public/get_pool');
const db_info = require('../config/db_local');
var get_sb_session = async function (id) {
    var result = await db_pool.query(
        'select data from _mysql_session_store where id = "' + db_info.session_key + ':' + id + '"'
        , { type: 'SELECT' });
    if (result.length !== 0)
        return result[0].data;
    else
        return null;
}
module.exports = {
    get_sb_session,
}