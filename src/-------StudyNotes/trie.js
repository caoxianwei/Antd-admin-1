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
    id: '41',
    bpid: '4',
    mpid: '4',
    name: 'IconFont',
    icon: 'heart-o',
    route: '/UIElement/iconfont',
}]


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

var keys = []

let result = transObject(menu_list,keys);
console.log(result)
