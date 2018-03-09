/**
 * 获取数据 api
 * //不该以页面来分 以方法来分 总共一个数据源 调用不同的api
 */

 //公共api
 const PATH_BASE = 'http://222.196.35.35:9080/GSMS';
 const PARAM_PRE = '/pre.do?ID=';//上张
 const PARAM_NEXT = '/next.do?ID=';//下张
 const PARAM_MAXMINID = '/getmaxminid.do';


//初始化获取数据
export function query(id,childname){
    let query= {}
    query[childname] =  `${PATH_BASE}/logistics/${childname}/next.do?ID=${id}`;
    // query.originOrder = `${PATH_BASE}/logistics/originalorder/next.do?ID=${id}`;
    // query.sellOrder = `${PATH_BASE}/logistics/salesorder/next.do?ID=${id}`;
    return query;
}

export function getPageChange(fun,id,childname){
    let funtype = fun==='getPrev'?PARAM_PRE:PARAM_NEXT;
    return `${PATH_BASE}/logistics/${childname}${funtype}${id}`;
}


//页面最大最小id
export  function getMaxandMin(childname){
    return `${PATH_BASE}/logistics/${childname}${PARAM_MAXMINID}`
}

/**
 *  api 汇总
 *      最大最小id：
 *          // 原始订单:`${PATH_BASE}/logistics/originalorder/getmaxminid.do`,
            // 销售订单:`${PATH_BASE}/logistics/salesorder/getmaxminid.do`,
        上张：
            原始订单：`${PATH_BASE}/logistics/originalorder/pre.do?ID=${id}`
        下张：
            原始订单: `${PATH_BASE}/logistics/originalorder/next.do?ID=${id}`;
 */
