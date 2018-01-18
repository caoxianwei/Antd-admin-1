/**
 *  @desc 菜单模拟接口
 */
const apiPrefix = '/api'

let menubase = [
    {
        id:'6',
        icon:'user-add',
        route:'/originsee',
        name:'普通人能看的'
    },{
        id:'1',
        icon:'user',
        route:'/user',
        name:'角色管理'
     },{
        id:'2',
        icon:'star',
        route:'/studydemo',
        name:'学习Demo'
     },{
        id:'3',
        icon:'appstore-o',
        route:'/menuset',
        name:'菜单配置',
     },{
        id:'4',
        icon:'wallet',
        route:'/adminsee',
        name:'Admin专属',
     },{
        id:'5',
        icon:'bank',
        route:'/developersee',
        name:'管理员专属'
     }
]



module.exports = {
    [`GET ${apiPrefix}/menus`] (req, res) {
        res.status(200).json(menubase)
    }
}
