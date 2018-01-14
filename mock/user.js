/**
 * @desc 用户列表模拟接口
 */

//const qs = require('qs')
//const Mock = require('mockjs')
const apiPrefix = '/api'


//用户列表信息库--伪数据库
let database = {
    total: 3,
    current: 1,
    loading: false,
    list:[{
        name: '张三',
        gender: '男',
        role: '游客',
        creattime:'2018/1/12 8：00'
    },{
        name: '李四',
        gender: '女',
        role: '管理员',
        creattime:'2018/1/13 8：00'
    },{
        name: '王麻子',
        gender: '男',
        role: '超级管理员',
        creattime:'2018/1/13 18：00'
    },{
        name: '张三1111',
        gender: '男',
        role: '游客',
        creattime:'2018/1/12 8：00'
    },{
        name: '李四222',
        gender: '女',
        role: '管理员',
        creattime:'2018/1/13 8：00'
    },{
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
    //发送登录请求
    [`POST ${apiPrefix}/user/login`] (req, res) {
        const { username, password } = req.body
        //服务端收到请求，去验证用户名与密码
        const user = adminUsers.filter(item => item.username === username)

        if (user.length > 0 && user[0].password === password) {//验证成功
            const now = new Date()
            now.setDate(now.getDate() + 1)
            //验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
            //客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
            //此处Token用简化的token表示实际上应该是加密生成的一串密码
            //客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
            //服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据
            res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
                maxAge: 900000,
                httpOnly: true,
            })
            res.json({ success: true, message: 'Ok' })
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
    }
}
module.exports = mock;
