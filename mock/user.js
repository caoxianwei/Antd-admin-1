/**
 * @desc 用户列表模拟接口
 */

const qs = require('qs')
//const Mock = require('mockjs')
const apiPrefix = '/api'


//用户列表信息库--伪数据库
let database = {
    total: 3,
    current: 1,
    loading: false,
    list:[{
        id:'001',
        name: '张三',
        gender: '男',
        role: '游客',
        creattime:'2018/1/12 8：00'
    },{
        id:'002',
        name: '李四',
        gender: '女',
        role: '管理员',
        creattime:'2018/1/13 8：00'
    },{
        id:'003',
        name: '王麻子',
        gender: '男',
        role: '超级管理员',
        creattime:'2018/1/13 18：00'
    },{
        id:'004',
        name: '张三1111',
        gender: '男',
        role: '游客',
        creattime:'2018/1/12 8：00'
    },{
        id:'005',
        name: '李四222',
        gender: '女',
        role: '管理员',
        creattime:'2018/1/13 8：00'
    },{
        id:'006',
        name: '王麻子333',
        gender: '男',
        role: '超级管理员',
        creattime:'2018/1/13 18：00'
    }]
}

//三种不同的角色
const EnumRoleType = {
    ADMIN: 'admin',
    DEFAULT: 'guest',
    DEVELOPER: 'developer',
}

//不同角色对应的权限
const userPermission = {
    DEFAULT: {
      visit: ['1', '2', '21', '7', '5', '51', '52', '53'],
      role: EnumRoleType.DEFAULT,
    },
    ADMIN: {
      role: EnumRoleType.ADMIN,
    },
    DEVELOPER: {
      role: EnumRoleType.DEVELOPER,
    },
}

//目前数据库已有的用户列表
const adminUsers = [
    {
      id: 0,
      username: 'admin',
      password: 'admin',
      permissions: userPermission.ADMIN,
    }, {
      id: 1,
      username: 'guest',
      password: 'guest',
      permissions: userPermission.DEFAULT,
    }, {
      id: 2,
      username: '吴彦祖',
      password: '123456',
      permissions: userPermission.DEVELOPER,
    }
]





const mock = {
    //查询用户登录状态
    [`POST ${apiPrefix}/userstatus`] (req, res) {
        const token = req.body
        // const cookie = req.headers.cookie || ''
        // const cookies = qs.parse(cookie.replace(/\s/g, ''), { delimiter: ';' })
        let success = false;
        const user = {}
        if (!token) {
          res.status(200).send({ message: '无token，状态为未登录'})
          return
        }else{
            //只要有token值都会返回一个response token存在且未过期则succeess成功
            success = token.deadline > new Date().getTime()
            if (success) {
                //token合法{数据库存在该用户} 则返回用户信息
                const userItem = adminUsers.filter(_ => _.id === token.id)
                if (userItem.length > 0) {
                    user.permissions = userItem[0].permissions
                    user.username = userItem[0].username
                    user.id = userItem[0].id
                }
            }
        }
        res.status(202).json({
            success,
            user
        })
    },
    //发送登录请求
    [`POST ${apiPrefix}/user/login`] (req, res) {
        const { username, password } = req.body
        //服务端收到请求，去验证用户名与密码
        const user = adminUsers.filter(item => item.username === username)
        if (user.length > 0 && user[0].password === password) {//验证成功
            const now = new Date()
            now.setDate(now.getDate() + 1)//有效时间为一天
            // res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
            //     maxAge: 900000,
            //     //httpOnly: true,
            // })
            res.json({
                success: true,
                message: 'Ok',
                cookie:JSON.stringify({ id: user[0].id, deadline: now.getTime() })
            })
        }
        else {//验证失败
          res.status(400).end()
        }
    },
    //退出登陆 cookie清空
    [`GET ${apiPrefix}/user/logout`] (req, res) {
        res.clearCookie('token')
        res.status(200).end()
    },
    //用户数据列表接口
    [`GET ${apiPrefix}/users`] (req, res){
        res.status(200).json({      //将请求json格式返回
            success: true,
            result:database
        });
    },
    //删除某个用户
    [`DELETE ${apiPrefix}/user/:id`] (req, res) {
        const { id } = req.params
        let tempdata = database.list;
        if (tempdata) {
            tempdata = tempdata.filter(item => item.id !== id)
            database.list = tempdata
            res.status(204).json({      //将请求json格式返回
                success: true
            });
        } else {
          res.status(404).json(NOTFOUND)
        }
    },
    //新增用户
    [`POST ${apiPrefix}/user`] (req, res) {
        let newData = req.body
        let tempdata = database.list;
        let id = Math.round(Math.random()*100);
        let myDate = new Date();
        newData.id = id
        newData.creattime = myDate.toLocaleString()
        tempdata.unshift(newData)
        database.list = tempdata
        res.status(202).json({      //将请求json格式返回
            success: true
        });
    },
    //编辑用户
    [`PATCH ${apiPrefix}/user/:id`] (req, res) {
        let newData =req.body
        const { id } = req.params
        let isExist = false
        let tempdata = database.list;
        database.list = tempdata.map((item) => {
          if (item.id === id) {
            isExist = true
            return Object.assign({}, item, newData)
          }
          return item
        })
        if (isExist) {
            res.status(204).json({      //将请求json格式返回
                success: true
            });
        } else {
          res.status(404).json(NOTFOUND)
        }
    },
}
module.exports = mock;
