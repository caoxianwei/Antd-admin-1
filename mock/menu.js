/**
 *  @desc 菜单模拟接口
 */
const apiPrefix = '/api'

var menubase = [{
    id:'0',
    icon:'user-add',
    route:'/originsee',
    name:'普通人能看的'
},{
    id:'1',
    icon:'wallet',
    route:'/adminsee',
    name:'Admin专属',
},{
    id:'2',
    icon:'bank',
    route:'/developersee',
    name:'管理员专属'
},{
    id:'3',
    icon:'star',
    route:'/studydemo',
    name:'学习Demo'
},{//一级菜单
    id:'4',
    name:'基础设置',
    icon:'setting',
},{//二级
    id:'40',
    pid:'4',
    name:'用户权限',
    icon:'appstore-o',
},{
    id:'41',
    pid:'4',
    name:'菜单管理',
    icon:'appstore',
},{//三级
    id:'410',
    pid:'41',
    name:'菜单配置',
    icon:'inbox',
    route:'/menuset'
},{
    id:'400',
    pid:'40',
    name:'角色管理',
    icon:'user',
    route:'/roleset'
},{
    id:'401',
    pid:'40',
    name:'用户管理',
    icon:'team',
    route:'/userset'
}]



module.exports = {
    [`GET ${apiPrefix}/menus`] (req, res) {
        res.status(200).json(menubase)
    },
    [`DELETE ${apiPrefix}/menu/:id`] (req, res) {
        const { id } = req.params //拿着该id去数据库中找
        //删除菜单 1. 最底层菜单：有route 则只删除id 2. 有children【某个id 的pid ===id
        menubase = menubase.filter(item => item.id !== id &&item.pid !==id )
        res.status(204).json({
            success: true
        });
    },
    //新增菜单 1. 一级菜单，无pid  2. 有父菜单
    [`POST ${apiPrefix}/menu`] (req, res) {
        //新生成一个id值
        //如果传来的id【pid值为空 则是一级菜单
        //如果传的值有父id 则将其pid 置为id值 新建个对象 push到database里
        let newData = req.body
        const pid = newData.id
        let id = Math.round(Math.random()*100);//如果是一级 菜单则id 随机数 如果有父级菜单则id为pid +随机数 现在先暴力吧
        newData.id = id
        if(pid){//如果非一级菜单 则有pid属性
            newData.pid = pid;
        }
        menubase.unshift(newData)
        res.status(202).json({      //将请求json格式返回
            success: true
        });
    },
    //编辑菜单 1.父级id不允许修改
    [`PATCH ${apiPrefix}/menu/:id`] (req, res) {
        let newData = req.body
        const { id } = req.params
        let isExist = false
        menubase = menubase.map((item) => {
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
