const Mock = require('mockjs');

const database = {
  posts: [
    {
      id: '1',
      icon: 'dashboard',
      name: '仪表盘',
      route: '/dashboard',
    },
    {
      id: '2',
      breadcrumbParentId: '1',
      name: '用户管理',
      icon: 'user',
      route: '/user',
    },
    {
      id: '21',
      menuParentId: '-1',
      breadcrumbParentId: '2',
      name: '用户详情',
      route: '/user/:id',
    }
  ]
}

module.exports = (app) => {
  app.get('/posts', (req, res) => {
    res.status(200).json(database)
  })
}

