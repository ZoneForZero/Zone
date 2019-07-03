//get
var logout =  function (ctx) {
    ctx.session = null;
    var rt =  {
        "code": 0,
        "mseeage": 'success',
        "extData": {}
    }
    return rt;
}
module.exports = logout;