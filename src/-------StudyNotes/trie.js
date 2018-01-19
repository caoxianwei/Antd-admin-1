/**
 *  @desc 字典树
 */

var data = [{
    'province': '浙江',
    'city': '杭州',
    'name': '西湖'
}, {
    'province': '四川',
    'city': '成都',
    'name': '锦里'
}, {
    'province': '四川',
    'city': '遂宁',
    'name': '大英'
}, {
    'province': '四川',
    'city': '绵阳',
    'name': '西科大'
}]


var menuList = [{
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
    icon:'user-add',
    route:'/userset'
}]

const arrayToTree = (arr,id='id',pid='pid',children='children') =>{
    let data =  arr;
    let result = []
    let hash = {}
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index] //生成一个以为id为数组下标的数组 【多个数组变为了一个
    })
    data.forEach((item) => {
        item.key = item.id
        if(!item.hasOwnProperty("route")){
            item.route =''
        }
        let hashVP = hash[item[pid]]
        if (hashVP) {//如果有父级  则将元素放在该父级的孩子节点上
          !hashVP[children] && (hashVP[children] = [])
          hashVP[children].push(item)
        }
        else if(!(hashVP&&item.hasOwnProperty("route"))){//第一级：1.没有父亲节点 且没有路由属性
          item.pid =''
          result.push(item)
        }
    })
    return result;
}

const menuTree =  arrayToTree(menuList)

//table表格需要的树状数据格式
const arrayToTabletree = (arr,id='id',pid='pid',children='children') =>{
    let data =  arr;
    let result = []
    let hash = {}
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index] //生成一个以为id为数组下标的数组 【多个数组变为了一个
    })
    data.forEach((item) => {
        let hashVP = hash[item[pid]]
        if (hashVP) {//如果有父级  则将元素放在该父级的孩子节点上
          !hashVP[children] && (hashVP[children] = [])
          hashVP[children].push(item)
        }
        else if(!(hashVP&&item.hasOwnProperty("route"))){//第一级：1.没有父亲节点 且没有路由属性
          result.push(item)
        }
    })
    return result;
}







console.log(menuTree)

const levelMap = {}
 // 递归生成菜单

 /*
const getMenus = (menuTreeN) => {
    return menuTreeN.map((item) => {
        if (item.children) {
            if (item.mpid) {
                levelMap[item.id] = item.mpid
            }
            return (
                <Menu.SubMenu
                    key={item.id}
                    title={
                        <span>
                            {item.icon && <Icon type={item.icon} />}
                            <span>{item.name}</span>
                        </span>
                    }
                >
                {getMenus(item.children)}
                </Menu.SubMenu>
            )
        }
        return (
            <Menu.Item key={item.id}>
                <Link to={item.route|| '#'}>
                    {item.icon && <Icon type={item.icon} />}
                    <span>{item.name}</span>
                </Link>
            </Menu.Item>
        )
    })
  }

*/

  //const menuItems = getMenus(menuTree)

  const data2222 = [{
    key: 1,
    id: '4',
    name:'基础设置',
    pid: '',
    route:'',
    icon:'setting',
    children: [{
        key: 11,
        id: '40',
        name:'用户权限',
        pid: '4',
        route:'',
        icon:'appstore-o',
        children:[{
            key: 111,
            id: '400',
            name:'角色管理',
            pid: '40',
            route:'/roleset',
            icon:'user',
        },{
            key: 112,
            id: '401',
            name:'用户管理',
            pid: '40',
            route:'/userset',
            icon:'user-add',
        }]
    },{
        key: 12,
        id: '41',
        name:'菜单管理',
        pid: '4',
        route:'',
        icon:'appstore',
        children:[{
            key: 121,
            id: '410',
            name:'菜单配置',
            pid: '41',
            route:'/menuset',
            icon:'inbox',
        }]
    }],
},{
    key: 2,
    id: '0',
    name:'普通人看的',
    pid: '',
    route:'/originsee',
    icon:'user-add',
}];

console.log(data2222)


















var transObject = function (tableData, keys) {
    let hashTable = {},res = []
    for (let i =0; i < tableData.length; i++) {
        let arr = res, cur = hashTable
        for (let j = 0; j < keys.length; j++) {
            let key = keys[j],filed = tableData[i][key]
            if (!cur[filed]) {
                let pusher = {value: filed},tmp
                if (j !== (keys.length -1)) {
                    tmp = []
                    pusher.children = tmp
                }
                cur[filed] = {$$pos: arr.push(pusher) -1 }
                cur = cur[filed]
                arr = tmp
            } else {
                cur = cur[filed]
                arr = arr[cur.$$pos].children
            }
        }
    }
    return res
}





//var keys = ['id', 'city', 'name']

//let result = transObject(menu_list,keys);

