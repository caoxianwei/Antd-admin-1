/**
 * 获取数据
 * //不该以页面来分 以方法来分 总共一个数据源 调用不同的api 工厂内部判断是什么子组件
 */

 //公共api
 const RootApi = 'http://222.196.35.35:9080/GSMS';

//初始化获取数据
export function query(id){
    let query= {}
    query.originOrder = `${RootApi}/logistics/originalorder/next.do?ID=${id}`;
    query.sellOrder = `${RootApi}/logistics/salesorder/findbyid.do?ID=${id}`;
    return query;
}

//上张
export function getPrev(id){
    let queryop= {}
    queryop.originOrder = `${RootApi}/logistics/originalorder/pre.do?ID=${id}`;
    queryop.sellOrder = `${RootApi}/logistics/salesorder/pre.do?ID=${id}`;
    return queryop;
}

export function getNext(id){
    let queryop= {}
    queryop.originOrder = `${RootApi}/logistics/originalorder/next.do?ID=${id}`;
    queryop.sellOrder = `${RootApi}/logistics/salesorder/next.do?ID=${id}`;
    return queryop;
}

//页面最大最小id
export  const getMaxandMin = {
    'originOrder':`${RootApi}/logistics/originalorder/getmaxminid.do`,
    'sellOrder':`${RootApi}/logistics/salesorder/getmaxminid.do`,
}




 /*
    //获取数据的api
    const originOrder = {
        'getMaxandMin':`${RootApi}/logistics/salesorder/getmaxminid.do`,
        'get':`${RootApi}/logistics/originalorder/next.do?ID=50`
    }

    const sellOrder = {
        'getMaxandMin':`${RootApi}/logistics/originalorder/getmaxminid.do`,
        'get':`${RootApi}/logistics/salesorder/findbyid.do?ID=112`
    }
*/
