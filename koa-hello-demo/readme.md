一：结构说明：
    1.config:       配置文件
    2.controller：  控制层，暴露接口供前端使用
    3.model：       模型层，数据操作（sequelize）
        /db_public: 表初始化和连接池
    4.public:       公共文件（css/js）
    5.router:       路由层（中间层）
    6.view:         静态文件(ejs)

router.js 路由加载器，加载router目录下的路由，方便加载拦截器等路由。