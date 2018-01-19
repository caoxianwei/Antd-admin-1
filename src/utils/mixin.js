/**
 *  操作cookie
 */
const setCookie = (c_name,value,expiredays) =>{
    var exdate=new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)
    //((expiredays==null) ? "" : ";expires="+exdate.toGMTString()) //后端设置过期值
}

const getCookie = (c_name) =>{
    if (document.cookie.length>0){
        let c_start= document.cookie.indexOf(c_name + "=");
        if (c_start!==-1){
            c_start=c_start + c_name.length+1;
            let c_end=document.cookie.indexOf(";",c_start);
            if (c_end===-1){
                c_end=document.cookie.length;
            }

            return unescape(document.cookie.substring(c_start,c_end));
        }
     }
    return "";
}

//setCookie('name','zzyn',1); // cookie过期时间为1天。
//var uname= getCookie('name');//名称为name的cookie值：zzyn

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */

const arrayToTree = (arr,id='id',pid='pid',children='children') =>{
    let data =  JSON.parse(JSON.stringify(arr));
    let result = []
    let hash = {}
    data.forEach((item, index) => {
        hash[data[index][id]] = data[index] //生成一个以为id为数组下标的数组 【多个数组变为了一个
    })
    data.forEach((item) => {
        item.key = item.id
        let hashVP = hash[item[pid]]
        if (hashVP) {//如果有父级  则将元素放在该父级的孩子节点上
            !hashVP[children] && (hashVP[children] = [])
            hashVP[children].push(item)
        }
        else if(!(hashVP&&item.route)){//第一级：1.没有父亲节点 且没有路由属性
          result.push(item)
        }
    })
    return result;
}



export {
    setCookie,
    getCookie,
    arrayToTree
}
