first bolad
├── app
│   ├── controllers         ---  控制器
│   ├── helpers             ---  帮助工具集
│   ├── jobs                ---  定时任务
│   ├── models              ---  数据库 model
│   └── services            ---  controller 与 model 的粘合层 (提拱一些实用方法，屏蔽底层操作...)
├── config
│   ├── environments        ---  环境变量
│   └── routers             ---  路由配置文件
└── test
    └── apis                ---  测试用例